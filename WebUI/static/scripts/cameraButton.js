function cameraButton(x){
	if(x == 1){ 
		$.ajax({
            url: "/req/axes",
            method: "POST",
            data: JSON.stringify({"btnUp" : 1}),
            contentType: "application/json",
            complete: function(results) {
                console.log("Success");
              }

          });

	}
	if(x == 2){ 
		$.ajax({
            url: "/req/axes",
            method: "POST",
            data: JSON.stringify({"btnDown" : 1}),
            contentType: "application/json",
            complete: function(results) {
                console.log("Success");
              }

          });
	}
	if(x==3){ 
		$.ajax({
            url: "/req/axes",
            method: "POST",
            data: JSON.stringify({"btnLeft" : 1}),
            contentType: "application/json",
            complete: function(results) {
                console.log("Success");
              }

          });
	}
	if(x ==4){ 
		$.ajax({
            url: "/req/axes",
            method: "POST",
            data: JSON.stringify({"btnRight" : 1}),
            contentType: "application/json",
            complete: function(results) {
                console.log("Success");
              }

          });


	}
	if(x ==5){ 
		$.ajax({
            url: "/req/axes",
            method: "POST",
            data: JSON.stringify({"btnStop" : 1}),
            contentType: "application/json",
            complete: function(results) {
                console.log("Success");
              }

          });




	}
	if(x==6){ 
		$.ajax({
            url: "/req/axes",
            method: "POST",
            data: JSON.stringify({"btnStart" : 1}),
            contentType: "application/json",
            complete: function(results) {
                console.log("Success");
              }

          });




	}




}