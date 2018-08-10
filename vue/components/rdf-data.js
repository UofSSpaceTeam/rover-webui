var template =`
    <div class="container">
        <h3> RDF </h3>
        <line-chart class="plot" :data="vals" :refresh="refreshRate" > </line-chart>
        <div id="radar-container">
            <canvas id="radar" width="200" height="200"></canvas>
        </div>
    </div>
`;

Vue.component('rdf-data', {
    template: template,
    // Source 1 is just yagi power,Source 2 is combined power and heading
    props: ['dataSource1','dataSource2'],
    data: function() {
        return {
            vals: new Array(),
            dataBuffer: 25,
            bufferFull: false,
            // In seconds
            refreshRate: 0.01,
            radarChart:null,
            radarData:[],
            serverVal:null,
            yagiPower:null

        }
    },
    methods: {
        getPowerValue: function() {
            // store "this" in a new variable because js
            var self = this;
            axios.get('/req/'+this.dataSource1)
            .then(function(response) {
                console.log(response.data);
                self.yagiPower = response.data;

            }).catch(function() {
                console.log("Failed to get value");
            });
        },
        getRadarValues: function() {
            // store "this" in a new variable because js
            var self = this;
            axios.get('/req/'+this.dataSource2)
            .then(function(response) {
                //console.log(response.data);
                self.radarData = response.data;
            }).catch(function() {
                console.log("Failed to get value");
            });
        },

        shiftBuffer: function(value){
            this.vals.shift();
            this.vals.push([this.getTime(),value]);
        },
        updateChart: function(){
            // var val = this.dataGen();
            
            this.getPowerValue();
            var val = this.yagiPower;
            this.bufferFull = this.vals.length >= this.dataBuffer;
            if (!this.bufferFull) this.vals.push([this.getTime(),val]) ;
            else{
                this.shiftBuffer(val);
            }
        },
        dataGen:function(){
            // Random num 0-99
            return Math.floor(Math.random() * 100);

        },

        getTime:function(){
            var d = new Date();
            var t ="";
            var m = d.getMinutes();
            var s = d.getSeconds();
            var ms = d.getMilliseconds();
            t = t.concat(m,":",s,":",ms);
            return t
        },

        initRadar:function(){
            var ctx = document.getElementById("radar");
            this.radarChart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120', '130', '140',
                        '150', '160', '170', '180', '190', '200', '210', '220', '230', '240',
                        '250', '260', '270', '280', '290', '300', '310', '320', '330', '340',
                        '350'],
                    datasets: [{
                        data: [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,
                        null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,
                        null,null,null,null],
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
            /*
            for(let i = 0; i < 36; i++) {
                this.radarChart.data.datasets[0].data[i]= Math.random() * 100;
            } */
            this.getRadarValues();
            this.radarChart.data.datasets[0].data = this.radarData;
            this.radarChart.update();

        }
    },
    mounted(){
        this.initRadar();
        setInterval(this.updateChart, this.refreshRate*1000);
        setInterval(this.updateRadar,this.refreshRate*1000);

    }
});
