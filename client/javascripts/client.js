$(document).ready(function(){
  var socket = io.connect('http://192.168.5.30:1337');
  $('#sendVideo').on('click', function(){
    var video_id = $('#video').val().split('v=')[1];
    var ampersandPosition = video_id.indexOf('&');
    if(ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }
    socket.emit('videoChange', {
      'video': video_id
    })
  });
  $('#pauseVideo').on('click', function(){
    socket.emit('videoPause');
  });
  $('#playVideo').on('click', function(){
    socket.emit('videoPlay');
  });
  $('#vd').on('click', function(){
    socket.emit('vold');
  });
  $('#vp').on('click', function(){
    socket.emit('volp');
  });
});