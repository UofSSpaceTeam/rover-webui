var template =`
    <div class="streams">
        <h1>Camera Component</h1>    
        <script>
            window.setInterval("reloadIFrame();", 1);
            function reloadIFrame() {
            document.frames["stream1"].location.reload();
            }
         </script>
         <script>
            window.setInterval("reloadIFrame();", 1);
            function reloadIFrame() {
            document.frames["stream2"].location.reload();
            }
         </script>
         <script>
            window.setInterval("reloadIFrame();", 1);
            function reloadIFrame() {
            document.frames["stream3"].location.reload();
            }
         </script>
         <script>
            window.setInterval("reloadIFrame();", 1);
            function reloadIFrame() {
            document.frames["stream4"].location.reload();
            }
         </script>     
        <div id="Container1" 
            style="padding-bottom:56.25%; position:relative;
            display:block; width: 100%">
            <iframe name="stream1" width="100%" height="100%" 
                allowfullscreen webkitallowfullscreen
                src="res1Value" 
                frameborder="0"
                style="position:absolute; top:0; left: 0">
            </iframe>
        </div>
        <div id="Container2" 
            style="padding-bottom:56.25%; position:relative;
            display:block; width: 100%">
            <iframe name="stream2" width="100%" height="100%" 
                allowfullscreen webkitallowfullscreen
                src="res2Value" 
                frameborder="0"
                style="position:absolute; top:0; left: 0">
            </iframe>
        </div>
        <div id="Container3" 
            style="padding-bottom:56.25%; position:relative;
            display:block; width: 100%">
            <iframe name="stream3" width="100%" height="100%" 
                allowfullscreen webkitallowfullscreen
                src="res3Value" 
                frameborder="0"
                style="position:absolute; top:0; left: 0">
            </iframe>
        </div>
        <div id="Container4" 
            style="padding-bottom:56.25%; position:relative;
            display:block; width: 100%">
            <iframe name="stream4" width="100%" height="100%" 
                allowfullscreen webkitallowfullscreen
                src="res4Value" 
                frameborder="0"
                style="position:absolute; top:0; left: 0">
            </iframe>
        </div>
    </div>
`;

Vue.component('camera-component', {
    template: template,
    props: ['resource1','resource2','resource3','resource4'],
    data: function() {
        return {
            res1Value: "http://192.168.0.15:8888/",
            res2Value: "http://192.168.0.15:8888/",
            res3Value: "http://192.168.0.15:8888/",
            res4Value: "http://192.168.0.15:8888/"
        }
    },
    created: function() {
        this.getRes1Value();
        this.getRes2Value();
        this.getRes3Value();
        this.getRes4Value();
    },
    methods: {
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
                console.log(response.data);
                self.res2Value = response.data;
            }).catch(function() {
                console.log("Failed to get value");
            });
        },
         getRes3Value: function() {
            // store "this" in a new variable because js
            var self = this;
            axios.get('/req/'+this.resource3)
            .then(function(response) {
                console.log(response.data);
                self.res3Value = response.data;
            }).catch(function() {
                console.log("Failed to get value");
            });
        },
         getRes4Value: function() {
            // store "this" in a new variable because js
            var self = this;
            axios.get('/req/'+this.resource4)
            .then(function(response) {
                console.log(response.data);
                self.res4Value = response.data;
            }).catch(function() {
                console.log("Failed to get value");
            });
        }
    }
})