var template =`
<div>
    <h3> Channel : {{channel}}</h3>
    <h3> Reading : {{value}} </h3>
    <h3> Direction : {{direction}} </h3>
</div>
`;

Vue.component('load-cell', {
    template: template,
    props: ['resource'],
    data: function() {
        return {
            channel: null,
            value:null,
            direction: null
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
                self.value = response.data[1];
                self.channel = response.data[0];
                self.checkDir();
            }).catch(function() {
                console.log("Failed to get value");
            });
        },

        checkDir: function(){
            if (this.channel == 0) this.direction = "Right";
            else{
                this.direction = "Left";
            }
        }
    }
})
