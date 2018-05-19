var template =`
    <div class="container">
    <h3> {{dataSource}} </h3>
        <line-chart class="plot" :data="chartData" :refresh="1" :xtitle="xlabel" :ytitle="dataSource" />
    </div>

`;

Vue.component('line-plot', {
    template: template,
    props: ['dataSource','xlabel'],
    data: function() {
        return {
           chartData:null
        }
    },
    methods: {

        getValue: function() {


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


            /* Testing with date stuff
                var d = new Date();
                var time = d.getTime();
                var time = d.toString();
                var val = Math.floor((Math.random() * 10) + 1);
                this.chartData.push([time,val]);
                */
        },

    },

    mounted(){
        setInterval(this.getValue, 3000);
    }
})