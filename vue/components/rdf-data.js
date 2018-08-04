var template =`
    <div class="container">
        <h3> RDF </h3>
        <line-chart class="plot" :data="vals" :refresh="refreshRate" :xtitle="xlabel" :ytitle="dataSource" />
    </div>
`;

Vue.component('rdf-data', {
    //extends: Line,
    template: template,
    props: ['dataSource','xlabel'],
    data: function() {
        return {
            vals: new Array(),
            dataBuffer: 25,
            bufferFull: false,
            // In seconds
            refreshRate: 0.2,
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
                return response.data;

            }).catch(function() {
                console.log("Failed to get value");
            });
        },

        shiftBuffer: function(value){
            this.vals.shift();
            this.vals.push([Date.now(),value]);
        },
        updateChart: function(){
            var val = this.dataGen();
            this.bufferFull = this.vals.length >= this.dataBuffer;
            if (!this.bufferFull) this.vals.push([Date.now(),val]) ;
            else{
                this.shiftBuffer(val);
            }
        },
        dataGen:function(){
            // Random num 0-99
            return Math.floor(Math.random() * 100);


        }

    },
    mounted(){
        setInterval(this.updateChart, this.refreshRate*1000);
    }
});
