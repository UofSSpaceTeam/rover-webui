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
            <p>Longitude</p>
            <input v-model="long" placeholder="Longitude">
            <p>Latitude</p>
            <input v-model="lat" placeholder="Latitude">
            <button v-on:click="newWayPoint(lat,long)"> Enter New Waypoint </button>
        </div>

    </div>
</div>
`;



Vue.component('maps', {
    template: template,

    data: function() {
        return{
        map: null,
        lat:null,
        long:null,
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
            },],
            },
            {
                id: 1,
                name: 'Waypoints',
                active: false,
                features: [],
            },



  ],
        }
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

    newWayPoint: function(lat,long){
    //Waypoints layer
        layer = this.layers.find(layer => layer.id === 1);
        layer.features.push(
            {
              type: 'marker',
              coords: [lat, long],
            },

        )
    }

},
    mounted() {
        this.initMap();
        this.initLayers();
    },

})