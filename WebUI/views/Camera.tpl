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
        <!--VLC SCRIPT -->
        <script type="text/javascript" src="static/scripts/vlc.js"></script>


<head>
    <ul class="nav nav-tabs">
                        <li><a href="/home">Navigation</a></li>
                        <li class="active"><a href="/camera">Camera</a></li>
                        <li><a href=192.168.0.30>Video Config</a></li>
                        <li><a href=192.168.0.31>Radio Config</a></li>
                    </ul>
<script type='text/javascript'>
$(window).load(function(){
     $(function(){
         $(".dropdown").on("click", "li", function(event){
            VLC();
         })
     })
});
</script>
</head>
<body>

<div data-role="content">
        <div class="row">
            <div class = "col-md-8">
                <embed
                        type="application/x-vlc-plugin" 
                        pluginspage="http://www.videolan.org"
                        windowless = "true" 
                        version="VideoLAN.VLCPlugin.2"
                        width="100%"
                        height="100%"
                        target="udp://@227.2.2.8:1235";
                        id="vlc">
                </embed>
            </div>
            <div class = "col-md-4"> 
                <div class="dropdown">
                      <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" align = "left">Camera
                      <span class="caret"></span></button>
                      <ul class="dropdown-menu">
                        <li><a id="camera1" >Camera 1</a></li>
                        <li><a id="camera2" >Camera 2</a></li>
                        <li><a id="camera3" >Camera 3</a></li>
                      </ul>
                </div>
            </div>
        </div>
</div>

</body>
</html>