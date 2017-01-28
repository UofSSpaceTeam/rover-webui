<!DOCTYPE html>
<html>
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
    <link rel="stylesheet" href="/static/scripts/bootstrap-3.3.7-dist/css/bootstrap.min.css"></link>
    <script src="/static/scripts/jquery.min.js"></script>
    <script src="/static/scripts/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="/static/scripts/GamePad.js"></script>
    <script src="/static/scripts/msgpack-lite-master/dist/msgpack.min.js"></script>
    <script src="https://rawgit.com/kawanet/msgpack-lite/master/dist/msgpack.min.js"></script>

</head>
<body onload="">
  <div class="jumbotron text-center">
    <div class >
      <img src="\static\images\USST_Logo.png" alt="Logo">
      <h1> Rover Control Interface</h1>
      <ul class="nav nav-pills">
          <li role="presentation" class="active"><a href="home">Home</a></li>
          <li role="presentation"><a href="cameraPage">Camera Page</a></li>
          <li role="presentation"><a href="#">Data Page</a></li>
          <li role="presentation"><a href="#">Arm Page</a></li>
      </ul>
    </div>
    <div id ="map">
      <h2> Local Area Map</h2>
      <img class = "img-responsive" src="\static\images\output.png" alt="Map"></img>
    </div>
    <div id="gamepadPrompt"></div>
    <div id="gamepadDisplay">
    </div>
  </div>
    </body>
</html>
