function GamePadMasterFunction(){
  alert("running");
  var hasGP = false;
  var repGP;
  var gpCheck = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
  var buttonName = ["buttonA", "buttonB", "buttonX", "buttonY"];

  function canGame() {
      return "getGamepads" in navigator;
  }

  function reportOnGamepad() {
      var gp = navigator.getGamepads()[0];
      var html = "";
          html += "id: "+gp.id+"<br/>";

      for(var i=0;i<gp.buttons.length;i++) {
          //html+= "Button "+(i+1)+": ";
          html+= (getButtonName(i+1))+": ";
          if(gp.buttons[i].pressed) html+= " pressed";
          html+= "<br/>";
      }

      for(var i=0;i<gp.axes.length; i+=2) {
          html+= "Stick "+(Math.ceil(i/2)+1)+": "+gp.axes[i]+","+gp.axes[i+1]+"<br/>";
      }

      $("#gamepadDisplay").html(html);
      //OnlyAlertsOncePressed
      for(var i=0;i<gp.buttons.length;i++){
        if(gp.buttons[i].pressed == true){
          if(gpCheck[i]==false){
            gpCheck[i] = true
            var msg = {};
            msg[buttonName[i]+"_down" ] = true;
            $.ajax({
              url: "/data/GamePadData",
              method: "POST",
              data: JSON.stringify(msg),
              contentType: "application/json"
            });
          }
        }
        else{
          if(gpCheck[i]==true){
            gpCheck[i] = false
            var msg = {};
            msg[buttonName[i]+"_up" ] = false;
            $.ajax({
              url: "/data/GamePadData",
              method: "POST",
              data: JSON.stringify(msg),
              contentType: "application/json"
            });
          }
        }
      }
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


        window.setInterval(function(){
          var gp = navigator.getGamepads()[0];
          var gpdata = {};
          gpdata["joystick1"] = [gp.axes[0],gp.axes[1]];
          gpdata["joystick2"] = [gp.axes[3],gp.axes[2]];
          gpdata["triggerL" ] = gp.axes[5];
          gpdata["triggerR" ] = gp.axes[4];
          for (i=0; i<4; i++) {
            gpdata[buttonName[i]] = gp.buttons[i].pressed; //Why this no work?

          }
          $.ajax({
            url: "/data/GamePadData",
            method: "POST",
            data: JSON.stringify({"gamepad1" : gpdata}),
            contentType: "application/json"
          });
        }, 150)
}
