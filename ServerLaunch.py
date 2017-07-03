import bottle
from bottle import run
from bottle.ext.websocket import GeventWebSocketServer
from bottle.ext.websocket import websocket

from WebUI.Routes import WebServerRoutes

from threading import Thread
import sys, threading, time

def startBottleServer():
	testRoutes = WebServerRoutes()
	run(host='localhost', port=8000, server=GeventWebSocketServer, app=testRoutes.instance, debug=True)

def main(args):

	# Configure server
	bottle.TEMPLATE_PATH = ['./WebUI/views']
	print("Web Templates Loaded From:")
	print(bottle.TEMPLATE_PATH)

	# Start server
	threads = []
	serverThread = Thread(target = startBottleServer)
	threads.append(serverThread)
	serverThread.daemon = True
	serverThread.start()

	# KILL!
	while serverThread.isAlive():
		try:
			time.sleep(0.1)
		except KeyboardInterrupt:
			print("Kill Recv'd")
			sys.exit()

if __name__ == '__main__':
	main(sys.argv)
