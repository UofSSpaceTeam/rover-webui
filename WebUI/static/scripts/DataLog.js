datalogArray = [];
function DataLog(){
	setInterval(function() {
		var x = Number(localStorage.getItem("Num")) + 1;
		localStorage.setItem("Num",x);
		console.log(x)
		$.ajax({
		url: "/req/TestData",
		method: "POST",
		data: JSON.stringify({"DatalogArray" : datalogArray}),
		contentType: "application/json",
		complete: function(results) {
			var Key = JSON.stringify(results).substr(35, 8);
			var Value = JSON.stringify(results).substr(49,4);
			datalogArray[0] = Key;
			datalogArray[1] = Value;
			document.getElementById("dropDown1").text  = datalogArray[0];
		}
	});
	}, 1000);

}

function ResetData(){
	localStorage.setItem("Num",1);

}




$(document).ready(function(){
              $("#dropDown1").click(function(){
								
								});
        });
