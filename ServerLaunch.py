from RoverWebUI.bottle import run, ServerAdapter
from RoverWebUI.routes import WebserverRoutes

from threading import Thread
import time
import sys

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

		
def startBottleServer():
	run(server=testServer)
		
testServer = RoverWSGIServer(host='localhost', port=8080)
testRoutes = WebserverRoutes()
serverThread = Thread(target = startBottleServer)

try:
	serverThread.start()
except KeyboardInterrupt:
	sys.exit()
except:
	raise
