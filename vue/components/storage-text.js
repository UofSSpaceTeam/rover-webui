var template =`
<div>
    <h3>{{resource}} : {{value}}</h3>
    <button v-on:click="loadValue">Refresh</button>
</div>
`;

Vue.component('storage-text', {
    template: template,
    props: ['resource'],
    data: function() {
        return {
            value: false
        }
    },
    created: function() {
        this.loadValue();
    },
    methods: {
        loadValue: function() {
            // store "this" in a new variable because js
            var self = this;
            axios.get('/req/'+this.resource).then(function(response) {
                console.log(response.data);
                self.value = response.data;
            }).catch(function() {
                console.log("Failed to load value");
            });
        },
        toggle: function() {
            this.value = !this.value;
        }
    }
})
