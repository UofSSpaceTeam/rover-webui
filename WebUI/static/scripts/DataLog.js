datalogArray = [];
function DataLog(){
		setInterval(function() {
		console.log()
		$.ajax({
		url: "/req/TestData",
		method: "POST",
		data: JSON.stringify({"DatalogArray" : datalogArray}),
		contentType: "application/json",
		complete: function(results) {
			console.log("Something happened!" + JSON.stringify(results));
		}
	});
	}, 1000);

}

function InitializeValues(){
	




}