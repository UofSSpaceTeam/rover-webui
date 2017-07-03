
var app = angular.module('statsApp', []);
	app.controller('statsCtrl', function($scope, $interval) {
	
	  $scope.statsData = [];
	  
	  
	  $scope.updateStatsData = function(){
	  	var data = "Rover Information: <br/><ul>"; // 1/3 UNCOMMENT FOR LIST INSTEAD OF TABLE
	  	//var data = 'Rover Information: <br/><table style="width:100%">' // 1/3 UNCOMMENT FOR TABLE INSTEAD OF LIST
	  	for(var i = 0; i < $scope.statsData.length; i++){
	    	data += $scope.statsData[i];
	  	}
	  
	  	data += "</ul>"; // 2/3 LIST INSTEAD OF TABLE
	  	//data += '</table>'; // 2/3 TABLE INSTEAD OF LIST
	    $("#statsData").html(data);
	  };
	  
	  //$scope.updateStatsData();
	
	  // Interval that updates the stats data
	  $interval( function(){ 
	    $.ajax({
            url: "/data/StatsData",
            method: "POST",
            //data: JSON.stringify({"Stats" : $scope.statsData[0]}),
            contentType: "application/json",
            success: function(data){
            	$scope.statsData = [];
            	
            	// go through each key:value pair in the json file
            	$.each(data, function(key, val){
            		// put each pair in the statsData as a list item
            		$scope.statsData.push('<li>' + key + ': ' + val + '</li>'); // 3/3 LIST INSTEAD OF TABLE
            		//$scope.statsData.push('<tr><td style="padding:15px">' + key + '</td><td style="padding:15px">' + val + '</td></tr>'); // 3/3 TABLE INSTEAD OF LIST
            	});
            
            	// update the data
            	$scope.updateStatsData();
            }
          });
          
	  }, 100); // time in milliseconds
	});
	
  