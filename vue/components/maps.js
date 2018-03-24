var template =`
<div>
    <h1>Navigation</h1>
    <div class="row">
        <div class="col-md-9">
            <div id="map" v-on:click="newWayPointClick($event,addOnClick)" class="map" style="height:400px;width:80%;"></div>
        </div>

        <div class="col-md-3">
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
                    {{ layer.name }}
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
        </div>

    </div>
</div>
`;



Vue.component('maps', {
    template: template,
    props: ['resource1','resource2','resource3','resource4'],
    data: function() {
        return{
        map: null,
        markerLat:1.0,
        addOnClick: true,
        markerLong:1.0,
        roverLat: 1.0,
        roverLong: 1.0,
        tileLayer: 1.0,
        layers: [{
            id: 0,
            name: 'Rover',
            active: false,
            features: [{
                id: 0,
                name: 'Current Rover Position',
                type: 'marker',
                coords: [52.133350, -106.628288],
                }]
            },
                {
                id: 1,
                name: 'Waypoints',
                active: false,
                features: [{
                    type: 'circleMarker',
                    coords: [52.133350, -106.628288]
                    }]
                }
            ]
        }
    },

    created: function() {

    },

    methods: {
        initMap: function() {
            this.map = L.map('map').setView([52.146973, -106.647034], 12);
           // L.control.mousePosition().addTo(this.map);
            this.tileLayer = L.tileLayer(
              'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
               {
             maxZoom: 18,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
            }
            );
            this.tileLayer.addTo(this.map);
        },

        initLayers: function() {
                this.layers.forEach((layer) => {
                    const markerFeatures = layer.features.filter(feature => feature.type === 'marker');
                    markerFeatures.forEach((feature) => {
                        feature.leafletObject = L.marker(feature.coords).bindPopup(feature.name);
                        });


                        const markerFeatures2 = layer.features.filter(feature => feature.type === 'circleMarker');
                    markerFeatures2.forEach((feature) => {
                        feature.leafletObject = L.circleMarker(feature.coords);
                        });

                });
        },

        layerChanged: function(layerId, active) {
            const layer = this.layers.find(layer => layer.id === layerId);
            layer.features.forEach((feature) => {
                if (active) {
                    if (layerId === 0) {
                        this.updateRoverCoord(this.roverLat,this.roverLong);
                        setInterval(this.updateRoverCoord, 100, this.roverLat, this.roverLong);
                    } else {
                        feature.leafletObject.addTo(this.map);
                    }
                } else {
                    feature.leafletObject.removeFrom(this.map);
                }
            });
        },

        updateRoverCoord: function(roverLat,roverLong){
            this.getRoverLat();
            this.getRoverLong();
            //Current Position layer
            layer = this.layers.find(layer => layer.id === 0);
            // Create new JS Object
            newRover = {
                id: 0,
                name: 'Current Rover Position',
                type: 'marker',
                coords: [this.roverLat, this.roverLong],
            };
            if (layer.active) {
                // Remove current rover marker from map
                layer.features[0].leafletObject.removeFrom(this.map);
                // Push JS Object and then convert to leaflet object
                layer.features.push(newRover);
                layer.features[0].leafletObject = L.marker(newRover.coords);
                layer.features[0].leafletObject.addTo(this.map);
            }
        },

        newWayPoint: function(markerLat,markerLong){
        //Waypoints layer
            layer = this.layers.find(layer => layer.id === 1);
            // Create new JS Object
            newMarker = {
                        type: 'circleMarker',
                        coords: [markerLat, markerLong],
                    };
            // Push JS Object and then convert to leaflet object
            layer.features.push(newMarker);
            layer.features[layer.features.length-1].leafletObject = L.circleMarker(newMarker.coords);

            if(layer.active){
                layer.features[layer.features.length-1].leafletObject.addTo(this.map);
            }
            this.setMarkerLat();
            this.setMarkerLong();
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

        setMarkerLat: function() {
                postdata = {};
                postdata[this.resource3] = this.markerLat;
                axios.post('/submit/'+this.resource3, postdata)
                .then(function(response) {
                    console.log("Succesfully changed data");
                }).catch(function() {
                    console.log("Failed to set value");
                });
        },

        setMarkerLong: function() {
                postdata = {};
                postdata[this.resource4] = this.markerLong;
                axios.post('/submit/'+this.resource4, postdata)
                .then(function(response) {
                    console.log("Succesfully changed data");
                }).catch(function() {
                    console.log("Failed to set value");
                });
        },

        newWayPointClick: function(event,checked){
            var latlng = this.map.mouseEventToLatLng(event);
            var markerLat = latlng.lat
            var markerLong = latlng.lng

            if(checked){
                layer = this.layers.find(layer => layer.id === 1);
                // Create new JS Object
                newMarker = {
                            type: 'circleMarker',
                            coords: [markerLat, markerLong],
                        };
                // Push JS Object and then convert to leaflet object
                layer.features.push(newMarker);
                layer.features[layer.features.length-1].leafletObject = L.circleMarker(newMarker.coords);

                if(layer.active){
                    layer.features[layer.features.length-1].leafletObject.addTo(this.map);
                }
                this.setMarkerLat();
                this.setMarkerLong();
           }
        }

},
    mounted() {
        this.initMap();
        this.initLayers();
        // this.getRoverLat();
        // setInterval(this.getRoverLat, 1000);
        // this.getRoverLong();
        // setInterval(this.getRoverLong, 1000);
        // this.updateRoverCoord(this.roverLat,this.roverLong);
        // setInterval(this.updateRoverCoord, 1000, this.roverLat, this.roverLong);
    },
})
