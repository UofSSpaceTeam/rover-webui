//global variables 
//the rovers current location marker
var roverMarker 
//allows manually added makes to be drawn onto the map
var drawnItems

var Points = [];


//sends all marker coordinates to rover 
function sendMarkers(list) {
	var i;
	$.ajax({
		url: "/testSend",
		type: "POST",
		data: JSON.stringify({"nodes" : list}),
		contentType: "application/json"
	});	
}


/*	
Prints out all maker coordinates in the system
*/
function printMarkers(list) {
	var i;
	var marker = ""; 
	for (i = 0; i < list.length; i++) {
		//printing for testing purposes
		//change to send elements
		marker += "<p>" + list[i] + "</p>";				
	}
	//outputs list
	//document.getElementById("marker_array").innerHTML = marker;	
}

/*
updates the rovers current position 
*/
function updateRoverPos() {
	
	//get Coordinates from input boxes
	//var latlng = L.latLng(document.getElementById("YPos").value, document.getElementById("XPos").value);
	//get coordinates from rover input
	var latlng = L.latLng(document.getElementById("YPos").value, document.getElementById("XPos").value);
	//set new rover position 
	roverMarker.setLatLng(latlng);
	//updates the rovers position 
	roverMarker.update();
}

function addMarker(){
	var marker = L.marker([document.getElementById("YPos").value, document.getElementById("XPos").value])
	drawnItems.addLayer(marker);
}
	
function main(){
		
		
	//var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	//osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	
	var map = L.map('map').setView([38.3730379, -110.7140391], 15);
	mapLink = 
		'<a href="http://www.esri.com/">Esri</a>';
	wholink = 
		'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
	L.tileLayer(
		'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
		attribution: '&copy; '+mapLink+', '+wholink,
		maxZoom: 18,
		}).addTo(map);

	//osm = L.tileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib}),
	//TODO:change initial position 
	//map = new L.Map('map', {layers: [osm], center: new L.LatLng(52.13100, -106.63400), zoom: 15 });

	drawnItems = new L.FeatureGroup();
	map.addLayer(drawnItems);
	
	var marker_list = [];
	
	//makes roverIcon
	//TODO: the initial position should be changed
	roverMarker = L.marker([52.13, -106.63]).addTo(map);
	roverMarker.bindPopup("I'm the rover!!");
	//set input boxes to initial value
	document.getElementById("XPos").value = -110.7140391;
	document.getElementById("YPos").value = 38.3730379;
	
	var drawControl = new L.Control.Draw({
		position: 'topright',
		draw: {
			polyline: false,
			polygon: false,
			circle: false,
			rectangle: false, 
			marker: {}
		},
		edit: {
			featureGroup: drawnItems,
			edit: false
		}
	});
	map.addControl(drawControl);

	map.on('draw:created', function (e) {
	
		var type = e.layerType,
			layer = e.layer;
		if (type === 'marker') {
			var num = marker_list.length + 1; 
			var latlng = layer.getLatLng();
			message = num.toString().concat(",",latlng.lat, ",",latlng.lng ); 
			layer.bindPopup(message);
			marker_list.push(message); 
			sendMarkers(marker_list);
			//printMarkers(marker_list); 

		}
		drawnItems.addLayer(layer);
	});

	map.on('draw:edited', function (e) {
		var layers = e.layers;
		var countOfEditedLayers = 0;
		layers.eachLayer(function(layer) {
			countOfEditedLayers++;
		});
		console.log("Edited " + countOfEditedLayers + " layers");
	});

}
