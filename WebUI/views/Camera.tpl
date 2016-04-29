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
                        <li><a href="/home">Navigation</a></li>
                        <li class="active"><a href="/camera">Camera</a></li>
                        <li><a href=192.168.0.30>Video Config</a></li>
                        <li><a href=192.168.0.31>Radio Config</a></li>
                    </ul>
</head>
<body>

<div data-role="content">

    <div class="row no-gutter">
        <div class="container-fluid">
            <div class = ".col-xs-12 .col-sm-6 .col-md-8"> 
                <h1> Main Camera</h1>
                <embed 
                    type="application/x-vlc-plugin" 
                    pluginspage="http://www.videolan.org" 
                    version="VideoLAN.VLCPlugin.2"
                    width="640"
                    height="480"
                    target="udp://@227.2.2.8:1235";
                    id="vlc">
                </embed>
            </div>
        </div>
    </div>
</div>

</body>
</html>