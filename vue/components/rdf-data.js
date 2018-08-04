var template =`
    <div class="container">
        <h3> RDF </h3>
    </div>

`;

Vue.component('rdf-data', {
    template: template,
    props: [],
    data: function() {
        return {
           data:null
        }
    },
    methods: {
        getValue: function() {
            // Getter to retrieve data from server. Data returned should be a 2d list of x,y pairs
            // store "this" in a new variable because js
            var self = this;
            axios.get('/req/'+this.dataSource)
            .then(function(response) {
                //console.log(response.data);
                var val = response.data;
                self.chartData = val;
            }).catch(function() {
                console.log("Failed to get value");
            });


        },
    },
    mounted(){
        setInterval(this.getValue, 100);
    }
})
