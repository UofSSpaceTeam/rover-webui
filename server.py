import json
from aiohttp import web
from robocluster import Device

routes = web.RouteTableDef()

serverd = Device('webui', 'rover', network='0.0.0.0/0')
serverd.storage.TargetReached = False

serverd.storage.roverLat = 38.406460
serverd.storage.roverLong = -110.791900
serverd.storage.roverHeading = 90
serverd.storage.Speed = 3
serverd.storage.Acceleration = 100
serverd.storage.current = 2.5
serverd.storage.sendWaypoints = []

@serverd.every('100ms')
async def update_rover_model():
    pos = await serverd.request('Navigation', 'RoverPosition')
    serverd.storage.roverLat = pos[0]
    serverd.storage.roverLong = pos[1]
    heading = await serverd.request('Navigation', 'RoverHeading')
    serverd.storage.roverHeading = heading
    # print('ui updated')


@serverd.on('*/Autopilot')
def update_autopilot_enabled(event, data):
    serverd.storage.Autopilot = data

@routes.get('/')
async def index(request):
    print('Home page')
    return web.FileResponse('./vue/index.html')

@routes.get('/stats')
async def stats(request):
    print('stats')
    return web.FileResponse('./views/stats.html')

@routes.get('/vue')
async def vuepage(request):
    print('vuetest')
    return web.FileResponse('./vue/index.html')

@routes.get('/req/{name}')
async def req(request):
    name = request.match_info['name']
    # print('data request {}'.format(name))
    if name in serverd.storage:
        return web.json_response(serverd.storage[name])
    else:
        return web.Response(text='none')

@routes.post('/submit/{name}')
async def post(request):
    print("post")
    name = request.match_info['name']
    data = await request.read()
    data = json.loads(data.decode('utf-8'))
    # Convert strings to booleans
    if data[name] in ['true', 'True']:
        data[name] = True
    elif data[name] in ['false', 'False']:
        data[name] = False
    print('data post {}'.format(data))
    serverd.storage[name] = data[name]
    await serverd.publish(name, data[name])
    return web.Response()

app = web.Application()

app.router.add_routes(routes)
app.router.add_static('/static', './static/')
app.router.add_static('/vue', './vue/')
app.router.add_static('/lib', './lib/')

serverd.start()
web.run_app(app)
