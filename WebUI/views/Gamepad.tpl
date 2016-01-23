<html>
<meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">
        <script src="/static/scripts/jquery.min.js"></script>
        <script src="/static/scripts/bootstrap.min.js"></script>
        <link rel="stylesheet" href="/static/css/bootstrap.min.css">


<head>
   <div class="dropdown">
                    <ul class="nav nav-tabs">
                        <li class="active"><a href="#1">Navigation Info 1</a></li>
                        <li><a href="#2">Navigation Info 2</a></li>
                        <li><a href="#3">Navigation Info 3</a></li>
                        <li><a href="#4">Navigation Info 4</a></li>
                        <li class = "dropdown">
                        <a class ="dropdown-toggle" data-toggle="dropdown" href="#5">Dropdown Menu
                            <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="/camera">Camera</a></li>
                                <li><a href="/gamepad">Gamepad</a></li>
                                <li><a href="/home">Navigation</a></li>
                            </ul>
                    </ul>
                </div>  
</head>
<body onload="GamePad();">>
<div class="container">
       <center>
       <div class="jumbotron">
           <h1>USST Rover GUI</h1>
           <script src="/static/scripts/gamepad.js"></script>
       <div id="gamepadPrompt" class = "row"></div>
       <div id="gamepadDisplay" class = "row"></div>
 </div>
   </center>

</body>
</html>
