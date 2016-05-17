//global variables 
var roverMarker; 
var mapGroup;
var mapMarkers;

function updateRoverPos() {
	//TODO: make sure it is getting values from correct place
	var latlng = L.latLng(document.getElementById("YPos").value, document.getElementById("XPos").value);
	roverMarker.setLatLng(latlng);
	roverMarker.update();
}

function addMarker(){
	var marker = L.marker([document.getElementById("YPos").value, document.getElementById("XPos").value]);
	mapGroup.addLayer(marker);
	marker.on('click', function(e) {
		alert(e.latlng);
	});
}

function navMap() {

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
		
	var mapMarkers = {};
	
	mapGroup = new L.FeatureGroup();
	map.addLayer(mapGroup);
		
	//TODO: the initial position should be changed to current position
	roverMarker = L.marker([38.3730379, -110.7140391], {title: "Rover"}).addTo(map);
	
	roverMarker.on('click', function(e) {
		alert(e.latlng);
	});
}