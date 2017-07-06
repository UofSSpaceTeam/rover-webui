from bottle import Bottle, route, get, post, template, static_file, request, response
from bottle.ext.websocket import websocket
import json

class WebServerRoutes():

	def __init__(self, parent=None, dataSem=None):
		self.val = True
		self.instance = Bottle()
		self.parent = parent
		self.dataSem = dataSem
		self.buildRoutes()


	def buildRoutes(self):
		# main page
		self.instance.route('/', method="GET", callback=self.mainPage)
		self.instance.route('/index', method="GET", callback=self.mainPage)
		self.instance.route('/home', method="GET", callback=self.mainPage)
		self.instance.route('/stats', method="GET", callback=self.statsPage)
		self.instance.route('/camera', method="GET", callback=self.cameraPage)

		# other pages
		# static files (TBH I have no idea how this works.. but it does!)
		self.instance.route('/static/:filename#.*#', method="GET", callback=self.sendStatic)
		self.instance.route('/favicon.ico', method="GET", callback=self.sendFavicon)

		# communication - All Data received from rover
		self.instance.route('/data/<item>', method="POST", callback=self.recvData)
		self.instance.route('/req/<item>', method="POST", callback=self.sendData)

		# websocket
		self.instance.route('/websocket', method="GET", apply=[websocket], callback=self.handle_websocket)

	# define the template to show and any preprocessing
	def mainPage(self):
		return template('index')

	def statsPage(self):
		return template('stats')

	def cameraPage(self):
		return template('cameraPage')

	# Static Routes for CSS/Images etc
	def sendStatic(self, filename):
	    return static_file(filename, root='./WebUI/static/')

	# Special route for Favicon	@route('/favicon.ico')
	def sendFavicon(self):
	    return static_file('favicon.ico', root='./WebUI/static/images/')


	''' Communication Info!
			Note: in order to send and receive data your JS needs to look
			something like this:

				For Sending to Rover:

					$.ajax({
						url: "/data/<data name goes here>",
						method: "POST",
						data: JSON.stringify({"axes" : gp.axes}),
						contentType: "application/json"
					});

					In this case, the JSON gets translated directly into a rover
					dictionary object, just like in JsonServer when using a
					standalone application. Data is then distributed by StateManager.

					The reccomended format is to collect similar messages to a specific
					thread/module into a single key and use an array for the values.

				For Getting from Rover:

					$.ajax({
						url: "/req/<request name goes here>",
						method: "POST",
						data: JSON.stringify({"axes" : gp.axes}),
						contentType: "application/json",
						complete: function(results) {
								alert("Something happened!" + JSON.stringify(results));
							}

					});

					Of course in this case you will want to actually do something
					with the results. I don't reccomend alerts because they are annoying! ;)

	'''

	# POST Route for sending data directly to the rover database
	#	Incoming data must be valid JSON (checked)
	def recvData(self, item):
		msg_dict = self.byteify(json.loads(str(request.body.read(), encoding='UTF-8')))
		if isinstance(msg_dict, dict):
			key = list(msg_dict.keys())[0]
			data = msg_dict[key]
			if self.parent is not None:
				if key == "gamepad1":
					# Break gamepad message into individual components
					for k in data.keys():
						self.parent.publish(k, data[k])
				else:
					self.parent.publish(key, data)
			else:
				print(data)

	# POST Route for requesting data from the rover
	def sendData(self, item):
		if self.parent is not None:
			with self.dataSem:
				try:
					jsonData = json.dumps(self.parent.data.pop(item))
					return jsonData
				except KeyError:
					print("Err: requested key", str(item), "not found!")
				except:
					raise

		else:
			return json.dumps({item : "test"})

	# Websocket Route for sending streaming data to the rover (ie. fast control)
	def handle_websocket(self, ws):
		if ws is None:
			print('WARN: Connection is not a websocket!')
		while ws is not None:
			msg = ws.receive()
			if msg is not None:
				ws.send(msg)
			else: break

	# Utility to more robustly parse json into a python dict
	def byteify(self, input):
		if isinstance(input, dict):
			return(
					{self.byteify(key): self.byteify(value)
					for key, value in input.items()})
		elif isinstance(input, list):
			return [self.byteify(element) for element in input]
		# elif isinstance(input, unicode):
		# 	return input.encode('utf-8')
		else:
			return input
