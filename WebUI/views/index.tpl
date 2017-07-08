<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="/static/scripts/bootstrap-3.3.7-dist/css/bootstrap.min.css"></link>
    <script src="/static/scripts/jquery.min.js"></script>
    <script src="/static/scripts/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
    <script src="/static/scripts/GamePad.js"></script>

</head>


<style>

</style>


<body>
  <h1 class = "text-center">USST</h1>
  <h2 class = "text-center">Rover Control Interface</h2>
  <div class="container">
      <ul class="nav nav-tabs">
        <li class="active"><a href="#">Home</a></li>
        <li><a href="http://3.3.3.4:7890/?action=stream">Camera0</a></li>
        <li><a href="http://3.3.3.4:7891/?action=stream">Camera1</a></li>
      </ul>
  </div>
  <div class="jumbotron text-centered">
    <div class="row">
      <div class="col-sm-12">
        <canvas id="myCanvas" style="border:1px solid #d3d3d3;width:100%;height:100%">

        </canvas>
      </div>
    </div>
    <div class = "row">
      <div class = "col-sm-6">
            <h2>Start</h2>
            <div class="form-group">
              <label for="usr">Latitude</label>
              <input type="float" class="form-control" id="sLat">
            </div>
            <div class="form-group">
                <label for="sLong">Longitude</label>
                <input type="float" class="form-control" id="sLong">
            </div>
      </div>
      <div class = "col-sm-6">
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

  <div class = "row">
    <div class = "col-sm-6">
          <h2>Bottom Left GPS Reference</h2>
          <div class="form-group">
            <label for="usr">Latitude</label>
            <input type="float" class="form-control" id="BLLat">
          </div>
          <div class="form-group">
              <label for="sLong">Longitude</label>
              <input type="float" class="form-control" id="BLLong">
          </div>
    </div>
    <div class = "col-sm-6">
      <h2>Top Right GPS Reference</h2>
      <div class="form-group">
        <label for="usr">Latitude</label>
        <input type="float" class="form-control" id="TRLat">
      </div>
      <div class="form-group">
          <label for="eLong">Longitude</label>
          <input type="float" class="form-control" id="TRLong">
      </div>
      <div class="form-group">
          <label for="eLong">Image Source</label>
          <input type="float" class="form-control" id="ImageSource">
      </div>
      <button type="button" class="btn btn-default" onclick="ReferenceUpdate()">Enter</button>
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

  var imgSrc = "/static/Map.png";

  var BottomLeftReference = [52.119890,-106.656574]
  var TopRightReferece = [52.126923,-106.63845]

  var width = (TopRightReferece[1] - BottomLeftReference[1]) * 111303
  var height = (TopRightReferece[0]-BottomLeftReference[0]) * 110575

  var RoverX = 0;
  var RoverY = 0;

  var StartMotion = false;

  //Nav Variables

  var sLat = 0.0;
  var sLong = 0.0;
  var eLat = 0.0;
  var eLong = 0.0;
  var distLat = 0.0;
  var distLong = 0.0;
  var pixPerMeterLat = 0.0;
  var pixPerMeterLong = 0.0;

  //Img Variables
  var c = document.getElementById("myCanvas");
  var img = new Image;

  window.onload = function() {

    GamePadMasterFunction();
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
  }

  function calculateFunction(){
    StartMotion = true;
    sLat = document.getElementById("sLat").value
    sLong = document.getElementById("sLong").value
    eLat = document.getElementById("eLat").value
    eLong = document.getElementById("eLong").value
    distLat = (Math.abs(sLat) - Math.abs(eLat)) * 110575;
    distLong = (Math.abs(sLong) - Math.abs(eLong)) * 111303;
    pixPerMeterLat = Math.abs(distLat / img.height);
    pixPerMeterLong = Math.abs(distLong / img.width);
    DrawLine()
}
  function DrawLine(){
    var c=document.getElementById("myCanvas");
    var horz=c.getContext("2d");
    var RoverEY = ((eLat - BottomLeftReference[0]) * 110575) / height
    var RoverEX = ((eLong - BottomLeftReference[1]) * 111303) / width
    horz.beginPath();
    horz.moveTo(img.width * RoverX,img.height - (img.height * RoverY));
    horz.lineTo(img.width * RoverEX,img.height - (img.height * RoverEY));
    horz.stroke()

  }

  window.setInterval(function(){
    var c = document.getElementById("myCanvas")
    var ctx = c.getContext("2d");
    ctx.clearRect(0,0,c.width,c.height)
    img.src = imgSrc;
    var width = img.width;
    var height = img.height;
    c.width = width
    c.height = height
    ctx.drawImage(img,0,0,width,height);

    if (StartMotion == true){
      RoverY = ((sLat - BottomLeftReference[0]) * 110575) / height
      RoverX = ((sLong - BottomLeftReference[1]) * 111303) / width
      ctx.beginPath();
      ctx.arc(img.width * RoverX, (img.height - (img.height * RoverY)),10,0,2*Math.PI);
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.stroke();
    }

    GPSUpdate()
  }, 100);

  function GPSUpdate(){
    if(StartMotion == true){
      $.get("req/RoverPosition", function(data, status){
        data = JSON.parse(data)
        sLat = data[0];
        sLong = data[1];
      });
    }
  }

  function ReferenceUpdate(){
    BottomLeftReference[0] = document.getElementById("BLLat").value;
    BottomLeftReference[1] = document.getElementById("BLLong").value;
    TopRightReferece[0] = document.getElementById("TRLat").value;
    TopRightReferece[0] = document.getElementById("TRLong").value;
    imgSrc = document.getElementById("ImageSource").value;

    var ctx = c.getContext("2d");
    img.src = imgSrc;
    var width = img.width;
    var height = img.height;
    c.width = width
    c.height = height
    ctx.drawImage(img,0,0,width,height);

  }

</script>
