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
                        <li class = "active"><a href = "/datapage">Data</a></li>
                        <li><a href ="/options">Options</a></li>
                    </ul>
                </div>

		<!---Leaflet Scripts, all the aids. -->
		<script type="text/javascript" src ="static/scripts/navMap.js"></script>
		<script src="static/libs/leaflet/leaflet-src.js"></script>
		<link rel="stylesheet" href="/static/libs/leaflet/leaflet.css" />
    <script>



    </script>
    </head>


<body onload="DataLog();">
    <div class="jumbotron">

        <div class="row">
          <div class="dropdown">
                  <div class="col-md-8">
                    <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Data Select
                      <span class="caret"></span></button>
                            <ul class="dropdown-menu">
                            <li><a href="#" id = "dropDown1"></a></li>
                            <li><a href="#" id = "dropDown2"></a></li>
                            <li><a href="#" id = "dropDown3"></a></li>
                      </ul>
                      <input type = "integer" id ="value"></input>

                  </div>
            </div>
        </div>

    </div>
</body>
</html>
