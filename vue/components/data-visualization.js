var template =`
<div class="vis">

    <!--
    <div class="chart">
    <h1>Data Visualization</h1>
    <column-chart xtitle="Stats" :data="[[resource1,res1Value],[resource2,res2Value]]" :refresh="10000"></column-chart>
    </div>

    -->



    <div class="container">
        <div class="row">
            <div class="col-sm">
            <h3> Heading </h3>
                <canvas id="heading"></canvas>
                <button class="btn-primary" v-on:click="updateHeading()"> Heading </button>
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

Vue.component('data-visualization', {
    template: template,
    props: ['resource1','resource2'],
    data: function() {
        return {
            res1Value: 0,
            res2Value: 0,
            headingGauge: null,
            speedGauge: null,
            currentGauge: null
        }
    },
    created: function() {
        this.getRes1Value();
        // setInterval(this.getRes1Value, 10000);
        this.getRes2Value();
        // setInterval(this.getRes2Value, 10000);
    },
    methods: {

        initGauges : function(){

            this.headingGauge = new RadialGauge({
                renderTo: 'heading', width: 300, height: 300, minValue: 0, maxValue: 360,
                majorTicks: ["N","NE","E","SE","S","SW","W","NW","N"], minorTicks: 22, ticksAngle: 360, startAngle: 180,
                strokeTicks: false, highlights: false, colorPlate: "#33a", colorMajorTicks: "#f5f5f5",
                colorMinorTicks: "#ddd", colorNumbers: "#ccc", colorNeedle: "rgba(240, 128, 128, 1)",
                colorNeedleEnd: "rgba(255, 160, 122, .9)", valueBox: true, valueTextShadow: false, colorCircleInner: "#fff",
                colorNeedleCircleOuter: "#ccc", needleCircleSize: 15, needleCircleOuter: false, animationRule: "linear",
                needleType: "line", needleStart: 75, needleEnd: 99, needleWidth: 3, borders: true,
                borderInnerWidth: 0, borderMiddleWidth: 0, borderOuterWidth: 10, colorBorderOuter: "#ccc",
                colorBorderOuterEnd: "#ccc", colorNeedleShadowDown: "#222", borderShadowWidth: 0, animationTarget: "plate",
                title: "Heading", fontTitleSize: 19, colorTitle: "#f5f5f5", animationDuration: 500
            }).draw();


            this.currentGauge = new RadialGauge({
                renderTo: 'currentGauge', width: 300,height: 300, minValue: 0,maxValue: 5, value:4.5,
                majorTicks: ["0","1","2","3","4","5"], units: "Amps"
            }).draw();


            this.speedGauge = new RadialGauge({
                renderTo: 'speedGauge',
                width: 300, height: 300, units: "Km/h", minValue: 0, maxValue: 40,
                majorTicks: ["0","5","10","15","20","25","30","35","40"], minorTicks: 2, strokeTicks: true,
                highlights: [
                    {
                        "from": 30,
                        "to": 40,
                        "color": "rgba(200, 50, 50, .75)"
                    }
                ],
                colorPlate: "#fff", borderShadowWidth: 0, borders: false, needleType: "arrow", needleWidth: 2,
                needleCircleSize: 7, needleCircleOuter: true, needleCircleInner: false, animationDuration: 1500,
                animationRule: "linear"
            }).draw();
        },

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
                //console.log(response.data);
                self.res2Value = response.data;
            }).catch(function() {
                console.log("Failed to get value");
            });
        },

    updateHeading : function(){
    this.headingGauge.value = (this.headingGauge.value + 10).toString();
    }

   },

    mounted(){
        this.initGauges();
    }


    })
