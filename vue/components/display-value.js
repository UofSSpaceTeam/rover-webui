var template =`
<div>
    <h3>{{resource}} : {{value}}</h3>
</div>
`;

Vue.component('display-value', {
    template: template,
    props: ['resource'],
    data: function() {
        return {
            value: null
        }
    },
    created: function() {
        this.getValue();
        setInterval(this.getValue, 100);
    },
    methods: {
        getValue: function() {
            // Getter
            // store "this" in a new variable because js
            var self = this;
            axios.get('/req/'+this.resource)
            .then(function(response) {
                self.value = response.data;
            }).catch(function() {
                console.log("Failed to get value");
            });
        },
    }
})
