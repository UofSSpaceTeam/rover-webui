var template =`
  <div>
    <storage-text resource='TargetReached'></storage-text>
    <camera-component resource1="camera1" resource2="camera2" resource3="camera3" resource4="camera4"></camera-component>  
    <data-visualization  resource1="SpeedData" resource2="FuelData"></data-visualization>
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
