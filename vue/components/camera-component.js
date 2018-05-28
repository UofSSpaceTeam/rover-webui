var template =`
    <div class="streams">
        <h1>Camera Component</h1>
        <div id="Container1" 
            style="padding-bottom:56.25%; position:relative;
            display:block; width: 100%">
            <iframe name="stream1" width="100%" height="100%" 
                allowfullscreen webkitallowfullscreen
                src="http://192.168.0.15:8888"
                frameborder="0"
                style="position:absolute; top:0; left: 0">
            </iframe>
        </div>
        <div id="Container2" 
            style="padding-bottom:56.25%; position:relative;
            display:block; width: 100%">
            <iframe name="stream2" width="100%" height="100%" 
                allowfullscreen webkitallowfullscreen
                src="http://192.168.0.15:8888" 
                frameborder="0"
                style="position:absolute; top:0; left: 0">
            </iframe>
        </div>
        <div id="Container3" 
            style="padding-bottom:56.25%; position:relative;
            display:block; width: 100%">
            <iframe name="stream3" width="100%" height="100%" 
                allowfullscreen webkitallowfullscreen
                src="http://192.168.0.15:8888" 
                frameborder="0"
                style="position:absolute; top:0; left: 0">
            </iframe>
        </div>
        <div id="Container4" 
            style="padding-bottom:56.25%; position:relative;
            display:block; width: 100%">
            <iframe name="stream4" width="100%" height="100%" 
                allowfullscreen webkitallowfullscreen
                src="http://192.168.0.15:8888" 
                frameborder="0"
                style="position:absolute; top:0; left: 0">
            </iframe>
        </div>
    </div>
`;

Vue.component('camera-component', {
    template: template
})