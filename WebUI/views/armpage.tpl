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
                        <li><a href=3.3.3.4>Video Config</a></li>
                        <li><a href=3.3.3.5>Radio Config</a></li>
                        <li><a href = "/datapage">Data</a></li>
                        <li><a href ="/options">Options</a></li>
                        <li class = "active"><a href = "/armpage">Arm</a></li>
                        <li><a href = "/miscControls">Misc. Controls</a></li>
                    </ul>
                </div>

		<!---Leaflet Scripts, all the aids. -->
		<script type="text/javascript" src ="static/scripts/navMap.js"></script>
		<script src="static/libs/leaflet/leaflet-src.js"></script>
		<link rel="stylesheet" href="/static/libs/leaflet/leaflet.css" />

    </head>


<body onload="Gamepad()">
    <!---Main Div Container-->
    <div class="jumbotron">
      <div class = ".col-md-8">
        <h1> Arm Position</h1>
        <canvas id="armCanvas" width=400 height=400>


        </canvas>
      </div>


    </div>
</body>
</html>

<script>
setInterval(function() {

  ArmPostion = [];

  $.ajax({
        url: "/req/Arm",
        method: "POST",
        data: JSON.stringify({"ArmPosition" : ArmPostion}),
        contentType: "application/json",
        complete: function(results) {


  }
});

  var c = document.getElementById("armCanvas");
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(0,200);
  ctx.lineTo(100, 100);
  ctx.lineTo(350, 200);
  ctx.stroke();

}, 1000);





</script>
