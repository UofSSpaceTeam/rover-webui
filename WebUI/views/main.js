var WSAvcPlayer = require('../vendor');


var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
// Create h264 player
var uri = "ws://" + "10.64.226.16:50001";
var wsavc = new WSAvcPlayer(canvas, "webgl", 1, 35);
wsavc.connect(uri);


//for button callbacks
window.wsavc = wsavc;
