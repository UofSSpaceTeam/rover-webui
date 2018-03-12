<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="/static/scripts/angular.min.js"></script>
    <script src="/static/scripts/bootstrap.min.js"></script>
    <script src="/static/jquery_min.js"></script>
	<script src="TestScript.js"></script>
</head>
  <body>
    <div class="jumbotron text-center">
  <h1>Camera Page</h1>
  <p></p>
</div>


<!--  CUSTOM CSS CLASSES  -->
<style>
	.importantTitle {
		font-size: 24px;
		text-align: center;
		font-weight: bold;
		text-transform: capitalize;
	}
	.importantSubTitles {
		font-size: 14px;
		text-align: center;
		font-style: italic;
		font-weight: bold;
	}
	.extraInfo {
		font-size: 12px;
		text-align: center;
		font-style: italic;
	}
</style>



<div ng-app='myApp' ng-controller='myCtrl' class="container">
	<div class="col">
		<div class="row-sm-10 row-md-9 row-lg-8 importantTitle">
				<div class="caption">
					<b>Live camera feed<br></b>
				</div>
			<video controls ng-src="{{liveStreamURL}}" >
			Your browser does not support the video tag or RTP streams.
			</video>
			
		</div>
		
		<!--
			DIV TO HOLD THE 3 CAMERA ANGLES
			PICTURES THAT REFRESH EVERY 30 SECONDS
		-->
  		<div class="row-sm-2 row-md-3 row-lg-4 importantSubTitles">
   	 		<div class="col-sm-4">
   	 			<div class="caption">
   	 				<br>Front-facing camera<br>
   	 			</div>
   	 			<img ng-src="{{frontCamera}}" ng-click="openFCamStream()" class="img-responsive">
   	 		</div>
   	 		<div class="col-sm-4">
   	 			<div class="caption">
   	 				<br>Left-facing camera<br>
   	 			</div>
   	 			<img ng-src="{{leftCamera}}" ng-click="openLCamStream()" class="img-responsive">
   	 			<br>
   	 		</div>
   	 		<div class="col-sm-4">
   	 			<div class="caption">
   	 				<br>Right-facing camera<br>
   	 			</div>
   	 			<img ng-src="{{rightCamera}}" ng-click="openRCamStream()" class="img-responsive">
   	 		</div>	
   	 </div>
  	</div>
  	
</div>
<div class="extraInfo">
(These 3 camera images take a new snapshot/refresh every 30 seconds)
</div>

<script>
	
	var app = angular.module('myApp', []);
	app.controller('myCtrl', function($scope, $interval) {
		
		// Function updateImages
		// Updates camera images for front, left and right cameras
		$scope.updateImages = function(){
			$scope.frontCamera = 'output.png';
			$scope.leftCamera = 'output.png';
			$scope.rightCamera = 'output.png';
		};
		
		// Updating images when the page loads
		$scope.updateImages();
		
		// Interval that updates camera images every 30 seconds
		$interval( function(){ $scope.updateImages(); }, 3000); // time in milliseconds

		// Updates the live stream video to the specified camera's stream (Front, left or right camera stream)
		$scope.openFCamStream = function(){
			$scope.liveStreamURL = 'http://localhost:4200'; // front camera
		}
		$scope.openLCamStream = function(){
			$scope.liveStreamURL = 'http://localhost:4200'; // left camera
		}
		$scope.openRCamStream = function(){
			$scope.liveStreamURL = 'http://localhost:4200'; // right camera
		}
	});


</script>

</body>
</html>
