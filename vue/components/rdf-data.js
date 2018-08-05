var template =`
    <div class="container">
        <h3> RDF </h3>
        <line-chart class="plot" :data="vals" :refresh="refreshRate" :xtitle="xlabel" :ytitle="dataSource" > </line-chart>
        <div id="radar-container">
            <canvas id="radar" width="200" height="200"></canvas>
        </div>
    </div>
`;

Vue.component('rdf-data', {
    template: template,
    props: ['dataSource','xlabel'],
    data: function() {
        return {
            vals: new Array(),
            dataBuffer: 25,
            bufferFull: false,
            // In seconds
            refreshRate: 0.2,
            radarChart:null
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
        },

        initRadar:function(){
            var ctx = document.getElementById("radar");
            this.myRadarChart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120', '130', '140',
                        '150', '160', '170', '180', '190', '200', '210', '220', '230', '240',
                        '250', '260', '270', '280', '290', '300', '310', '320', '330', '340',
                        '350'],
                    datasets: [{
                        data: [null,null,null,null,-44,-38,-39,-35,-35,-30,-20,-15,-12,-10,-5,0,0,0,5,10,5,0,0,-5,-5,-5,
                        -10,-11,-12,-20,-25,-55,-55,-55,-55,-55],
                        fillColor: 'rgb(0, 0, 0)',
                    }],
                    fill:false,
                    backgroundColor: [
                    'rgb(0, 0, 0)' ],

                },
                options: {
                    title: {
                        display: true,
                        text: "Signal Intensity"
                    },
                    legend: {
                        display: false,
                    }
                }
            });
        },
        updateRadar:function(){


        }

    },
    mounted(){
        this.initRadar();
        setInterval(this.updateChart, this.refreshRate*1000);

    }
});
