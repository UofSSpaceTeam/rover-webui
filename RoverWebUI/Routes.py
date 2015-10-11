"""
	Routes and views for the bottle application.
"""
from bottle import route, view, template
import datetime

class WebserverRoutes():

	@route('/<name>')
	def index(name):
		return template('<b>Hello {{name}}!</b>', name=name)

	###########
	###########
	####
	####	Had to comment everything as it will not work unless I get more source files
	####		until then some demo routes are set up!
	###########
	############
	# def __init__(self):
		# @route('/')
		# @route('/home')
		# @view('layout')
		# def home():
			# """Renders the home page."""
			# return dict(
				# year=datetime.time
			# )

		# @route('/contact')
		# @view('contact')
		# def contact():
			# """Renders the contact page."""
			# return dict(
				# title='Contact',
				# message='Your contact page.',
				# year=datetime.now().year
			# )

		# @route('/about')
		# @view('about')
		# def about():
			# """Renders the about page."""
			# return dict(
				# title='About',
				# message='Your application description page.',
				# year=datetime.now().year
			# )
			
		# @route('/Gamepad')
		# @view('Gamepad')
		# def Gamepad():
			# """Renders the Gamepad page."""
			# return dict(
				# title='Gamepad',
				# message='Gamepad page',
				# year=datetime.now().year
			# )
