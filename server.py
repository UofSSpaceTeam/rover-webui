import json

from bottle import route, run, template, static_file
from robocluster import Device

server = Device('web-ui', 'rover')
server.storage.RoverPosition = [52, 115]
server.storage.TargetReached = False

@server.every('1s')
async def toggle():
    server.storage.TargetReached = not server.storage.TargetReached

@route('/')
def home():
    return template('index')

@route('/static/<path:re:.*>')
def static(path):
    return static_file(path, root='./static/')

@route('/req/<item>', method='GET')
def request(item):
    print('Request for {}'.format(item))
    if item in server.storage:
        return json.dumps(server.storage[item])
    else:
        return template('nothin')

@route('/data/<item>', method='POST')
def post(item):
    print('POST: {}'.format(item))

server.start()
run(host='localhost', port=8080)
