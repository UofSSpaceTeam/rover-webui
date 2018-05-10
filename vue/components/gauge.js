var template =`
    <div class="container">
    <h3> {{dataSource}} </h3>
        <canvas v-bind:id='dataSource'></canvas>
    </div>

`;

Vue.component('gauge', {
    template: template,
    props: ['dataSource','minValue','maxValue','units'],
    data: function() {
        return {
            value: 1,
            gaugeObj: null,
            ticks: []
        }
    },
    methods: {

        initGauge: function(){
            var i = parseInt(this.minValue);
            var inc = (parseInt(this.maxValue)-parseInt(this.minValue))/5;

            while(i<=parseInt(this.maxValue)){
               this.ticks.push(i.toString());
                i = i + inc;
            }

            this.gaugeObj = new RadialGauge({
             renderTo: this.dataSource, width: 300, height: 300, minValue: this.minValue.toString(), maxValue: this.maxValue.toString(), value: this.value,
             units: this.units,  majorTicks: this.ticks, minorTicks: 2, animation:false
            }).draw();

        },


        getValue: function() {
            // store "this" in a new variable because js
            var self = this;
            axios.get('/req/'+this.dataSource)
            .then(function(response) {
                //console.log(response.data);
                self.value = response.data;
            }).catch(function() {
                console.log("Failed to get value");
            });

            this.gaugeObj.value = this.value.toString();
        },

    },

    mounted(){
        this.initGauge();
        setInterval(this.getValue, 100);
    }
})