datalogArray = [];
localStorage.setItem("x",5);
function DataLog(){

	setInterval(function() {
		var x = Number(localStorage.getItem("x")) + 1;
		console.log(x)
		$.ajax({
		url: "/req/TestData",
		method: "POST",
		data: JSON.stringify({"DatalogArray" : datalogArray}),
		contentType: "application/json",
		complete: function(results) {
			console.log("Something happened!" + JSON.stringify(results));
		}
	});
		localStorage.x += localStorage.x
	}, 1000);





}