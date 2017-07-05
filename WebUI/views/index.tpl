<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="/static/scripts/bootstrap-3.3.7-dist/css/bootstrap.min.css"></link>
    <script src="/static/scripts/jquery.min.js"></script>
    <script src="/static/scripts/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
    <script src="/static/scripts/GamePad.js"></script>

</head>
<body onload="GamePadMasterFunction()">
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
    <canvas id="myCanvas" width="" height="" style="border:1px solid #d3d3d3;">
      Your browser does not support the HTML5 canvas tag.
    </canvas>
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
    img.src = "http://en.normandie-tourisme.fr/docs/646-1-vignettes-carte-la-normandie-sans-voiture.jpg"
    ctx.drawImage(img, 10, 10);
  }


</script>
