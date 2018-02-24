var template =`
  <div>
    <storage-text resource='TargetReached'></storage-text>
    <data-visualization  resource1="SpeedData" resource2="FuelData"></data-visualization>
    <h1>{{ greeting }}</h1>
    <maps resource1="roverLat" resource2="roverLong" resource3="markerLat" resource4="markerLong"></maps>
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
