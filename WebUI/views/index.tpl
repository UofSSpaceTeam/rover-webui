<!DOCTYPE html>
<html>
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
    <link rel="stylesheet" href="/static/scripts/bootstrap-3.3.7-dist/css/bootstrap.min.css"></link>
    <script src="/static/scripts/jquery.min.js"></script>
    <script src="/static/scripts/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="/static/scripts/TestScript.js"></script>
    <script src="/static/scripts/msgpack-lite-master/dist/msgpack.min.js"></script>
    <script src="https://rawgit.com/kawanet/msgpack-lite/master/dist/msgpack.min.js"></script>

</head>
<body onload="Test()">

    <div id="gamepadPrompt"></div>
    <div id="gamepadDisplay"></div>
    <script>
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
            html+= "Button "+(i+1)+": ";
            if(gp.buttons[i].pressed) html+= " pressed";
            html+= "<br/>";
        }

        for(var i=0;i<gp.axes.length; i+=2) {
            html+= "Stick "+(Math.ceil(i/2)+1)+": "+gp.axes[i]+","+gp.axes[i+1]+"<br/>";
        }

        $("#gamepadDisplay").html(html);
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
        window.setInterval(function(){
          var gp = navigator.getGamepads()[0];
          $.ajax({
            url: "/data/GamePadData",
            method: "POST",
            data: JSON.stringify({"joystick1" : [gp.axes[0], gp.axes[1]]}),
            contentType: "application/json"
          });
          $.ajax({
            url: "/data/GamePadData",
            method: "POST",
            data: JSON.stringify({"joystick2" : [gp.axes[3], gp.axes[4]]}),
            contentType: "application/json"
          });

        }, 500)

    });
    </script>
    </body>
</html>
