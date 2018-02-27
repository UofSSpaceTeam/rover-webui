var template =`
  <div>
    <storage-text resource='TargetReached'></storage-text>
    <storage-text resource='StartNavigation'></storage-text>
    <maps resource1="roverLat" resource2="roverLong" resource3="markerLat" resource4="markerLong"></maps>
    <data-visualization  resource1="WheelSpeed" resource2="BatteryCurrent"></data-visualization>
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
