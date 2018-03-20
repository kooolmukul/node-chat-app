var socket = io();
    socket.on('connect',function(){
        console.log('Connected to Server');
    });
    socket.on('disconnect', function() {
        console.log('Server Disconnected');
    });

    socket.on('newMessage', function(message){
        console.log('New Message', message);
    });

    socket.on('welcomeMessage', function(message){
        console.log(message);
    });
    socket.on('NewUserMessage',function(message){
        console.log(message);
    });