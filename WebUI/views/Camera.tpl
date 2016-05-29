<html>
<meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">
        <link rel="stylesheet" href="/static/css/bootstrap.min.css">
        <link rel ="stylesheet" href="/static/css/NoGutter.css">
        <script src="static/scripts/jquery.min.js"></script>
        <script src="static/scripts/bootstrap.min.js"></script>
        <script src="/static/scripts/DataLog.js"></script>
        <!--Liveplayer Script -->

        <!--VLC SCRIPT -->
        <script type ="text/javascript" src ="static/scripts/cameraButton.js"></script>


<head>
    <ul class="nav nav-tabs">
                        <li><a href="/home">Navigation</a></li>
                        <li class="active"><a href="/camera">Camera</a></li>
                        <li><a href=http//:3.3.3.4>Video Config</a></li>
                        <li><a href=http//:3.3.3.5>Radio Config</a></li>
                        <li><a href= "/datapage">Data</a></li>
                        <li><a href ="/options">Options</a></li>
                        <li><a href = "/armpage">Arm</a></li>
                        <li><a href = "/miscControls">Misc. Controls</a></li>


                    </ul>
<script type='text/javascript'>
$(window).load(function(){
     $(function(){
         $(".dropdown").on("click", "li", function(event){

         })
     })
});
</script>
</head>
<body onload ="DataLog()">

<div data-role="content">
        <div class="row">
            <div class = "col-md-8">
              <h1 align = "center"> Video Stream </h1>
              <embed type="application/x-vlc-plugin" version="VideoLAN.VLCPlugin.2"
                  width=100%
                  height=100%
                  id="vlc"
              </embed>
              <script>
              </script>
            </div>
            <div class = "col-md-4">
                <h1 align = "center"> Camera Controls </h1>


               <div class="dropdown"> Camera Selection:
                 <p id = "currentCameraLabel"> Current Camera:</p>
                  <button type="button" class="btn btn-default"onclick = "PreviousCamera()"><span class="glyphicon glyphicon-arrow-left"></span>Previous Camera</button>
                  <button type="button" class="btn btn-default" onclick = "NextCamera()"><span class="glyphicon glyphicon-arrow-right"></span>Next Camera</button>
                </div>
                <p> Camera Movement </p>
                <p align = "center"><button type="button" class="btn btn-default" id ="btnUp" onclick = "cameraButton(1)"><span class="glyphicon glyphicon-arrow-up"></span>Up</button></p>
                <p align = "center"><button type="button" class="btn btn-default" id = "btnLeft" onclick = "cameraButton(3)"><span class = "glyphicon glyphicon-arrow-left"></span>Left</button>
                <button type="button" class="btn btn-default" id = "btnRight" onclick = "cameraButton(4)"><span class = "glyphicon glyphicon-arrow-right"></span>Right</button></p>
                <p align = "center"><button type="button" class="btn btn-default" id = "btnDown" onclick = "cameraButton(2)"><span class = "glyphicon glyphicon-arrow-down"></span>Down</button></p>
                <p> Camera buttons: Start/Stop - <button type="button" class="btn btn-default" id = "btnStop" onclick = "cameraButton(5);PlayButton();"><span class = "glyphicon glyphicon-ok-sign"></span>Start</button>
                <button type="button" class = "btn btn-default" id ="btnStart" onclick = "cameraButton(6);StopButton();"><span class = "glyphicon glyphicon-remove-sign"></span>Stop</button></p>
            </div>
        </div>
</div>

<script>
  var vlc = document.getElementById("vlc");
  vlc.playlist.add("rtsp://3.3.3.4:554/mux1.sdp", "mystream1", ":network-caching=100");
  vlc.playlist.add("rtsp://3.3.3.4:554/mux2.sdp", "mystream2", ":network-caching=100");
  vlc.playlist.add("rtsp://3.3.3.4:554/mux3.sdp", "mystream3", ":network-caching=100")
  vlc.playlist.add("rtsp://3.3.3.4:554/mux4.sdp", "mystream4", ":network-caching=100")

  function NextCamera(){
    var x = Number(localStorage.getItem("currentCameraNum")) + 1;
    localStorage.setItem("currentCameraNum",x);
    vlc.playlist.next();
    vlc.playlist.play();
    document.getElementById("currentCameraLabel").innerHTML = "Current Camera: " + x;


  }
  function PreviousCamera(){
    var x = Number(localStorage.getItem("currentCameraNum")) - 1;
    localStorage.setItem("currentCameraNum",x);
    vlc.playlist.prev();
    vlc.playlist.play();
    document.getElementById("currentCameraLabel").innerHTML = "Current Camera: " + x;
  }
  function PlayButton(){
    vlc.playlist.play();

  }

  function StopButton(){
    vlc.playlist.stop();


  }
</script>
</body>
</html>
