/*
//sends all marker coordinates to rover 
function sendMarkers(array) {
	var i;
	var marker = ""; 
	//var array = [1,2,3];
	for (i = 0; i < array.length; i++) {
		//send marker coordinate
	}
}
*/
function main(){
		var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
		osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		osm = L.tileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib}),
		map = new L.Map('map', {layers: [osm], center: new L.LatLng(52.13100, -106.63400), zoom: 15 });

	var drawnItems = new L.FeatureGroup();
	map.addLayer(drawnItems);
	
	var num = 0;
	var marker_array = [];
	
	// Set the title to show on the polygon button
	L.drawLocal.draw.toolbar.buttons.polygon = 'Draw a sexy polygon!';

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
		}
	});
	map.addControl(drawControl);

	map.on('draw:created', function (e) {
		var type = e.layerType,
			layer = e.layer;

		if (type === 'marker') {
			num++; 
			var latlng = layer.getLatLng();
				message = num.toString().concat(",",latlng.lat, ",",latlng.lng ); 
			layer.bindPopup(message);
			marker_array.push(message); 
			//sendMarkers(marker_array);
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
	
