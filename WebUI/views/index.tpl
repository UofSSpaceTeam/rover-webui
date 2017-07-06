<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="/static/scripts/bootstrap-3.3.7-dist/css/bootstrap.min.css"></link>
    <script src="/static/scripts/jquery.min.js"></script>
    <script src="/static/scripts/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
    <script src="/static/scripts/GamePad.js"></script>

</head>


<style>
#statsDiv{
  position: absolute;
  left: 1520px;
  top: 180px;
}

</style>


<body>
  <h1 class = "text-center">USST</h1>
  <h2 class = "text-center">Rover Control Interface</h2>
  <div class="container">
      <ul class="nav nav-tabs">
        <li class="active"><a href="#">Home</a></li>
        <li><a href="#">Camera</a></li>
        <li><a href="#">Settings</a></li>
        <li><a href="#">Stats</a></li>
      </ul>
  </div>
  <div class="jumbotron text-center">

    <canvas id="myCanvas" width = "1069" height ="808" style="border:1px solid #d3d3d3;">

    </canvas>
    <div id = "statsDiv">
      <h1>Coordinates</h2>
        <h2>Start</h2>
        <div class="form-group">
          <label for="usr">Latitude</label>
          <input type="float" class="form-control" id="sLat">
        </div>
        <div class="form-group">
            <label for="sLong">Longitude</label>
            <input type="float" class="form-control" id="sLong">
        </div>
        <h2>End</h2>
        <div class="form-group">
          <label for="usr">Latitude</label>
          <input type="float" class="form-control" id="eLat">
        </div>
        <div class="form-group">
            <label for="eLong">Longitude</label>
            <input type="float" class="form-control" id="eLong">
        </div>
        <button type="button" class="btn btn-default" onclick="calculateFunction()">Enter</button>

    </div>
  </div>
  <h2>Bottle Websockets!</h2>
    <form id="send" action='.'>
        <input type="text" value="message" />
        <input type="submit" value="Send" />
    </form>
    <div id="messages"></div>
  </body>
</html>

<script>
  window.onload = function() {

    $(document).ready(function() {
            if (!window.WebSocket) {
                if (window.MozWebSocket) {
                    window.WebSocket = window.MozWebSocket;
                } else {
                    $('#messages').append("<li>Your browser doesn't support WebSockets.</li>");
                }
            }
            ws = new WebSocket('ws://127.0.0.1:8000/websocket');
            ws.onopen = function(evt) {
                $('#messages').append('<li>WebSocket connection opened.</li>');
            }
            ws.onmessage = function(evt) {
                $('#messages').append('<li>' + evt.data + '</li>');
            }
            ws.onclose = function(evt) {
                $('#messages').append('<li>WebSocket connection closed.</li>');
            }
            $('#send').submit(function() {
                ws.send($('input:first').val());
                $('input:first').val('').focus();
                return false;
            });
        });
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        var img = new Image;
        img.src = "/static/Map.png";
        width = c.width;
        height = c.height;
  }

  function calculateFunction(){
    var sLat = document.getElementById("sLat").value
    var sLong = document.getElementById("sLong").value
    var eLat = document.getElementById("eLat").value
    var eLong = document.getElementById("eLong").value
    var distLat = (Math.abs(sLat) - Math.abs(eLat)) * 110575;
    var distLong = (Math.abs(sLong) - Math.abs(eLong)) * 111303;
    DrawLine(sLat,sLong,eLat,eLong)
}
  function DrawLine(sLat,sLong,eLat,eLong){
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(300,150);
    ctx.stroke()
  }

  function DrawRover(){
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    ctx.beginPath();
    ctx.arc(x,y,50,0,2*Math.PI);
    ctx.stroke();

  }
  window.setInterval(function(){
    DrawRover(x+=1,y+=1)

  }, 1000);


</script>
