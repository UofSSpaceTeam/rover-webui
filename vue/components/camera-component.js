var template =`
<div class="streams">
    <h1>Camera Component</h1>
    
    <img src="rtsp://jblive.videocdn.scaleengine.net/jb-live/play/jblive.stream&t=" width='640' height='500' 
    onload='setTimeout(function() 
            {src = src.substring(0, (src.lastIndexOf("t=")+2))+(new Date()).getTime()}, 1000)' 
    onerror='setTimeout(function() 
            {src = src.substring(0, (src.lastIndexOf("t=")+2))+(new Date()).getTime()}, 5000)' alt='' />
    
    <video id="MY_VIDEO_1" class="video-js vjs-default-skin" controls preload="auto" width="640" height="500" data-setup="{}">
         <source src="rtsp://jblive.videocdn.scaleengine.net/jb-live/play/jblive.stream" type='video/webm'>
         <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
    </video>
    
    <IFRAME src="http://107.170.59.150" WIDTH="320" Height="240"</IFRAME>
    <OBJECT ID="AxisCamControl" CLASSID="CLSID:917623D1-D8E5-11D2-BE8B-00104B06BDE3" WIDTH="640" HEIGHT="500" CODEBASE="http://107.170.59.150/activex/AxisCamControl.cab#Version=2,20,0,6"> 
    <PARAM NAME=DisplaySoundPanel VALUE=0> 
    <PARAM NAME=URL VALUE="http://107.170.59.150/axis-cgi/mjpg/video.cgi?camera=&resolution=704x480"></OBJECT> 
    
</div>
`;

Vue.component('camera-component', {
    template: template
    }
)
// http://foscam.us/forum/a-how-to-embed-any-foscam-ip-camera-in-webpage-using-1-line-t9113.html
// https://www.npmjs.com/package/streamedian
// http://www.cctvforum.com/viewtopic.php?t=7026