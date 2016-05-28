//global variables 
var roverMarker; 
var mapGroup;
var selectedMarker;
var greenIcon;
var redIcon; 
var blueIcon;

var markers;

function updateRoverPos() {
	//TODO: make sure it is getting values from correct place
	var latlng = L.latLng(document.getElementById("YPos").value, document.getElementById("XPos").value);
	roverMarker.setLatLng(latlng);
	roverMarker.update();
}

function newMarker(name, lat, lng) {

	var marker = L.marker([lat,lng], 
						{title: name,
						icon: blueIcon});
		
	marker.on('click', function(e) {
		if (selectedMarker != null) {
			selectedMarker.setIcon(blueIcon);
			selectedMarker.update();
		}
		selectedMarker = e.target; 
		selectedMarker.setIcon(greenIcon);
		displaySelectedMakerData(); 
	}); 
			
	mapGroup.addLayer(marker);
} 


function addMarker(){
	newMarker(document.getElementById("NewName").value,
			document.getElementById("NewLat").value,
			document.getElementById("NewLng").value); 
			
	saveMarker(document.getElementById("NewName").value,
			document.getElementById("NewLat").value,
			document.getElementById("NewLng").value);
}

function dropMarker(){
	newMarker("Dropped Marker",
			document.getElementById("YPos").value,
			document.getElementById("XPos").value);
			
	saveMarker("Dropped Marker",
			document.getElementById("YPos").value,
			document.getElementById("XPos").value);
}

function displaySelectedMakerData() {
	document.getElementById("SelName").value = selectedMarker.options.title;
	document.getElementById("SelLat").value = selectedMarker.getLatLng().lat;
	document.getElementById("SelLng").value = selectedMarker.getLatLng().lng;
	document.getElementById("SelDist").value = roverMarker.getLatLng().distanceTo(selectedMarker.getLatLng()).toFixed(1)
	document.getElementById("SelBearing").value = getBearingToSelected(roverMarker.getLatLng().lat, roverMarker.getLatLng().lng).toFixed(1)
}

function getBearingToSelected(Lat, Lng) {
	//taken from the navigation coordinate class
	var lat1 = Lat * Math.PI / 180;
	var lng1 = Lng * Math.PI / 180;
	var lat2 = selectedMarker.getLatLng().lat * Math.PI / 180; 
	var lng2 = selectedMarker.getLatLng().lng * Math.PI / 180;
	
	var bearing = (Math.atan2(Math.sin(lng2-lng1)*Math.cos(lat2), Math.cos(lat1)*Math.sin(lat2) -Math.sin(lat1)*Math.cos(lat2)*Math.cos(lng2-lng1)));
	return (bearing % (2*Math.PI)) * 180 / Math.PI; 
}

function readMarkers(markerArray){
	for (i = 0; i < markerArray.length; i++){
		newMarker(markerArray[i]["name"],
				markerArray[i]["lat"],
				markerArray[i]["lng"]);	
	}
}

function saveMarker(name, lat, lng) {
	var markerInfo = { "name": name, "lat": lat, "lng": lng};
	markers.push(markerInfo);
	
	localStorage.setItem("markers",JSON.stringify(markers));
}

function navMap() {

	//online map
	/* var map = L.map('map').setView([38.3730379, -110.7140391], 15);
	mapLink = 
		'<a href="http://www.esri.com/">Esri</a>';
	wholink = 
		'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
	L.tileLayer(
		'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
		attribution: '&copy; '+mapLink+', '+wholink,
		maxZoom: 18,
		}).addTo(map); */
		
	//offline maps
	var map = L.map('map', {
        maxZoom: 20,
        minZoom: 10,
        crs: L.CRS.Simple
    }).setView([38.406441, -110.791933], 18);
    map.setMaxBounds(new L.LatLngBounds([38,-111], [39,-110]));	
	
	//add images to map
	//bounds are [south-east corner],[north-west corner]
	var terrainTraversal = '/static/scripts/maps/terraintraversal.jpg'
    var terrainBounds = [[38.406381,-110.792367], [38.408876,-110.789755]];
    L.imageOverlay(terrainTraversal, terrainBounds).addTo(map);
	
	var science = "/static/scripts/maps/science.jpg"
	var scienceBounds = [[38.400047,-110.792099], [38.402733,-110.787334]];
	L.imageOverlay(science, scienceBounds).addTo(map);
	
	var assistance = "/static/scripts/maps/assistance.jpg"
	var assistanceBounds = [[38.417664,-110.788840], [38.421371,-110.781349]];
	L.imageOverlay(assistance, assistanceBounds).addTo(map);
	
	var hotel = "/static/scripts/maps/hotel.jpg"
	var hotelBounds = [[38.370145,-110.705247], [38.375459,-110.698541]];
	L.imageOverlay(hotel, hotelBounds).addTo(map);
		
	mapGroup = new L.FeatureGroup();
	map.addLayer(mapGroup);
		
	//localStorage.setItem("mapGroup",JSON.stringify(mapGroup));
	
	
	greenIcon = L.icon({
		iconUrl: "/static/scripts/images/marker-icon-green.png",
		iconSize:     [25, 41],
        iconAnchor:   [12.5, 41]
	});
	
	redIcon = L.icon({
		iconUrl: "/static/scripts/images/marker-icon-red.png",
		iconSize:     [25, 41],
        iconAnchor:   [12.5, 41]
	});
	
	blueIcon = L.icon({
		iconUrl: "/static/scripts/images/marker-icon-blue.png",
		iconSize:     [25, 41],
        iconAnchor:   [12.5, 41]
	});	
	
	markers = JSON.parse(localStorage.getItem("markers"));
	if (markers == null) {	
		markers = []
		saveMarker("test1", 38.4065, -110.7920);
		saveMarker("test2", 38.4066, -110.7921);
		saveMarker("test3", 38.4067, -110.7922);
	} 
	
	readMarkers(markers);
	
	//TODO: the initial position should be changed to current position
	roverMarker = L.marker([38.406441, -110.791933], {title: "Rover", icon: redIcon}).addTo(map);
	
	
 /* 	var updateMap = setInterval(function() {
		updateRoverPos();
		displaySelectedMakerData(); 
      }, 1000); */
}