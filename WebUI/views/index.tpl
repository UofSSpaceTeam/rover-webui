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
        <script src="/static/scripts/chart.js"></script>

        <div class="dropdown">
                    <ul class="nav nav-tabs">
                        <li class="active"><a href="/home">Index</a></li>
                      </ul>
                </div>

		<!---Leaflet Scripts, all the aids. -->
		<script type="text/javascript" src ="static/scripts/navMap.js"></script>
		<script src="static/libs/leaflet/leaflet-src.js"></script>
		<link rel="stylesheet" href="/static/libs/leaflet/leaflet.css" />

    </head>


<body onload="">
    <!---Main Div Container-->
    <div class="jumbotron">

        <div class="row">
          <canvas id="myChart" width="400" height="200"></canvas>
          </div>
    </div>
    <script>
            var canvas = document.getElementById('myChart');
            var data = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    backgroundColor: "rgba(255,99,132,0.2)",
                    borderColor: "rgba(255,99,132,1)",
                    borderWidth: 2,
                    hoverBackgroundColor: "rgba(255,99,132,0.4)",
                    hoverBorderColor: "rgba(255,99,132,1)",
                    data: [65, 59, 30, 81, 56, 55, 40],
                }
            ]
        };
        var option = {
        animation: {
        				duration:5000
        }

        };


        var myBarChart = Chart.Bar(canvas,{
        	data:data,
          options:option
        });

    </script>
</body>
</html>
