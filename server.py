import random
import json
from aiohttp import web
from robocluster import Device

routes = web.RouteTableDef()

serverd = Device('webui', 'rover')
serverd.storage.TargetReached = False
serverd.storage.StartNavigation = False

serverd.storage.roverLat = 52.132653
serverd.storage.roverLong = -106.628012
serverd.storage.WheelSpeed = 0
serverd.storage.BatteryCurrent = 0.5

# @serverd.every('1s')
async def toggle():
    serverd.storage.TargetReached = not\
            serverd.storage.TargetReached

@serverd.every('100ms')
async def move_rover():
    if serverd.storage.StartNavigation == 'true':
        serverd.storage.roverLat -= 1.5e-6
        serverd.storage.roverLong -= 1.5e-6

@serverd.every('100ms')
async def modulate_current():
    if serverd.storage.StartNavigation == 'true':
        serverd.storage.BatteryCurrent = random.gauss(10, 1)
    else:
        serverd.storage.BatteryCurrent = random.gauss(1.5, 0.1)

@serverd.every('100ms')
async def set_wheels():
    if serverd.storage.StartNavigation == 'true':
        serverd.storage.WheelSpeed = 15
    else:
        serverd.storage.WheelSpeed = 0

@routes.get('/')
async def index(request):
    print('Home page')
    return web.FileResponse('./views/index.html')

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
    name = request.match_info['name']
    data = await request.read()
    data = json.loads(data.decode('utf-8'))
    print('data post {}'.format(data))
    serverd.storage[name] = data[name]
    return web.Response()

app = web.Application()

app.router.add_routes(routes)
app.router.add_static('/static', './static/')
app.router.add_static('/vue', './vue/')
app.router.add_static('/lib', './lib/')

serverd.start()
web.run_app(app)
