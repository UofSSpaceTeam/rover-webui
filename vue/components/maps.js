var template =`
<div>
    <h1>Navigation</h1>
    <div class="row">
        <div class="col-md-7">
            <div id="map" v-on:click="newWayPointClick($event,addOnClick)" class="map" style="height:400px;"></div>
        </div>

        <div class="col-md-5">
            <div
                class="form-check"
                v-for="layer in layers"
                :key="layer.id"
                >
                <label class="form-check-label">
                <input
                   class="form-check-input"
                   id="toggle"
                   type="checkbox"
                   v-model="layer.active"
                   @change="layerChanged(layer.id, layer.active)"
                />
                    {{ layer.name }}
                </label>

                 <input
                   class="form-check-input"
                   id="toggle"
                   type="checkbox"
                   v-model="layer.active"
                   @change="layerChanged(layer.id, layer.active)"
                />

                </label>

            </div>
             <div
                class="click-check">
                <label class="form-check-label">
            <input
                   type="checkbox"
                   v-model="addOnClick"
                />
                Add Waypoint On Click
                </label>
            </div>

            <h5 id="addNew"> Add a new way point </h5>
            <p>Latitude</p>
            <input v-model="markerLat" placeholder="Latitude">
            <p>Longitude</p>
            <input v-model="markerLong" placeholder="Longitude">
            <button class="btn-primary" v-on:click="newWayPoint(markerLat,markerLong)"> Enter New Waypoint </button>

            <div id="add-rover-way">
                <button class="btn-primary" v-on:click="currentRoverWaypoint()" > Add Current Rover Position As Waypoint </button>
            </div>
        <div id= "waypointsOrganization" class="drag">
        <h2> Waypoints Draggable</h2>
        <draggable  @end="updateWayPoint" class="dragArea">

        <div
            class="waypointsOrganize"
            v-for="wayPoint in layers[1].features"
            >

         <p>Waypoint {{wayPoint.id}}</p>

         <button class="btn-primary" v-on:click="deleteWaypoint(wayPoint.id)" > Delete </button>
         <p> Lat. {{wayPoint.displayCoords[0]}} | Long. {{wayPoint.displayCoords[1]}}</p>
         </div>

         </draggable>

        </div>

        </div>




    </div>
</div>
`;

Vue.component('maps', {
    template: template,
    props: ['resource1','resource2','resource3','resource4','resource5','resource6'],
    data: function() {
        return{
        map: null,
        markerLat:1.0,
        addOnClick: false,
        icon:null,
        markerLong:1.0,
        roverLat: 1.0,
        roverLong: 1.0,
        roverHeading: 0,
        tileLayer: 1.0,
        wayPointCoords: [],
        layers: [{
            id: 0,
            name: 'Rover',
            active: true,
            features: [{
                id: 0,
                name: 'Current Rover Position',
                type: 'marker',
                coords: [38.406460, -110.791900],

                }]
            },

                {
                id: 1,
                name: 'Waypoints',
                active: true,
                features: [
                /*{
                    type: 'circleMarker',
                    coords: [38.406460, -110.791900],
                    displayCoords:[38.40646000, -110.79190000],
                    id: 0
                    }
                   */ ]
                }

            ]
        }
    },

// '/lib/tiles3/{z}/{x}/{y}.png'
    methods: {
        initMap: function() {
            this.map = L.map('map').setView([38.374105, -110.738415], 12);
            this.tileLayer = L.tileLayer(
            // Choices for tiles; Change max Zoom and string reference under comments
            // Online road maps from open steet maps : https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png
            // offline Zoomed in tiles (not a large area, only over MDRS), maxzoom = 17 : /lib/tiles/closeUp/{z}/{x}/{y}.png
            // offline Wide area tiles with little zoom ,max zoom = 15 : /lib/tiles/wideArea/{z}/{x}/{y}.jpg

              //'/lib/tiles/closeUp/{z}/{x}/{y}.png', // Change this line for different tile set
              '/lib/tiles/closeUp/{z}/{x}/{y}.png',
              //'/lib/tiles/wideArea/{z}/{x}/{y}.jpg',
               {
             maxZoom: 17,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
            }
            );
            this.tileLayer.addTo(this.map);
            this.icon = new L.Icon.Default();
            this.icon.options.shadowSize = [0,0];
        },

        initLayers: function() {
            this.layers.forEach((layer) => {
                const markerFeatures = layer.features.filter(feature => feature.type === 'marker');
                markerFeatures.forEach((feature) => {
                    feature.leafletObject = L.marker(feature.coords,{rotationAngle:this.roverHeading,rotationOrigin:"center", icon: this.icon}).bindPopup(feature.name);
                    feature.leafletObject.addTo(this.map);
                });
                const markerFeatures2 = layer.features.filter(feature => feature.type === 'circleMarker');
                markerFeatures2.forEach((feature) => {
                    feature.leafletObject = L.circleMarker(feature.coords).bindPopup("Waypoint "+String(feature.id));
                });

            });
        },
        layerChanged: function(layerId, active) {
            const layer = this.layers.find(layer => layer.id === layerId);
            layer.features.forEach((feature) => {
                if (active) {
                    feature.leafletObject.addTo(this.map);
                } else {
                    feature.leafletObject.removeFrom(this.map);
                }
            });
        },
        updateRoverCoord: function(roverLat,roverLong){
            this.getRoverLat();
            this.getRoverLong();
            this.getRoverHeading();
            //Current Position layer
            var layer = this.layers.find(layer => layer.id === 0);
            // Create new JS Object
            var newRover = {
                id: 0,
                name: 'Current Rover Position',
                type: 'marker',
                coords: [this.roverLat, this.roverLong],
            };
                // Remove current rover marker from map
                layer.features[0].leafletObject.removeFrom(this.map);
                layer.features.pop();
                // Push JS Object and then convert to leaflet object
                layer.features.push(newRover);
                layer.features[0].leafletObject = L.marker(newRover.coords,{rotationAngle:this.roverHeading,rotationOrigin:"center",icon:this.icon});
                if(layer.active){
                    layer.features[0].leafletObject.addTo(this.map);
                }
        },

        newWayPoint: function(markerLat,markerLong){

            markerLat = parseFloat(markerLat);
            markerLong = parseFloat(markerLong);

            if (isNaN(markerLong) || isNaN(markerLat)) {
                alert("Please enter integers")
            }

            else{
                var layer = this.layers.find(layer => layer.id === 1);
                // Create new JS Object
                var newMarker = {
                            type: 'circleMarker',
                            coords: [markerLat, markerLong],
                            displayCoords: [markerLat.toFixed(8), markerLong.toFixed(8)],
                            id: 0
                        };
                // Push JS Object and then convert to leaflet object

                if(layer.features.length !=0){
                    newMarker.id = layer.features[layer.features.length-1].id + 1;
                }
                layer.features.push(newMarker);
                this.wayPointCoords.push(newMarker.coords);
                layer.features[layer.features.length-1].leafletObject = L.circleMarker(newMarker.coords).bindPopup("Waypoint "+String(newMarker.id));

                if(layer.active){
                    layer.features[layer.features.length-1].leafletObject.addTo(this.map);
                }
                //this.setMarkerLat();
                //this.setMarkerLong();
                this.sendWaypoints();
            }
        },

        getRoverLat: function() {
            // store "this" in a new variable because js
            var self = this;
            axios.get('/req/'+this.resource1)
            .then(function(response) {
                // console.log(response.data);
                self.roverLat = response.data;
            }).catch(function() {
                console.log("Failed to get value");
            });
        },

        getRoverLong: function() {
            // store "this" in a new variable because js
            var self = this;
            axios.get('/req/'+this.resource2)
            .then(function(response) {
                // console.log(response.data);
                self.roverLong = response.data;
            }).catch(function() {
                console.log("Failed to get value");
            });
        },

        getRoverHeading: function() {
            // store "this" in a new variable because js
            var self = this;
            axios.get('/req/'+this.resource5)
            .then(function(response) {
                // console.log(response.data);
                self.roverHeading = response.data;
            }).catch(function() {
                console.log("Failed to get value");
            });
        },

        setMarkerLat: function() {
            var postdata = {};
            postdata[this.resource3] = this.markerLat;
            axios.post('/submit/'+this.resource3, postdata)
            .then(function(response) {
                console.log("Succesfully changed data");
            }).catch(function() {
                console.log("Failed to set value");
            });
        },

        setMarkerLong: function() {
            var postdata = {};
            postdata[this.resource4] = this.markerLong;
            axios.post('/submit/'+this.resource4, postdata)
            .then(function(response) {
                console.log("Succesfully changed data");
            }).catch(function() {
                console.log("Failed to set value");
            });
        },

        sendWaypoints: function() {
            var layer = this.layers.find(layer => layer.id === 1);
            var postdata = {};
            postdata[this.resource6] = this.wayPointCoords;
            axios.post('/submit/'+this.resource6, postdata)
            .then(function(response) {
                console.log("Successfully changed data");
            }).catch(error => {
               console.log("Failed to set data");
               console.log(error);
                });
        },

        newWayPointClick: function(event,checked){
            var latlng = this.map.mouseEventToLatLng(event);
            var markerLat = latlng.lat;
            var markerLong = latlng.lng;

            if(checked){
                var layer = this.layers.find(layer => layer.id === 1);
                // Create new JS Object
                var newMarker = {
                            type: 'circleMarker',
                            coords: [markerLat, markerLong],
                            displayCoords: [markerLat.toFixed(8), markerLong.toFixed(8)],
                            id: 0
                        };
                if(layer.features.length !=0){
                newMarker.id = layer.features[layer.features.length-1].id + 1;
                }
                // Push JS Object and then convert to leaflet object
                layer.features.push(newMarker);
                this.wayPointCoords.push(newMarker.coords);
                layer.features[layer.features.length-1].leafletObject = L.circleMarker(newMarker.coords).bindPopup("Waypoint "+String(newMarker.id));
                if(layer.active){
                    layer.features[layer.features.length-1].leafletObject.addTo(this.map);
                }
                //this.setMarkerLat();
                //this.setMarkerLong();
                this.sendWaypoints();
           }
        },

        deleteWaypoint : function(id){
            var layer = this.layers.find(layer => layer.id === 1);
            layer.features[id].leafletObject.removeFrom(this.map);
            layer.features.splice(id,1);
            this.wayPointCoords.splice(id,1);
            for(i=id; i <layer.features.length; i++){
                   layer.features[i].id -= 1;
                   layer.features[i].leafletObject.bindPopup("Waypoint "+String(layer.features[i].id));
            }

            this.sendWaypoints();

        },
        updateWayPoint : function(evt){
            var layer = this.layers.find(layer => layer.id === 1);
            var oldInd = evt.oldIndex;
            var newInd = evt.newIndex;
            if (oldInd > newInd){
                var temp1 = layer.features.slice(0,newInd);
                var temp2 = [layer.features[oldInd]];
                var temp3 = layer.features.slice(newInd,oldInd);
                var temp4 = layer.features.slice(oldInd+1);
                var newWaypoints = temp1.concat(temp2,temp3,temp4);
                layer.features = newWaypoints;

                // Update coords array as well
                temp1 = this.wayPointCoords.slice(0,newInd);
                temp2 = [this.wayPointCoords[oldInd]];
                temp3 = this.wayPointCoords.slice(newInd,oldInd);
                temp4 = this.wayPointCoords.slice(oldInd+1);
                var newWaypointCoords = temp1.concat(temp2,temp3,temp4);
                this.wayPointCoords = newWaypointCoords;

            }

            else if (oldInd < newInd){
                var temp1 = layer.features.slice(0,oldInd);
                var temp2 = layer.features.slice(oldInd+1,newInd+1);
                var temp3 = [layer.features[oldInd]];
                var temp4 = layer.features.slice(newInd+1);
                var newWaypoints = temp1.concat(temp2,temp3,temp4);
                layer.features = newWaypoints;

                //Update coords array as well
                temp1 = this.wayPointCoords.slice(0,oldInd);
                temp2 = this.wayPointCoords.slice(oldInd+1,newInd+1);
                temp3 = [this.wayPointCoords[oldInd]];
                temp4 = this.wayPointCoords.slice(newInd+1);
                var newWaypointCoords = temp1.concat(temp2,temp3,temp4);
                this.wayPointCoords = newWaypointCoords;
            }

            for(i=0; i <layer.features.length; i++){
                   layer.features[i].id = i;
                   layer.features[i].leafletObject.bindPopup("Waypoint "+String(layer.features[i].id));
            }

            this.sendWaypoints();
        },

        currentRoverWaypoint: function(){
            var markerLat = this.roverLat;
            var markerLong = this.roverLong;
            var layer = this.layers.find(layer => layer.id === 1);
            // Create new JS Object
            var newMarker = {
                        type: 'circleMarker',
                        coords: [markerLat, markerLong],
                        displayCoords: [markerLat.toFixed(8), markerLong.toFixed(8)],
                        id: 0
                    };
            if(layer.features.length !=0){
            newMarker.id = layer.features[layer.features.length-1].id + 1;
            }
            // Push JS Object and then convert to leaflet object
            layer.features.push(newMarker);
            this.wayPointCoords.push(newMarker.coords);
            layer.features[layer.features.length-1].leafletObject = L.circleMarker(newMarker.coords).bindPopup("Waypoint "+String(newMarker.id));
            if(layer.active){
                layer.features[layer.features.length-1].leafletObject.addTo(this.map);
            }
            this.sendWaypoints();

        }
},
    mounted() {
        this.initMap();
        this.initLayers();
        setInterval(this.updateRoverCoord, 100, this.roverLat, this.roverLong);
        // this.getRoverLat();
        // setInterval(this.getRoverLat, 1000);
        // this.getRoverLong();
        // setInterval(this.getRoverLong, 1000);
        // this.updateRoverCoord(this.roverLat,this.roverLong);
        // setInterval(this.updateRoverCoord, 1000, this.roverLat, this.roverLong);
    },
})
