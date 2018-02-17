var template =`
<div>
    <h1>Navigation</h1>
     <div id="map"></div>
</div>
`;



Vue.component('maps', {
    template: template,

    ready: function()
          {
            this.map = L.map('map').setView([51.505, -0.09], 13);
          },
})