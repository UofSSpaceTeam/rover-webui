var template =`
  <div>
    <storage-text resource='TargetReached'></storage-text>
    <data-visualization  resource1="SpeedData" resource2="FuelData"></data-visualization>
    <maps resource1="roverLat" resource2="roverLong" resource3="markerLat" resource4="markerLong" resource5="roverHeading"></maps>
    <gauge dataSource="Speed" minValue = "0" maxValue = "10" units="m/s"></gauge>
    <gauge dataSource="Acceleration" minValue = "50" maxValue = "100" units="m/s/s"></gauge>
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
