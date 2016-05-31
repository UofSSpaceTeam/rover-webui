//global variables 
var roverMarker; 
var mapGroup;
var selectedMarker;
var greenIcon;
var redIcon; 
var blueIcon;

var markers;

function updateRoverPos() {
	var gpsCords = JSON.parse(localStorage.getItem("gpsCords",gpsCords));
	if(gpsCords != null) {
		if (gpsCords[0] != null && gpsCords[1] != null) {
			var latlng = L.latLng(gpsCords[0], gpsCords[1]);
			roverMarker.setLatLng(latlng);
			roverMarker.update();
		}
	}
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

function dropMarker(name){

	var gpsCords = localStorage.getItem("gpsCords",gpsCords);
	if (gpsCords[0] != null && gpsCords[1] != null) {
		newMarker(name,
				gpsCords[0],
				gpsCords[1]);
				
		saveMarker("Dropped Marker",
			document.getElementById("YPos").value,
			document.getElementById("XPos").value);
	}
} 

function displaySelectedMakerData() {
	if (selectedMarker != null) {
		document.getElementById("SelName").value = selectedMarker.options.title;
		document.getElementById("SelLat").value = selectedMarker.getLatLng().lat;
		document.getElementById("SelLng").value = selectedMarker.getLatLng().lng;
		document.getElementById("SelDist").value = roverMarker.getLatLng().distanceTo(selectedMarker.getLatLng()).toFixed(1);
		document.getElementById("SelBearing").value = getBearingToSelected(roverMarker.getLatLng().lat, roverMarker.getLatLng().lng).toFixed(1);
	}
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

function removeSelected(){
	if(selectedMarker != null){
		index = markers.indexOf(markers.find(x=> x.name === selectedMarker.options.title));
		//jsonObj = markers.find(x=> x.name === selectedMarker.options.title);
		if (index > -1) {
			markers.splice(index, 1);
		}
		
		mapGroup.removeLayer(selectedMarker);
		
		localStorage.setItem("markers",JSON.stringify(markers));
	}
}

//assumes array of json objects
function readMarkers(markerArray){
	for (i = 0; i < markerArray.length; i++){
		newMarker(markerArray[i]["name"],
				markerArray[i]["lat"],
				markerArray[i]["lng"]);	
	}
}

function saveMarker(name, lat, lng) {
	var index = markers.indexOf(markers.find(x=> x.name === name));
	if(index == -1) {
		var markerInfo = { "name": name, "lat": lat, "lng": lng};
		markers.push(markerInfo);
		localStorage.setItem("markers",JSON.stringify(markers));
	}
}

//assumes csv string
function getMultiMarkers(multiMarkers){
	for( var marker of multiMarkers.split("\n")){
			var markerInfo = marker.split(",");
			var index = markers.indexOf(markers.find(x=> x.name === markerInfo[0]));
			if(index == -1) {
				newMarker(markerInfo[0], markerInfo[1],markerInfo[2]);
				saveMarker(markerInfo[0], markerInfo[1],markerInfo[2]);
			}
	}
}

function printMarkers(){
	var str = ""; 
	for (i = 0; i < markers.length; i++){
		str += markers[i]["name"] + "," +
				markers[i]["lat"] + "," +
				markers[i]["lng"] + "\n";	
	}
	
	document.getElementById("markerDisplay").value = str; 
}


function DMSToDD(degree, min, sec) {
	var DD = Number(degree) + Number(min / 60) + Number(sec / 3600) ; 
	document.getElementById("decimalDegree").value = DD.toFixed(6); 
}

function navMap() {

	//default starting area
	//change as needed
	var startLocation = [38.406441, -110.791933];
	
	//online map
	/* var map = L.map('map').setView(startLocation, 15);
	mapLink = 
		'<a href="http://www.esri.com/">Esri</a>';
	wholink = 
		'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
	L.tileLayer(
		'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
		attribution: '&copy; '+mapLink+', '+wholink,
		maxZoom: 18,
		}).addTo(map); */ 
		
	//online map ends here
		
	//offline maps
	var map = L.map('map', {
        maxZoom: 20,
        crs: L.CRS.Simple
    }).setView(startLocation, 18);
    //map.setMaxBounds(new L.LatLngBounds([38,-111], [39,-110]));	
	
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
	
	//offline map ends here
		
	mapGroup = new L.FeatureGroup();
	map.addLayer(mapGroup);	
	
	//icon images 
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
	
	//get markers from local storage
	markers = JSON.parse(localStorage.getItem("markers"));
	if (markers == null) {	
		markers = []
	} 
	
	readMarkers(markers);
	
	//make the rover marker
	roverMarker = L.marker(startLocation, {title: "Rover", icon: redIcon}).addTo(map);

	
  	var updateMap = setInterval(function() {
		updateRoverPos();
		displaySelectedMakerData(); 
    }, 1000); 
}