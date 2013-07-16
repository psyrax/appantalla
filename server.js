var express = require('express'),
app = express(),
server = require('http').createServer(app),
io = require('socket.io').listen(server),
sanitizer = require('sanitizer'),
http = require('http'),
dateFormat = require('dateformat');


server.listen(1337);

app.set('yt', false);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');

});

io.sockets.on('connection', function (socket) {
  socket.on('ytReady', function(data){
    app.set('yt', true);
  });
  socket.on('videoChange', function(data){
    if( app.get('yt') ){
      socket.broadcast.emit('videoChanged', {
        'video' : data.video
      })
    }
  });
  socket.on('videoPause', function(){
    socket.broadcast.emit('videoPause');
  });
  socket.on('videoPlay', function(){
    socket.broadcast.emit('videoPlay');
  });
  socket.on('vold', function(){
    socket.broadcast.emit('vold');
  });
  socket.on('volp', function(){
    socket.broadcast.emit('volp');
  });
  socket.on('videoURL', function(data){
    app.set('videoURL', data.videoURL);
    console.log(app.get('videoURL'));
  });
});