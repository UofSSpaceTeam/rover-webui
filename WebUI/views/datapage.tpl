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
        <script src="/static/scripts/Chart.js"></script>
        <script src = "/static/scripts/graphDraw.js"></script>
        <div class="dropdown">
                    <ul class="nav nav-tabs">
                        <li><a href="/home">Navigation</a></li>
                        <li><a href="/camera">Camera</a></li>
                        <li><a href=http://3.3.3.4>Video Config</a></li>
                        <li><a href=http://3.3.3.1>Radio Config</a></li>
                        <li class = "active"><a href = "/datapage">Data</a></li>
                        <li><a href ="/options">Options</a></li>
                        <li><a href = "/miscControls">Misc. Controls</a></li>
                        <li><a href = "/armpage">Arm Page </a></li>

                    </ul>
                </div>

		<!---Leaflet Scripts, all the aids. -->
		<script type="text/javascript" src ="static/scripts/navMap.js"></script>
		<script src="static/libs/leaflet/leaflet-src.js"></script>
		<link rel="stylesheet" href="/static/libs/leaflet/leaflet.css" />
    <script>



    </script>
    </head>


<body onload="DataLog();DrawGraph();Gamepad();">
    <div class="jumbotron">

        <div class="row">
                  <div id ="graph-div" class = "col-md-8">
                      <h1> Graph </h1>
                    <canvas id="mycanvas" width="800" height="400" style="width: 800px; height: 400px;"></canvas>
                  </div>


                  <div class="col-md-4">
                    <h1> Data Select </h1>
                    <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" id = "dataSelect">Data Select
                      <span class="caret"></span></button>
                            <ul class="dropdown-menu">
                            <li><a href="#" id = "temperatureDropDown">Temperature</a></li>
                            <li><a href="#" id = "moistureDropDown">Moisture</a></li>
                            <li><a href="#" id = "wheelDropDown">Wheel (RPMS)</a></li>
                      </ul>
                        <button type="button" class="btn btn-default" id ="ResetData" onclick = "ResetData()">Reset Data</button>
                        <button type="button" class ="btn btn-default" id ="ReloadGraph" onclick="ReloadGraph()">Reload Graph</button>


                  </div>
            </div>
        </div>

    </div>
</body>
</html>
