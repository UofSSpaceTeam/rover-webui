// returns the actual string name of the button depending on the button id: example 'A' or "Right Trigger"
function getButtonName(id){
 	switch (id) {
  		case 1:
  				return "A";
  		case 2:
  				return "B";
  		case 3:
  				return "X";
  		case 4:
  				return "Y";
  		case 5:
  				return "Left Bumper";
  		case 6:
  				return "Right Bumper";
  		case 7:
  				return "Left Trigger";
  		case 8:
  				return "Right Trigger";
  		case 9:
  				return "Back";
  		case 10:
  				return "Start";
  		case 11:
  				return "Left Stick Down";
  		case 12:
  				return "Right Stick Down";
  		case 13:
  				return "D-Pad Up";
  		case 14:
  				return "D-Pad Down";
  		case 15:
  				return "D-Pad Left";
  		case 16:
  				return "D-Pad Right";
  		case 17:
  				return "Xbox Button";
  		default:
  				return "Button" + id;
  	}
}
  