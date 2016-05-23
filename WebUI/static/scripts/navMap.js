//global variables 
var roverMarker; 
var mapGroup;
var mapMarkers;
var currentMarker; 

function updateRoverPos() {
	//TODO: make sure it is getting values from correct place
	var latlng = L.latLng(document.getElementById("YPos").value, document.getElementById("XPos").value);
	roverMarker.setLatLng(latlng);
	roverMarker.update();
}

function addMarker(){
	alert(document.getElementById("NewName").value);
	var marker = L.marker([document.getElementById("NewLat").value,
		document.getElementById("NewLng").value ], 
		{title: document.getElementById("NewName").value});
		
	mapGroup.addLayer(marker);
	
	marker.on('click', function(e) {
		//change marker Icon
		currentMarker = e.target; 
		//change marker Icon 
		displayMakerData(); 
	}); 
}

function displayMakerData() {
	document.getElementById("CurrName").value = currentMarker.options.title;
	document.getElementById("CurrLat").value = currentMarker.getLatLng().lat;
	document.getElementById("CurrLng").value = currentMarker.getLatLng().lng;
}

function getBearing(curLat, curLng) {
	//taken from the navigation coordinate class
	var lat1 = curLat * Math.PI / 180;
	var lng1 = curLng * Math.PI / 180;
	var lat2 = currentMarker.getLatLng().lat * Math.PI / 180; 
	var lng2 = currentMarker.getLatLng().lng * Math.PI / 180;
	
	var bearing = (Math.atan2(Math.sin(lon2-lon1)*Math.cos(lat2), Math.cos(lat1)*Math.sin(lat2) -Math.sin(lat1)*Math.cos(lat2)*Math.cos(lon2-lon1)));
	return (bearing % (2*Math.PI)) * 180 / Math.PI; 
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
	roverMarker = L.marker([38.3730, -110.7140], {title: "Rover"}).addTo(map);
}