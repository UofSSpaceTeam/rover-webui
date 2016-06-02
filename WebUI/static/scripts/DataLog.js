datalogMoisture = JSON.parse(localStorage.getItem("dataPointsMoisture"));
datalogWheel = JSON.parse(localStorage.getItem("dataPointsWheel"));
datalogTemperature = JSON.parse(localStorage.getItem("dataPointsTemperature"));
datalogArrayY = JSON.parse(localStorage.getItem("dataPointsY"));
gpsCords = [];
function DataLog(){
	setInterval(function() {
		var message = "datalogTemperature pulls values from here.";
		//Gets Data From Rover
				$.ajax({
							url: "/req/TestData",
							method: "POST",
							data: ({"datalogTemperature" : message}),
							contentType: "application/json",
							complete: function(results) {
								var obj = JSON.parse(results.responseText)

								var type = JSON.stringify(obj).substring(3,2);
								DataSave(type,obj);

								DrawGraph();


				}
			});

			$.ajax({
						url: "/req/gpsCords",
						method: "POST",
						data: ({"gpsCords" : gpsCords}),
						contentType: "application/json",
						complete: function(results) {
							//alert(results.responseText);
							var obj = JSON.parse(results.responseText);
							gpsCords = obj.latlng;
							localStorage.setItem("gpsCords",JSON.stringify(gpsCords));


			}
		});

			//Sends Data to Rover

}, 1000);

}

function ResetData(){
	$('#mycanvas').remove(); // this is my <canvas> element
	$('#graph-div').append('<canvas id="mycanvas" width="800" height="400" style="width: 800px; height: 400px;"><canvas>');
	localStorage.clear();
	datalogTemperature = [];
	datalogArrayY = [];
	gpsCords = [];
	datalogPointCounter = -1;



}

function ResetRoverSoftware(){
	alert(datatype);



}

function ReloadGraph(){
	$('#mycanvas').remove(); // this is my <canvas> element
	$('#graph-div').append('<canvas id="mycanvas" width="800" height="400" style="width: 800px; height: 400px;"><canvas>');
	arrayStartPoint = datalogPointCounter;

}

function DataSave(datatype, obj){
	var arrayStartPoint = Number(localStorage.getItem("arrayStartPointLocal")) + 1;
	var datalogPointCounter = Number(localStorage.getItem("datalogPointCounter")) + 1;
	localStorage.setItem("datalogPointCounter",datalogPointCounter);
	localStorage.setItem("arrayStartPointLocal",arrayStartPoint);


	if(datatype == "T"){
		datalogTemperature[arrayStartPoint] = obj.TestData;
		datalogArrayY[arrayStartPoint] = datalogPointCounter;
		localStorage.setItem("dataPointsTemperature",JSON.stringify(datalogTemperature))
		localStorage.setItem("dataPointsY",JSON.stringify(datalogArrayY))



	}
	else if(datatype == "M"){
		datalogMoisture[arrayStartPoint] = obj.TestData;
		datalogArrayY[arrayStartPoint] = datalogPointCounter;
		localStorage.setItem("dataPointsMoisture",JSON.stringify(datalogMoisture))
		localStorage.setItem("dataPointsY",JSON.stringify(datalogArrayY))



	}
	else if(datatype == "W"){
		datalogTemperature[arrayStartPoint] = obj.TestData;
		datalogArrayY[arrayStartPoint] = datalogPointCounter;
		localStorage.setItem("dataPointsWheel",JSON.stringify(datalogWheel))
		localStorage.setItem("dataPointsY",JSON.stringify(datalogArrayY))



	}

}
