var template = '
    <div class="streams">
    <h1>Camera Component</h1>

    <img src="http://192.168.0.15:8888/&t=" width='640' height='500'
    onload='setTimeout(function()
            {src = src.substring(0, (src.lastIndexOf("t=")+2))+(new Date()).getTime()}, 1000)'
    onerror='setTimeout(function()
            {src = src.substring(0, (src.lastIndexOf("t=")+2))+(new Date()).getTime()}, 5000)' alt='' />

    <video id="MY_VIDEO_1" class="video-js vjs-default-skin" controls preload="auto" width="640" height="500" data-setup="{}">
         <source src="http://192.168.0.15:8888/" type='video/webm'>
         <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
    </video>

    <IFRAME src="http://192.168.0.15:8888/" WIDTH="320" Height="240"</IFRAME>
    <OBJECT ID="AxisCamControl" CLASSID="CLSID:917623D1-D8E5-11D2-BE8B-00104B06BDE3" WIDTH="640" HEIGHT="500" CODEBASE="http://192.168.0.15:8888/activex/AxisCamControl.cab#Version=2,20,0,6">
    <PARAM NAME=DisplaySoundPanel VALUE=0>
    <PARAM NAME=URL VALUE="http://192.168.0.15:8888/axis-cgi/mjpg/video.cgi?camera=&resolution=704x480"></OBJECT>

    <script>
        window.setInterval("reloadIFrame();", 1000);
        function reloadIFrame() {
        document.frames["iframe"].location.reload();
        }
     </script>

    <div id="Container"
	    style="padding-bottom:56.25%; position:relative;
	    display:block; width: 100%">
            <iframe id="iframe" width="100%" height="100%"
                allowfullscreen webkitallowfullscreen
                src="http://192.168.0.15:8888/"
                frameborder="0"
                style="position:absolute; top:0; left: 0">
            </iframe>
    </div>
    
</div>
`;

Vue.component('camera-component', {
    template: template
    }
)

// http://foscam.us/forum/a-how-to-embed-any-foscam-ip-camera-in-webpage-using-1-line-t9113.html
// https://www.npmjs.com/package/streamedian
// http://www.cctvforum.com/viewtopic.php?t=7026
// https://support.video.ibm.com/hc/en-us/articles/207851917-How-to-embed-a-stream-or-video-on-your-site