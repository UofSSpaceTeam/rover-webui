<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">
        <link rel="stylesheet" href="/static/css/bootstrap.min.css">
        <link rel ="stylesheet" href="/static/css/NoGutter.css">
        <script src="static/scripts/jquery.min.js"></script>
        <script src="static/scripts/bootstrap.min.js"></script>
        <script src="/static/scripts/gamepad.js"></script>
        <script src="/static/scripts/DataLog.js"></script>
        <div class="dropdown">
                    <ul class="nav nav-tabs">
                        <li class="active"><a href="/home">Navigation</a></li>
                        <li><a href="/camera">Camera</a></li>
                        <li><a href=http://192.168.0.30>Video Config</a></li>
                        <li><a href=http://192.168.0.31>Radio Config</a></li>
                        <li><a href = "/datapage">Data</a></li>
                        <li><a href ="/options">Options</a></li>
                    </ul>
                </div>

		<!---Leaflet Scripts, all the aids. -->
		<script type="text/javascript" src ="static/scripts/navMap.js"></script>
		<script src="static/libs/leaflet/leaflet-src.js"></script>
		<link rel="stylesheet" href="/static/libs/leaflet/leaflet.css" />

    </head>


<body onload="GamePad();DataLog();navMap();">
    <!---Main Div Container-->
    <div class="jumbotron">
        <script src="/static/scripts/gamepad.js"></script>

        <div class="row">
            <!---Navigation Main Div-->
            <div class="col-md-8">
                <h1 font size ="20" align = "center">Navigation</h1>
                <!---Navigation Image and Script Div-->
                <div id="map" style="width: auto; height:100%; border: 1px solid #ccc"></div>
            </div>
            <!---Core Data Main Div-->
			<h1 font size ="20" align = "center">Core Data</h1>
			<div class = "col-md-1" align = "left">
				<h4>Rover Data:</h4>
				<label>X Position:</label><input type="text" id="XPos">
				<label>Y Position:</label><input type="text" id="YPos">
				<label>Stick 1 X Axis:</label><input type="text" id="Stick1X">
				<label>Stick 1 Y Axis:</label><input type="text" id="Stick1Y">
				<label>Stick 2 X Axis:</label><input type = "text" id = "Stick2X">
				<label>Stick 2 Y Axis:</label><input type = "text" id ="Stick2Y">
				
				<h4>Selected Marker:</h4>
				<label>Name:</label><input type="text" id="SelName">
				<label>Lat:</label><input type = "number" step= "any" id = "SelLat">
				<label>Lng:</label><input type = "number" step= "any" id ="SelLng">
				<label>Distance To(M):</label><input type = "number" step= .1 id ="SelDist">
				<label>Bearing To:</label><input type = "number" step= .1 id ="SelBearing">
				
				<h4>New Marker</h4>
				<label>Name: </label><input type="text" id="NewName">
				<label>Lat: </label><input type = "number" step= "any" id = "NewLat">
				<label>Lng: </label><input type = "number" step= "any" id ="NewLng">
				<input id="add marker" type="button" value="add marker" onclick="addMarker();"/>
			</div>
        </div>
    </div>
</body>
</html>
