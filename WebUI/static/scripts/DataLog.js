datalogArrayX = [];
datalogArrayY = [];
gpsCords = [];
function DataLog(){
	setInterval(function() {

		//Gets Data From Rover
				$.ajax({
							url: "/req/TestData",
							method: "POST",
							data: ({"DatalogArrayX" : datalogArrayX}),
							contentType: "application/json",
							complete: function(results) {
								var obj = JSON.parse(results.responseText)
								var datalogPointCounter = Number(localStorage.getItem("datalogPointCounter")) + 1;

								localStorage.setItem("datalogPointCounter",datalogPointCounter);
								datalogArrayX[datalogPointCounter] = obj.TestData;
								datalogArrayY[datalogPointCounter] = datalogPointCounter;
								localStorage.setItem("dataPointsX",JSON.stringify(datalogArrayX))
								localStorage.setItem("dataPointsY",JSON.stringify(datalogArrayY))
								DrawGraph();


				}
			});

			$.ajax({
						url: "/req/gpsCords",
						method: "POST",
						data: ({"gpsCords" : gpsCords}),
						contentType: "application/json",
						complete: function(results) {

							localStorage.setItem("gpsCords",gpsCords);


			}
		});

			//Sends Data to Rover
			$.ajax({
						url: "/data/buttons",
						method: "POST",
						data: JSON.stringify({"DatalogArrayX" : datalogArrayX}),
						contentType: "application/json",
						complete: function(results) {



			}
		});
}, 1000);

}

function ResetData(){
	localStorage.clear();
	datalogArrayX = [];
	datalogArrayY = [];
	gpsCords = [];
	datalogPointCounter = 0;


}

function ResetRoverSoftware(){



}
