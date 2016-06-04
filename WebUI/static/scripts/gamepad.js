
function GamePad(){
  //Added by Liam//
  var buttonInfo ='{"button": "0"}'
  var obj = JSON.parse(buttonInfo);
  var hasGP = false;
  var repGP;

  //All Local Values Set here
  var controllerOption = localStorage.getItem("controllerOption")
  var deadzone = 0.10;

  var SendDataButton = [];
  var SendDataAxes = [];

  var Test = 0;
  var RoverYPos = 0;
  var RoverXPos = 0;

  function canGame() {
    return "getGamepads" in navigator;
  }


  function reportOnGamepad() {
    var gp = navigator.getGamepads()[0];
    var html = "";
      html += "id: "+gp.id+"<br/>";


    for(var i=0;i<gp.buttons.length;i++) {



      html+= "Button "+(i+1)+": ";
      if(gp.buttons[i].pressed) html+= " pressed";
        html+= "<br/>";

      //Updates Rover Position//
      if(gp.buttons[1].pressed){
        SendDataButton[0]+=0.001;
        document.getElementById("XPos").value =SendDataButton[0];

      }
      else if(gp.buttons[0].pressed){
        SendDataButton[1]-=0.001;
        document.getElementById("YPos").value = SendDataButton[1];
      }
      else if(gp.buttons[3].pressed){
        SendDataButton[1]+=0.001;
        document.getElementById("YPos").value = SendDataButton[1];
      }
      else if(gp.buttons[2].pressed){
        SendDataButton[0]-=0.001;
        document.getElementById("XPos").value = SendDataButton[0];
      }

    }



      SendDataAxes[0] = gp.axes[0].toFixed(4);
      SendDataAxes[1] = gp.axes[1].toFixed(4);
      SendDataAxes[2] = gp.axes[2].toFixed(4);
      SendDataAxes[3] = gp.axes[3].toFixed(4);

      SendDataButton[0] = gp.buttons[0].value;
      SendDataButton[1] = gp.buttons[1].value;
      SendDataButton[2] = gp.buttons[2].value;
      SendDataButton[3] = gp.buttons[3].value;
      SendDataButton[4] = gp.buttons[4].value;
      SendDataButton[5] = gp.buttons[5].value;
      SendDataButton[6] = gp.buttons[6].value;
      SendDataButton[7] = gp.buttons[7].value;
      SendDataButton[8] = gp.buttons[8].value;
      SendDataButton[9] = gp.buttons[9].value;
      SendDataButton[10] = gp.buttons[10].value;
      SendDataButton[11] = gp.buttons[11].value;
      SendDataButton[12] = gp.buttons[12].value;
      SendDataButton[13] = gp.buttons[13].value;
      SendDataButton[14] = gp.buttons[14].value;
      SendDataButton[15] = gp.buttons[15].value;


    //Loops through Axis values
    for(var i=0;i<=3; i+=1) {
      if (0 < SendDataAxes[i] & SendDataAxes[i] < deadzone){
        SendDataAxes[i] = 0;
      }
      else if(0 > SendDataAxes[i] & SendDataAxes[i] > (-1 * deadzone)){
        SendDataAxes[i] = 0;
      }

    }

    document.getElementById("axes1").value = SendDataAxes[0]
    document.getElementById("axes2").value = SendDataAxes[1]
    document.getElementById("axes3").value = SendDataAxes[2]
    document.getElementById("axes4").value = SendDataAxes[3]



    $.ajax({
            url: "/data/buttons",
            method: "POST",
            data: JSON.stringify({"buttons" : SendDataButton }),
            contentType: "application/json",
            complete: function(results) {
                console.log("Buttons Sent");
              }
          });

    $.ajax({
            url: "/data/axes",
            method: "POST",
            data: JSON.stringify({"axes" : SendDataAxes}),
            contentType: "application/json",
            complete: function(results) {
                console.log("Axes Sent");
              }

          });

    $.ajax({
            url: "/data/controller",
            method: "POST",
            data: JSON.stringify({"Controller" : controllerOption}),
            contentType: "application/json",
            complete: function(results) {
              console.log("Controller Sent");
            }

        });

    }

  $(document).ready(function() {

    if(canGame()) {

      var prompt = "To begin using your gamepad, connect it and press any button!";
      $("#gamepadPrompt").text(prompt);

      $(window).on("gamepadconnected", function() {
        hasGP = true;
        $("#gamepadPrompt").html("Gamepad connected!");
        console.log("connection event");
        repGP = window.setInterval(reportOnGamepad,100);
      });

      $(window).on("gamepaddisconnected", function() {
        console.log("disconnection event");
        $("#gamepadPrompt").text(prompt);
        window.clearInterval(repGP);
      });

      //setup an interval for Chrome
      var checkGP = window.setInterval(function() {
        console.log('checkGP');
        if(navigator.getGamepads()[0]) {
          if(!hasGP) $(window).trigger("gamepadconnected");
          window.clearInterval(checkGP);
        }
      }, 500);
    }

  });
}
