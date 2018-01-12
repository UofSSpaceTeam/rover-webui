var template =`
  <div>
    <storage-text resource='TargetReached'></storage-text>
    <h1>{{ greeting }}</h1>
  </div>
`;
var app = new Vue({
  el: '#app',
  template: template,
  data: {
    greeting: 'Welcome to your Vue.js app!',
  },
  methods: {

  }
})

