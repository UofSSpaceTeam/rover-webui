function MapMarker(name, lat, lng) {
	this.name = name;
	this.lat = lat; 
	this.lng = lng; 
}

MapMarker.prototype.getDist = function(curLat, curLng) {
	//taken from the navigation coordinate class 
	//mean radius of earth
	var RE = 6371000;
	
	function haversin(theta) {
		return Math.sin(theta/2)*Math.sin(theta/2);
	}
	
	var lat1 = curLat * Math.PI / 180;
	var lng1 = curLng * Math.PI / 180;
	var lat2 = this.lat * Math.PI / 180; 
	var lng2 = this.lng * Math.PI / 180; 
	
	return (2*RE*Math.asin( Math.sqrt( haversin(lat2-lat1) + Math.cos(lat1)*Math.cos(lat2)*haversin(lon2-lon1))));
}

MapMarker.prototype.getBearing = function(curLat, curLng) {
	//taken from the navigation coordinate class
	var lat1 = curLat * Math.PI / 180;
	var lng1 = curLng * Math.PI / 180;
	var lat2 = this.lat * Math.PI / 180; 
	var lng2 = this.lng * Math.PI / 180;
	
	var bearing = (Math.atan2(Math.sin(lon2-lon1)*Math.cos(lat2), Math.cos(lat1)*Math.sin(lat2) -Math.sin(lat1)*Math.cos(lat2)*Math.cos(lon2-lon1)));
	return (bearing % (2*Math.PI)) * 180 / Math.PI; 
}

//TODO: add method to remove corresponding marker from navMap