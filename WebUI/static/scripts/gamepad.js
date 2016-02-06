function GamePad(){
  //Added by Liam//
  var buttonInfo ='{"button": "0"}'
  var obj = JSON.parse(buttonInfo);
  var hasGP = false;
  var repGP;

  function canGame() {
    return "getGamepads" in navigator;
  }

  function reportOnGamepad() {
    var gp = navigator.getGamepads()[0];
    var html = "";
      html += "id: "+gp.id+"<br/>";


    for(var i=0;i<gp.buttons.length;i++) {
      gp.buttons[1].value = document.getElementById('GamepadValueChange').value;
      html+= "Button "+(i+1)+": ";
      if(gp.buttons[i].pressed) html+= " pressed";
        html+= "<br/>";
        console.log(gp.buttons[1].value);
    }




    for(var i=0;i<gp.axes.length; i+=2) {
      html+= "Stick "+(Math.ceil(i/2)+1)+": "+gp.axes[i]+","+gp.axes[i+1]+"<br/>";
    }

    $("#gamepadDisplay").html(html);
	
	$.ajax({
		url: "/gamepadAxes",
		type: "POST",
		data: JSON.stringify({"axes" : gp.axes}),
		contentType: "application/json"
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

