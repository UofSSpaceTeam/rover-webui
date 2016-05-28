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
        <script src="/static/scripts/gamepad.js"></script>
        <script src="/static/scripts/DataLog.js"></script>
        <div class="dropdown">
                    <ul class="nav nav-tabs">
                        <li><a href="/home">Navigation</a></li>
                        <li><a href="/camera">Camera</a></li>
                        <li><a href=3.3.3.4>Video Config</a></li>
                        <li><a href=3.3.3.5>Radio Config</a></li>
                        <li><a href = "/datapage">Data</a></li>
                        <li class = "active"><a href ="/options">Options</a></li>
                        <li><a href ="/armpage">Arm</a></li>
                        <li><a href = "/miscControls">Misc. Controls</a></li>
                    </ul>
                </div>

		<!---Leaflet Scripts, all the aids. -->
		<script type="text/javascript" src ="static/scripts/navMap.js"></script>
		<script src="static/libs/leaflet/leaflet-src.js"></script>
		<link rel="stylesheet" href="/static/libs/leaflet/leaflet.css" />

    </head>


<body onload="DataLog();OptionPageDataUpdate();">
    <!---Main Div Container-->
    <div class="jumbotron">
      <h1 font size ="20" align = "center">Options</h1>

                  <div class="row">
                      <!---Navigation Main Div-->
                      <div class="col-md-4">
                        <p font size ="12">Motor Options</p>
                        <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" id = "motorControl">Motor Select
                          <span class="caret"></span></button>
                                <ul class="dropdown-menu">
                                <li><a href="#" id = "motorOne">Speed</a></li>
                                <li><a href="#" id = "motorTwo">Torque</a></li>
                                <li><a href="#" id = "motorThree">Current</a></li>
                          </ul><br>



                      </div>
                      <div class="col-md-4">
                          <!---Navigation Image and Script Div-->

                            <p font size ="12" >Gamepad Options</p>
                            <label> Deadzone data: </label><input type = "integer" id ="deadzoneValue"></input><br>
                            <label> Controller Switch: </label>
                            <input type="radio" name="controller" id ="controllerOne" value="1" checked="true" onclick="ControllerUpdate()">Controller #1
                            <input type="radio" name="controller" id = "controllerTwo" value="2" onclick="ControllerUpdate()">Controller #2<br>

                      </div>
                      <div class = "col-md-4">
                        <p font size ="12" >Other Options</p>
                        <button type="button" class="btn btn-default" id ="UpdateOptions" onclick = "GamePadDataUpdate();GamePad();">Update Data</button>
                        <button type="button" class="btn btn-default" id ="ResetData" onclick = "ResetData()">Reset Data</button>
                        <button type="button" class="btn btn-default" id ="ResetRoverSoftware" onclick = "ResetRoverSoftware()">Reset Rover Software</button><br>
                        <p font size ="12" >Battery Voltage</p>
                        <p>#1 <input type = "textbox" id = "batteryVolt1"></input></p>
                        <p>#2 <input type = "textbox" id = "batteryVolt2"></input></p>
                        <p>#3 <input type = "textbox" id = "batteryVolt3"></input></p>
                        <p>#4 <input type = "textbox" id = "batteryVolt4"></input></p>
                        <p>#5 <input type = "textbox" id = "batteryVolt5"></input></p>
                        <p>#6 <input type = "textbox" id = "batteryVolt6"></input></p>
                        <p>#7 <input type = "textbox" id = "batteryVolt7"></input></p>
                        <p>#8 <input type = "textbox" id = "batteryVolt8"></input></p>
                      </div>
                  </div>



        </div>

    </div>
</body>
</html>

<script>
var batteryVolt = [];
function ControllerUpdate(){
  if(document.getElementById("controllerOne").checked == true){
    localStorage.setItem("controllerOption",0)

  }
  else if(document.getElementById("controllerTwo").checked == true){
      localStorage.setItem("controllerOption",1)

    }
}

setInterval(function() {

  $.ajax({
        url: "/req/batteryVoltage",
        method: "POST",
        data: JSON.stringify({"batteryVoltage" : BatteryVolt}),
        contentType: "application/json",
        complete: function(results) {
          console.log("Battery Voltage Recieved")


  }
});

document.getElementById("batteryVolt1").value = BatteryVolt[0];
document.getElementById("batteryVolt1").value = BatteryVolt[1];
document.getElementById("batteryVolt1").value = BatteryVolt[2];
document.getElementById("batteryVolt1").value = BatteryVolt[3];
document.getElementById("batteryVolt1").value = BatteryVolt[4];
document.getElementById("batteryVolt1").value = BatteryVolt[5];
document.getElementById("batteryVolt1").value = BatteryVolt[6];
document.getElementById("batteryVolt1").value = BatteryVolt[7];
document.getElementById("batteryVolt1").value = BatteryVolt[8];




}, 1000);


</script>
