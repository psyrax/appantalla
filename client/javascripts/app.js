$(document).ready(function(){


  
});
  var socket = io.connect('http://localhost:1337');
  socket.on('connect', function() {
    
  });
  socket.on('videoChanged', function(data){
    changeVideo(data.video);
  });
  socket.on('videoPause', function(){
    pauseVideo();
  });
  socket.on('videoPlay', function(){
    playVideo();
  });
  socket.on('vold', function(){
    volumenDown();
  });
  socket.on('volp', function(){
    volumenUp();
  });
  // 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  var player;
  function onYouTubeIframeAPIReady() {
    socket.emit('ytReady');
  }


  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    player.playVideo();
    socket.emit('videoURL', {
      'videoURL': player.getVideoUrl()
    });
  }

  function onPlayerStateChange(event) {
    
  }
  function stopVideo() {
    player.stopVideo();
  }
  function pauseVideo(){
    player.pauseVideo();
  }
  function playVideo(){
    player.playVideo();
  }
  function changeVideo(id){
    $('#videoZone').empty().append('<div id="player"></div>');
    createPlayer(id);
  };
  function volumenUp(){
    var volumen = player.getVolume();
    player.setVolume(volumen+5);
    showVolumen(volumen);
   }
  function volumenDown(){
    var volumen = player.getVolume();
    player.setVolume(volumen-5);
    showVolumen(volumen);
  }
  function createPlayer(id){
     player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: id,
      playerVars: {
        controls: 0,
        modestbranding: 1,
        color: 'white',
        theme: 'light'
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }
  var volDisplay;
    function showVolumen(vol){
      clearInterval(volDisplay);
       $('#volValue').html(vol);
       $('#volDisplay').show();
       volDisplay = setInterval(function(){
        $('#volDisplay').hide();
       }, 500)
    }