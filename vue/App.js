var template =`
  <div>
    <storage-text resource='TargetReached'></storage-text>
    <data-visualization  :data1=data2></data-visualization>
    <h1>{{ greeting }}</h1>
    <maps></maps>
  </div>
`;
var app = new Vue({
  el: '#app',
  template: template,
  data: {
    greeting: 'Welcome to your Vue.js app!',
    data2: {speed:60,Fuel:100}
  },
  methods: {

  }
})

