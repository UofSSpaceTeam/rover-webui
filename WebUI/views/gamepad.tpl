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
    <script src="/static/scripts/graphDraw.js"></script>

<!---Leaflet Scripts, all the aids. -->
<script type="text/javascript" src ="static/scripts/navMap.js"></script>
<script src="static/libs/leaflet/leaflet-src.js"></script>
<link rel="stylesheet" href="/static/libs/leaflet/leaflet.css" />

</head>


<body onload="GamePad();">
<!---Main Div Container-->
<div class="jumbotron">
    <script src="/static/scripts/gamepad.js"></script>

    <div class="row">
      <div class = "col-md-8">
        <h1 align = "center">Camera</h1>'
        <embed type="application/x-vlc-plugin" version="VideoLAN.VLCPlugin.2"
            width=100%
            height=100%
            id="vlc"
            target = ""
        </embed>
      </div>
      <div class = "col-md-4">
        <h1 align = "center">Gamepad </h1>
          <p></p>
          <h2>Button Info</h2>
          <p>Button 1:<input type = "text" id ="axes1"></input></p>
          <p>Button 2:<input type = "text" id ="axes2"></input></p>
          <p>Button 3:<input type = "text" id ="axes3"></input></p>
          <p>Button 4:<input type = "text" id ="axes4"></input></p>
        </div>
    </div>
</div>
</body>
</html>
