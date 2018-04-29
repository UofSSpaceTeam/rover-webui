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
            value: 0,
            gaugeObj: null
        }
    },
    created: function() {
        this.getValue();
        // setInterval(this.getValue, 100);
    },
    methods: {

        initGauge: function(){
            this.gaugeObj = new RadialGauge({
             renderTo: this.dataSource, width: 300,height: 300, minValue: this.minValue,maxValue: this.maxValue,
             units: this.units
            }).draw();
        },


        getValue: function() {
            // store "this" in a new variable because js
            var self = this;
            axios.get('/req/'+this.dataSource)
            .then(function(response) {
                console.log(response.data);
                self.value = response.data;
            }).catch(function() {
                console.log("Failed to get value");
            });
        },

    },

    mounted(){
        this.initGauge();

    }
})