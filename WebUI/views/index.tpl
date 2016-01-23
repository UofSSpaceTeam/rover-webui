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
                        <a class ="dropdown-toggle" data-toggle="dropdown" href="#5">Page Dropdown Menu
                            <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="/camera">Camera</a></li>
                                <li><a href="/gamepad">Gamepad</a></li>
                                <li><a href="/home">Navigation</a></li>
                            </ul>
                    </ul>
                </div>  
    </head>
    

<body>
    <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-8">.col-xs-12 .col-sm-6 .col-md-8</div>
        <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
    </div>
    <div class="row">
        <div class="col-xs-6 col-sm-4">.col-xs-6 .col-sm-4</div>
        <div class="col-xs-6 col-sm-4">.col-xs-6 .col-sm-4</div>
    <!-- Optional: clear the XS cols if their content doesn't match in height -->
    <div class="clearfix visible-xs-block"></div>
        <div class="col-xs-6 col-sm-4">.col-xs-6 .col-sm-4</div>
    </div>
</body>
</html>
