var template =`
    <div id="app">
        <img src="https://vuejs.org/images/logo.png" alt="Vue logo">
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

