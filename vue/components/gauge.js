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
        // Function to initialize the gauge

            //Math to find tick markings for the gauge
            var i = parseInt(this.minValue);
            var inc = (parseInt(this.maxValue)-parseInt(this.minValue))/5;
            while(i<=parseInt(this.maxValue)){
               this.ticks.push(i.toString());
                i = i + inc;
            }

            // Create gauge based on props
            this.gaugeObj = new RadialGauge({
             renderTo: this.dataSource, width: 300, height: 300, minValue: this.minValue.toString(), maxValue: this.maxValue.toString(), value: this.value,
             units: this.units,  majorTicks: this.ticks, minorTicks: 2, animation:false
            }).draw();

        },

        getValue: function() {
            // Getter function for the gauge
            // store "this" in a new variable because js
            var self = this;
            axios.get('/req/'+this.dataSource)
            .then(function(response) {
                //console.log(response.data);
                self.value = response.data;
            }).catch(function() {
                console.log("Failed to get value");
            });
            // Set gauge value to the retrieved value
            this.gaugeObj.value = this.value.toString();
        },
    },
    mounted(){
    // Initialize gauge and set interval to update data every 100ms
        this.initGauge();
        setInterval(this.getValue, 100);
    }
})