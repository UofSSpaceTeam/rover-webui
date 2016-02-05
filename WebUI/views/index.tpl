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
                                <li><a href ="/gamepadoptions">Gamepad Options</a></li>
                            </ul>
                    </ul>
                </div>  
    </head>
    

<body onload="GamePad();">
    <script src="/static/scripts/gamepad.js"></script>
    <!---Main Div Container-->
    <div class="row">
        <!---Navigation Main Div-->
        <div class="col-xs-12 col-sm-6 col-md-8" div align = "Center">
            <h1 font size ="20">Navigation</h1>
            <!---Navigation Image and Script Div-->
            <div div align = "center"> 
                <img src = "http://www.advancedcustomfields.com/wp-content/uploads/2013/11/acf-google-maps-field-2.png"></img>
            </div>
        </div>
        <!---Core Data Main Div-->
        <div class="col-xs-6 col-md-4" div align = "Center">
            <h1 font size = "20">Core Data</h1>
            <!---Core data Info Div-->
            <div div align = "left">
                <font size = "5">
                <p><label>Dat Info:</label> 
                <label>Swag 9000</label></p>
                
                <p><label>Massive Info:</label> 
                <label>*BUFF*</label></p>

                <p><label>Hype Info:</label> 
                <label>*BWAP BWAP*</label></p>

                <p><label>Kung Fury:</label> 
                <label><img src ="http://i2.kym-cdn.com/photos/images/newsfeed/001/059/850/546.gif" height = "100" width = "200"></img></label></p>
            </font>
            </div>
        </div>
         <!---Detailed Data Main Div-->
        <div class="col-md-6 col-md-offset-3" div align = "Center">
            <h1 font size = "20">Detailed Info</h1>
            <img src = "https://media.giphy.com/media/Fsn4WJcqwlbtS/giphy.gif"></img>
        </div>
    </div>
</body>
</html>
