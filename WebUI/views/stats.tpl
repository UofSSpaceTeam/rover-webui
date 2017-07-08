<!DOCTYPE html>
<html>
  <head>
    <!-- <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script> -->
    <link rel="stylesheet" href="/static/scripts/bootstrap-3.3.7-dist/css/bootstrap.min.css"></link>
    <script src="/static/scripts/jquery.min.js"></script>
    <script src="/static/scripts/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
    <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script> -->
    <script src="/static/scripts/GamePad.js"></script>
    <script src="/static/scripts/ButtonIDs.js"></script>
    <script src="/static/scripts/StatsController.js"></script>
  </head>

<!--  CUSTOM CSS CLASSES  -->
<style>
	.importantSubTitles {
		font-size: 14px;
		text-align: center;
		font-style: italic;
		font-weight: bold;
	}
</style>


<body onload="GamePadMasterFunction()">



  <div class="jumbotron text-center">
    <h1>Stats</h1>
  </div>

  <div ng-app='statsApp' ng-controller='statsCtrl' class="container">
    <div class="row-sm-2 row-md-3 row-lg-4">
  
  	  <div class="col-sm-6" style="border:1px solid black;">
  	  	<div id="gamepadPrompt"></div>
   		<div id="gamepadDisplay"></div>
  	  </div>
  
      <div class="col-sm-6" style="border:1px solid black;">
      	<div id="statsData">Waiting for JSON stats data to be read...</div>
      </div>
    
    </div>
  </div>
</body>
</html>
