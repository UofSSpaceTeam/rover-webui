var template =`
  <div>
    <storage-text resource='StartScience'></storage-text>
    <storage-text resource='ContinueScience'></storage-text>

    <storage-text resource='Autopilot'></storage-text>
    <boolean-switch resource="driving"> </boolean-switch>
    <dash-cluster  resource1="Speed" resource2="current" resource3="roverHeading"></dash-cluster>
    <maps resource1="roverLat" resource2="roverLong" resource3="markerLat" resource4="markerLong" resource5="roverHeading" resource6="sendWaypoints"></maps>

    <gauge dataSource="Speed" minValue = "0" maxValue = "10" units="m/s"></gauge>
    <gauge dataSource="Acceleration" minValue = "50" maxValue = "100" units="m/s/s"></gauge>
    <line-plot dataSource="spectrometer_data" xlabel="time"></line-plot>
     
    <rdf-data dataSource= "spectrometer_data" xlabel="time"></rdf-data>

  </div>
`;

var app = new Vue({
  el: '#app',
  template: template,
  data: {
    greeting: 'Welcome to your Vue.js app!'
  },
  methods: {

  },
})
