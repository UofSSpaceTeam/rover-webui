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
                        <li><a href="/home">Navigation</a></li>
                        <li><a href="/camera">Camera</a></li>
                        <li><a href=http://192.168.0.30>Video Config</a></li>
                        <li><a href=http://192.168.0.31>Radio Config</a></li>
                        <li><a href = "/datapage">Data</a></li>
                        <li class = "active"><a href ="/options">Options</a></li>
                    </ul>
                </div>

		<!---Leaflet Scripts, all the aids. -->
		<script type="text/javascript" src ="static/scripts/navMap.js"></script>
		<script src="static/libs/leaflet/leaflet-src.js"></script>
		<link rel="stylesheet" href="/static/libs/leaflet/leaflet.css" />

    </head>


<body onload="DataLog();OptionPageDataUpdate();">
    <!---Main Div Container-->
    <div class="jumbotron">
      <h1 font size ="20" align = "center">Options</h1>

                  <div class="row">
                      <!---Navigation Main Div-->
                      <div class="col-md-4">
                        <p font size ="12">Motor Options</p>
                        <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" id = "motorControl">Motor Select
                          <span class="caret"></span></button>
                                <ul class="dropdown-menu">
                                <li><a href="#" id = "motorOne">Speed</a></li>
                                <li><a href="#" id = "motorTwo">Torque</a></li>
                                <li><a href="#" id = "motorThree">Current</a></li>
                          </ul><br>



                      </div>
                      <div class="col-md-4">
                          <!---Navigation Image and Script Div-->

                            <p font size ="12" >Gamepad Options</p>
                            <label> Deadzone data: </label><input type = "integer" id ="deadzoneValue"></input><br>
                            <label> Controller Switch: </label>
                            <input type="radio" name="controller" value="1">Controller #1
                            <input type="radio" name="controller" value="2">Controller #2<br>

                      </div>
                      <div class = "col-md-4">
                        <p font size ="12" >Other Options</p>
                        <button type="button" class="btn btn-default" id ="UpdateOptions" onclick = "GamePadDataUpdate()">Update Data</button>
                        <button type="button" class="btn btn-default" id ="UpdateOptions" onclick = "ResetData()">Reset Data</button>
                      </div>
                  </div>

        </div>

    </div>
</body>
</html>

<script>




</script>
