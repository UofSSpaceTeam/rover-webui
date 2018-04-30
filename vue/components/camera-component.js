var template =`
<div class="streams">
    <h1>Camera Component</h1>
    
    <video controls autoplay width="640" height="500">
        <source src="http://174.2.244.16">
    </video>
    
    <video id="camera1" class="video-js vjs-default-skin" controls preload="auto" width="640" height="500" data-setup="{}">
         <source src="rtsp://jblive.videocdn.scaleengine.net/jb-live/play/jblive.stream" type='video/mp4'>
         <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
    </video>
    
</div>
`;

Vue.component('camera-component', {
    template: template
    }
)