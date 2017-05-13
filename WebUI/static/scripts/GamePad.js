function GamePadMasterFunction(){
  alert("running");
  var hasGP = false;
  var repGP;
  var gpCheck = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]

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
            $.ajax({
              url: "/data/GamePadData",
              method: "POST",
              data: JSON.stringify({"button" : [gp.buttons[i].pressed]}),
              contentType: "application/json"
            });
          }
        }
        else{
          if(gpCheck[i]==true){
            gpCheck[i] = false
            $.ajax({
              url: "/data/GamePadData",
              method: "POST",
              data: JSON.stringify({"button": [gp.buttons[i].pressed]}),
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
          var buttonName = ["buttonA", "buttonB", "buttonX", "buttonY"]
          $.extend(gpdata, {"joystick1"   : [gp.axes[0],gp.axes[1]]});
          $.extend(gpdata, {"joystick2"   : [gp.axes[3],gp.axes[4]]});
          $.extend(gpdata, {"triggerL"    : gp.axes[2]});
          $.extend(gpdata, {"triggerR"    : gp.axes[5]});
          $.extend(gpdata, {"bottonA"     : gp.buttons[0].pressed});
          $.extend(gpdata, {"bottonB"     : gp.buttons[1].pressed});
          $.extend(gpdata, {"bottonX"     : gp.buttons[2].pressed});
          $.extend(gpdata, {"bottonY"     : gp.buttons[3].pressed});
          //$.extend(gpdata, {buttonName[0] : gp.buttons[0].pressed}); Why this no work?
          $.ajax({
            url: "/data/GamePadData",
            method: "POST",
            data: JSON.stringify({"gamepad1" : gpdata}),
            contentType: "application/json"
          });
        }, 150)
}
