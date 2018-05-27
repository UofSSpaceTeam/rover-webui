var template =`
<div class="row boolRow" >
<div class="col-md-3">
    <h3>{{resource}} : {{value}}</h3>
    </div>
    <div class="col-md-3">
    <input
                   type="checkbox"
                   class="boolToggle"
                   v-model="active"
                   @change="setValue(active)"
                />
    </div>



</div>
`;

Vue.component('boolean-switch', {
    template: template,
    props: ['resource'],
    data: function() {
        return {
            value: false,
            new_value: false,
            active:false
        }
    },
    created: function() {
        this.getValue();
        setInterval(this.getValue, 100);
    },
    methods: {
        getValue: function() {
            // store "this" in a new variable because js
            var self = this;
            axios.get('/req/'+this.resource)
            .then(function(response) {
                console.log(response.data);
                self.value = response.data;
                self.active = response.data;
            }).catch(function() {
                console.log("Failed to get value");
            });
        },
        setValue: function(newVal) {
            postdata = {};
            postdata[this.resource] = newVal;
            axios.post('/submit/'+this.resource, postdata)
            .then(function(response) {
                console.log("Succesfully changed data");
            }).catch(function() {
                console.log("Failed to set value");
            });
        }
    }
})
