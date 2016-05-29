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
                        <li><a href=http//:3.3.3.4>Video Config</a></li>
                        <li><a href=http//:3.3.3.5>Radio Config</a></li>
                        <li><a href = "/datapage">Data</a></li>
                        <li><a href ="/options">Options</a></li>
                        <li><a href = "/armpage">Arm</a></li>
                        <li class = "active"><a href = "/miscControls">Misc. Controls</a></li>
                    </ul>
                </div>

		<!---Leaflet Scripts, all the aids. -->
		<script type="text/javascript" src ="static/scripts/navMap.js"></script>
		<script src="static/libs/leaflet/leaflet-src.js"></script>
		<link rel="stylesheet" href="/static/libs/leaflet/leaflet.css" />

    </head>


<body>
    <!---Main Div Container-->
    <div class="jumbotron">
      <div class = "col-md-8">
        <h1>Drill Controls</h1>
        <p>Drill Speed <input type = "textbox" id ="DrillSpeedValue"></input></p>
        <p>Drill Movement Up: <button type="button" class="btn btn-default" id="DrillMovementUp"><span class="glyphicon glyphicon-arrow-up"></span>Up</button></p>
        <p>Drill Movement Down:<button type="button" class="btn btn-default" id="DrillMovementDown"><span class="glyphicon glyphicon-arrow-down"></span>Down</button></p>
        <button type="button" class="btn btn-default">LED #1</button>
        <button type="button" class="btn btn-default">LED #2</button>
        <button type="button" class="btn btn-default">LED #3</button>
        <button type="button" class="btn btn-default">LED #4</button>
        <button type="button" class="btn btn-default">LED #5</button>
        <p>Drill Weight <input type = "textbox"></input></p>
      </div>


    </div>
</body>
</html>

<script>

miscArray = []
drillControls = [];

$("#DrillMovementUp").mousedown(function() {
  intervalId = setInterval(do_something, 500);
}).mouseup(function() {
  clearInterval(intervalId);
});

function do_something() {
  drillControls[0] = document.getElementById("DrillSpeedValue").value;
  drillControls[1] = 1;
  $.ajax({
        url: "/data/drillControls",
        method: "POST",
        data: JSON.stringify({"drillControls" : drillControls}),
        contentType: "application/json",
        complete: function(results) {
          console.log("Drill Controls sent")


  }
  });

}

$("#DrillMovementDown").mousedown(function() {
  intervalId = setInterval(do_something2, 500);
}).mouseup(function() {
  clearInterval(intervalId);
});

function do_something2() {
  drillControls[0] = document.getElementById("DrillSpeedValue").value;
  drillControls[1] = -1;
  $.ajax({
        url: "/data/drillControls",
        method: "POST",
        data: JSON.stringify({"drillControls" : drillControls}),
        contentType: "application/json",
        complete: function(results) {
          console.log("Drill Controls sent")


  }
  });

}

$.ajax({
      url: "/req/miscControls",
      method: "POST",
      data: JSON.stringify({"miscControls" : miscArray}),
      contentType: "application/json",
      complete: function(results) {
        console.log("Misc info found")


}
});
</script>
