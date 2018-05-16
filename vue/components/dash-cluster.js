var template =`
<div class="vis">

    <div class="container">
        <div class="row">
            <div class="col-sm">
            <h3> Heading </h3>
                <canvas id="heading"></canvas>
            </div>
            <div class="col-sm">
            <h3> Current </h3>
            <canvas id="currentGauge"></canvas>
            </div>
            <div class="col-sm">
            <h3> Speed </h3>
            <canvas id="speedGauge"></canvas>
            </div>
        </div>
    </div>
</div>


`;

Vue.component('dash-cluster', {
    template: template,
    props: ['resource1','resource2','resource3'],
    data: function() {
        return {
            speedVal: 0,
            currentVal: 0,
            headingVal: 0,
            headingGauge: null,
            speedGauge: null,
            currentGauge: null
        }
    },
    created: function() {

    },
    methods: {
        initGauges : function(){
            this.headingGauge = new RadialGauge({
                renderTo: 'heading', width: 300, height: 300, minValue: 0, maxValue: 360,
                majorTicks: ["N","NE","E","SE","S","SW","W","NW","N"], minorTicks: 22, ticksAngle: 360, startAngle: 180,
                strokeTicks: false, highlights: false, colorPlate: "#33a", colorMajorTicks: "#f5f5f5",
                colorMinorTicks: "#ddd", colorNumbers: "#ccc", colorNeedle: "rgba(240, 128, 128, 1)",
                colorNeedleEnd: "rgba(255, 160, 122, .9)", valueBox: true, valueTextShadow: false, colorCircleInner: "#fff",
                colorNeedleCircleOuter: "#ccc", needleCircleSize: 15, needleCircleOuter: false, animation:false,
                needleType: "line", needleStart: 75, needleEnd: 99, needleWidth: 3, borders: true,
                borderInnerWidth: 0, borderMiddleWidth: 0, borderOuterWidth: 10, colorBorderOuter: "#ccc",
                colorBorderOuterEnd: "#ccc", colorNeedleShadowDown: "#222", borderShadowWidth: 0,
                title: "Heading", fontTitleSize: 19, colorTitle: "#f5f5f5"
            }).draw();

            this.currentGauge = new RadialGauge({
                renderTo: 'currentGauge', width: 300,height: 300, minValue: 0,maxValue: 5, value:4.5,
                majorTicks: ["0","1","2","3","4","5"], units: "Amps", animation:false
            }).draw();

            this.speedGauge = new RadialGauge({
                renderTo: 'speedGauge',
                width: 300, height: 300, units: "Km/h", minValue: 0, maxValue: 20,
                majorTicks: ["0","2","4","6","8","10","12","14","16","18","20"], minorTicks: 2, strokeTicks: true,
                highlights: [
                    {
                        "from": 16,
                        "to": 20,
                        "color": "rgba(200, 50, 50, .75)"
                    }
                ],
                colorPlate: "#fff", borderShadowWidth: 0, borders: false, needleType: "arrow", needleWidth: 2,
                needleCircleSize: 7, needleCircleOuter: true, needleCircleInner: false, animation:false
            }).draw();
        },

        getRes1Value: function() {
            // store "this" in a new variable because js
            var self = this;
            axios.get('/req/'+this.resource1)
            .then(function(response) {
                //console.log(response.data);
                self.speedVal = response.data;
                self.speedGauge.value = self.speedVal;
            }).catch(function() {
                console.log("Failed to get value");
            });
        },
         getRes2Value: function() {
            // store "this" in a new variable because js
            var self = this;
            axios.get('/req/'+this.resource2)
            .then(function(response) {
                //console.log(response.data);
                self.currentVal = response.data;
                self.currentGauge.value = self.currentVal;
            }).catch(function() {
                console.log("Failed to get value");
            });
        },

        getRes3Value: function() {
            // store "this" in a new variable because js
            var self = this;
            axios.get('/req/'+this.resource3)
            .then(function(response) {
                //console.log(response.data);
                self.headingVal = response.data;
                self.headingGauge.value = self.headingVal;
            }).catch(function() {
                console.log("Failed to get value");
            });
        },


   },

    mounted(){
        this.initGauges();

         this.getRes1Value();
        setInterval(this.getRes1Value, 100);
        this.getRes2Value();
        setInterval(this.getRes2Value, 100);
        this.getRes3Value();
        setInterval(this.getRes3Value, 100);
    }


    })
