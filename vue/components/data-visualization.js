var template =`
<div>
    <h1>Data Visualization</h1>
    <column-chart xtitle="Stats" :data="[[resource1,res1Value],[resource2,res2Value]]" :refresh="10000"></column-chart>
</div>
`;

Vue.component('data-visualization', {
    template: template,
    props: ['resource1','resource2'],
    data: function() {
        return {
            res1Value: 0,
            res2Value: 0
        }
    },
    created: function() {
        this.getRes1Value();
        // setInterval(this.getRes1Value, 10000);
        this.getRes2Value();
        // setInterval(this.getRes2Value, 10000);
    },
    methods: {
        getRes1Value: function() {
            // store "this" in a new variable because js
            var self = this;
            axios.get('/req/'+this.resource1)
            .then(function(response) {
                console.log(response.data);
                self.res1Value = response.data;
            }).catch(function() {
                console.log("Failed to get value");
            });
        },
         getRes2Value: function() {
            // store "this" in a new variable because js
            var self = this;
            axios.get('/req/'+this.resource2)
            .then(function(response) {
                console.log(response.data);
                self.res2Value = response.data;
            }).catch(function() {
                console.log("Failed to get value");
            });
        }
    }
})
