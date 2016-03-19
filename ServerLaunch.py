from WebUI import bottle
from WebUI.bottle import run, ServerAdapter
from WebUI.Routes import WebserverRoutes

from threading import Thread
import sys, threading, time, Queue

class RoverWSGIServer(ServerAdapter):

	def run(self, app):  # pragma: no cover
		from wsgiref.simple_server import make_server
		from wsgiref.simple_server import WSGIRequestHandler, WSGIServer
		import socket

		class FixedHandler(WSGIRequestHandler):
			def address_string(self):  # Prevent reverse DNS lookups please.
				return self.client_address[0]

			def log_request(*args, **kw):
				if not self.quiet:
					return WSGIRequestHandler.log_request(*args, **kw)

		handler_cls = self.options.get('handler_class', FixedHandler)
		server_cls = self.options.get('server_class', WSGIServer)

		if ':' in self.host:  # Fix wsgiref for IPv6 addresses.
			if getattr(server_cls, 'address_family') == socket.AF_INET:

				class server_cls(server_cls):
					address_family = socket.AF_INET6

		self.srv = make_server(self.host, self.port, app, server_cls,
							   handler_cls)
		self.port = self.srv.server_port
		self.srv.serve_forever()
		print "Serving Pages Now"


testServer = RoverWSGIServer(host='localhost', port=8000)
def startBottleServer():
	run(server=testServer)

def main(args):
	# Configure server
	testRoutes = WebserverRoutes()
	bottle.TEMPLATE_PATH = ['./WebUI/views']
	print "Web Templates Loaded From:"
	print bottle.TEMPLATE_PATH

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
			print "Kill Recv'd"
			sys.exit()

if __name__ == '__main__':
	main(sys.argv)
