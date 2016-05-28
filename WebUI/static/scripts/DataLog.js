datalogArray = [];
gpsCords = [];
function DataLog(){
	setInterval(function() {
		var x = Number(localStorage.getItem("Num")) + 1;
		localStorage.setItem("Num",x);


		//Gets Data From Rover
		console.log(x)
				$.ajax({
							url: "/req/TestData",
							method: "POST",
							data: JSON.stringify({"DatalogArray" : datalogArray}),
							contentType: "application/json",
							complete: function(results) {

								var Key = JSON.stringify(results).substr(35, 8);
								var Value = JSON.stringify(results).substr(49,4);

								localStorage.setItem("dataPoints",datalogArray)
								localStorage.setItem("gpsCords",gpsCords);


				}
			});

			//Sends Data to Rover
			$.ajax({
						url: "/data/buttons",
						method: "POST",
						data: JSON.stringify({"DatalogArray" : datalogArray}),
						contentType: "application/json",
						complete: function(results) {



			}
		});
}, 1000);

}

function ResetData(){
	localStorage.setItem("Num",1);
	localStorage.setItem("deadzoneLocalStorage",0);

}

function ResetRoverSoftware(){



}
