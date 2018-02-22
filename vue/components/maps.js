var template =`
<div>
    <h1>Navigation</h1>
    <div class="row">
        <div class="col-md-9">
            <div id="map" class="map" style="height:400px;width:80%;"></div>
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
                   type="checkbox"
                   v-model="layer.active"
                   @change="layerChanged(layer.id, layer.active)"
                />
                    {{ layer.name }}
                </label>
            </div>
            <h5> Add a new way point </h5>
            <p>Latitude</p>
            <input v-model="markerLat" placeholder="Latitude">
            <p>Longitude</p>
            <input v-model="markerLong" placeholder="Longitude">
            <button v-on:click="newWayPoint(markerLat,markerLong)"> Enter New Waypoint </button>
        </div>

    </div>
</div>
`;



Vue.component('maps', {
    template: template,
    props: ['resource1','resource2'],
    data: function() {
        return{
        map: null,
        markerLat:null,
        markerLong:null,
        roverLat: null,
        roverLong: null,
        tileLayer: null,
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
                    type: 'marker',
                    coords: [52.133350, -106.628288]
                    }]
                }
            ]
        }
    },

    created: function() {
        this.getRoverLat();
        // setInterval(this.getRoverLat, 10000);
        this.getRoverLong();
        // setInterval(this.getRoverLong, 10000);
        this.updateRoverCoord(this.roverLat,this.roverLong);
        // setInterval(this.updateRoverCoord, 10000, this.roverLat, this.roverLong);
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
        //Waypoints layer
            layer = this.layers.find(layer => layer.id === 0);
            // Create new JS Object
            newLoc = {
                id: 0,
                name: 'Current Rover Position',
                type: 'marker',
                coords: [roverLat, roverLong],
            };
            // Push JS Object and then convert to leaflet object
            layer.features.pop();
            layer.features.push(newLoc);
            layer.features[layer.features.length-1].leafletObject = L.marker(newLoc.coords);
            layer.features[layer.features.length-1].leafletObject.addTo(this.map);
        },

        newWayPoint: function(markerLat,markerLong){
        //Waypoints layer
            layer = this.layers.find(layer => layer.id === 1);
            // Create new JS Object
            newMarker = {
                        type: 'marker',
                        coords: [markerLat, markerLong],
                    };
            // Push JS Object and then convert to leaflet object
            layer.features.push(newMarker);
            layer.features[layer.features.length-1].leafletObject = L.marker(newMarker.coords);
            layer.features[layer.features.length-1].leafletObject.addTo(this.map);
            this.setMarkerLat();
            this.setMarkerLong();
        },

        getRoverLat: function() {
                // store "this" in a new variable because js
                var self = this;
                axios.get('/req/'+this.resource1)
                .then(function(response) {
                    console.log(response.data);
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
                    console.log(response.data);
                    self.roverLong = response.data;
                }).catch(function() {
                    console.log("Failed to get value");
                });
        },

        setMarkerLat: function() {
                postdata = {};
                postdata['markerLat'] = this.markerLat;
                axios.post('/submit/markerLat', postdata)
                .then(function(response) {
                    console.log("Succesfully changed data");
                }).catch(function() {
                    console.log("Failed to set value");
                });
        },

        setMarkerLong: function() {
                postdata = {};
                postdata['markerLong'] = this.markerLong;
                axios.post('/submit/markerLong', postdata)
                .then(function(response) {
                    console.log("Succesfully changed data");
                }).catch(function() {
                    console.log("Failed to set value");
                });
        }

},
    mounted() {
        this.initMap();
        this.initLayers();
    },

})
