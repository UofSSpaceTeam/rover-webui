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
        <!--Liveplayer Script -->
        <script type="text/javascript" src="_main.js">;</script>


<head>
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
</head>
<body>

<div data-role="content">

    <div class="row no-gutter">
        <div class="container-fluid">
            <button type ="button" class="btn btn-default" onclick="wsavc.playStream()" class="ui-btn" data-role="button">Start Video</button>
            <button type ="button" class="btn btn-default" onclick="wsavc.stopStream()" class="ui-btn" data-role="button">Stop Video</button>
            <button type ="button" class="btn btn-default" onclick="wsavc.disconnect()" class="ui-btn" data-role="button">Disconnect</button>
        </div>	   		
    </div>
</div>

</body>
</html>