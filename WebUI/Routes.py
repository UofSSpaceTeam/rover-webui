from bottle import Bottle, route, get, template, static_file, post

import json
import os
from threading import Lock

#global value to keep track of sent data
outData = {}
lock = Lock()

class WebServerRoutes():

	def __init__(self):
		self.val = True
		self.instance = Bottle()
		self.outData = {}
		self.lock = Lock()
		
		self.buildRoutes()
		
		
	def buildRoutes(self):
		# main page
		self.instance.route('/', method="GET", callback=self.mainPage)
		self.instance.route('/index', method="GET", callback=self.mainPage)
		self.instance.route('/home', method="GET", callback=self.mainPage)
		
		# gamepad
		self.instance.route('/gamepad', method="GET", callback=self.gamepad)
		self.instance.route('/gamepadoptions', method="GET", callback=self.gamepadOptions)
		
		# camera
		self.instance.route('/camera', method="GET", callback=self.camera)
		
		# static files (TBH I have no idea how this works.. but it does!)
		self.instance.route('/static/:filename#.*#', method="GET", callback=self.sendStatic)
		self.instance.route('/favicon.ico', method="GET", callback=self.sendFavicon)
		
		# communication
		
	# define the template to show and any preprocessing
	def mainPage(self):
		return template('index')
		
	def gamepad(self):
		return template('gamepad')
		
	def camera(self):
		return template('camera')
		
	def gamepadOptions(self):
		return template('gamepadoptions')
		
	# Static Routes for CSS/Images etc
	def sendStatic(self, filename):
	    return static_file(filename, root='./WebUI/static/')
		
	# Special route for Favicon	@route('/favicon.ico')
	def sendFavicon(self):
	    return static_file('favicon.ico', root='./WebUI/static/images/')
		
		
	# Getting data from the GUI (buttons, text and controls)
	#@post('/gamepadAxes')
	#def showPostDbg():
	#	message = request.json
	#	print message
		

	#testing for communication 
		
	# test to send data to rover
	#@post('/testSend')
	def testSend():
		global outData
		global lock
		message = request.json
		print message
		with lock:
			for key in message: 
					outData[key] = message[key]
		
	def testToUI(self, message):
		print message
		
	def rvcFromUI(self):
		with self.lock:
			return self.outData
		
		
		
		
