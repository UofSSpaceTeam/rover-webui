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
    </head>
    <body>
    <div class="container-fluid">
        <div class="row no-gutter">
            <div class="col-xs-12 col-md-8" style="width:750px;height:500px;border:1px solid #000;">
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
			</div>
            <div class="col-xs-6 col-md-4" style="width:400px;height:500px;border:1px solid #000;"></div>
        </div>

<!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
        <div class="row no-gutter">
            <div class = "col-xs-6" style = "width:1150px;height:200px;border:1px solid #000;"></div>
        </div>
    </div>
</body>
</html>
