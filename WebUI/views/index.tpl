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
                        <li class="active"><a href="/home">Navigation</a></li>
                        <li><a href="/camera">Camera</a></li>
                        <li><a href="/gamepad">Gamepad</a></li>
                        <li><a href="/gamepadoptions">Gamepad Options</a></li>
                    </ul>
                </div>  

        <!---Leaflet Scripts, all the aids. -->

    <link rel="stylesheet" href="/static/libs/leaflet/leaflet.css" />
    <link rel="stylesheet" href="/static/libs/leaflet/leaflet.draw/dist/Leaflet.draw.css" />
    
    <script type="text/javascript" src ="static/scripts/leaflet.js"></script>

    <script src="static/scripts/libs/leaflet-src.js"></script>

    <script src="static/libs/leaflet/leaflet.draw/src/Leaflet.draw.js"></script>

    <script src="static/libs/leaflet/leaflet.draw/src/edit/handler/Edit.Poly.js"></script>
    <script src="static/libs/leaflet/leaflet.draw/src/edit/handler/Edit.SimpleShape.js"></script>
    <script src="static/libs/leaflet/leaflet.draw/src/edit/handler/Edit.Circle.js"></script>
    <script src="static/libs/leaflet/leaflet.draw/src/edit/handler/Edit.Rectangle.js"></script>

    <script src="static/libs/leaflet/leaflet.draw/src/draw/handler/Draw.Feature.js"></script>
    <script src="static/libs/leaflet/leaflet.draw/src/draw/handler/Draw.Polyline.js"></script>
    <script src="static/libs/leaflet/leaflet.draw/src/draw/handler/Draw.Polygon.js"></script>
    <script src="static/libs/leaflet/leaflet.draw/src/draw/handler/Draw.SimpleShape.js"></script>
    <script src="static/libs/leaflet/leaflet.draw/src/draw/handler/Draw.Rectangle.js"></script>
    <script src="static/libs/leaflet/leaflet.draw/src/draw/handler/Draw.Circle.js"></script>
    <script src="static/libs/leaflet/leaflet.draw/src/draw/handler/Draw.Marker.js"></script>

    <script src="static/libs/leaflet/leaflet.draw/src/ext/LatLngUtil.js"></script>
    <script src="static/libs/leaflet/leaflet.draw/src/ext/GeometryUtil.js"></script>
    <script src="static/libs/leaflet/leaflet.draw/src/ext/LineUtil.Intersect.js"></script>
    <script src="static/libs/leaflet/leaflet.draw/src/ext/Polyline.Intersect.js"></script>
    <script src="static/libs/leaflet/leaflet.draw/src/ext/Polygon.Intersect.js"></script>

    <script src="static/libs/leaflet/leaflet.draw/src/Control.Draw.js"></script>
    <script src="static/libs/leaflet/leaflet.draw/src/Tooltip.js"></script>
    <script src="static/libs/leaflet/leaflet.draw/src/Toolbar.js"></script>

    <script src="static/libs/leaflet/leaflet.draw/src/draw/DrawToolbar.js"></script>
    <script src="static/libs/leaflet/leaflet.draw/src/edit/EditToolbar.js"></script>
    <script src="static/libs/leaflet/leaflet.draw/src/edit/handler/EditToolbar.Edit.js"></script>
    <script src="static/libs/leaflet/leaflet.draw/src/edit/handler/EditToolbar.Delete.js"></script>
    
    </head>
    

<body onload="main()">
    <script src="/static/scripts/gamepad.js"></script>
    <!---Main Div Container-->
    <div class="row">
        <!---Navigation Main Div-->
        <div class="col-xs-12 col-sm-6 col-md-8" div align = "Center">
            <h1 font size ="20">Navigation</h1>
            <!---Navigation Image and Script Div-->
            <div id="map" style="width: auto; height:100%; border: 1px solid #ccc"></div>
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
                <label><img src ="http://i2.kym-cdn.com/photos/images/newsfeed/001/059/850/546.gif" height = auto; width = auto;</img></label></p>
            </font>
            </div>
        </div>
         <!---Detailed Data Main Div-->
        <div class="col-md-6 col-md-offset-3" div align = "Center">
            <h1 font size = "20">Detailed Info</h1>
            <img src = "https://media.giphy.com/media/Fsn4WJcqwlbtS/giphy.gif" height = auto; width = auto;></img>
        </div>
    </div>
</body>
</html>
