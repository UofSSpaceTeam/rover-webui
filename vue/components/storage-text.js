var template =`
<div>
    <h3>{{resource}} : {{value}}</h3>
    <input v-model="new_value"></input>
    <button class="btn-primary" v-on:click="getValue">Get value</button>
    <button class="btn-primary" v-on:click="setValue">Set value</button>
</div>
`;

Vue.component('storage-text', {
    template: template,
    props: ['resource'],
    data: function() {
        return {
            value: false,
            new_value: false,
        }
    },
    created: function() {
        this.getValue();
        // setInterval(this.getValue, 100);
    },
    methods: {
        getValue: function() {
            // Getter
            // store "this" in a new variable because js
            var self = this;
            axios.get('/req/'+this.resource)
            .then(function(response) {
                console.log(response.data);
                self.value = response.data;
            }).catch(function() {
                console.log("Failed to get value");
            });
        },
        setValue: function() {
            // Setter sends post request to update data on server
            postdata = {};
            postdata[this.resource] = this.new_value;
            axios.post('/submit/'+this.resource, postdata)
            .then(function(response) {
                console.log("Succesfully changed data");
            }).catch(function() {
                console.log("Failed to set value");
            });
        }
    }
})
