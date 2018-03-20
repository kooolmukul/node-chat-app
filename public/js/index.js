var socket = io();
    socket.on('connect',function(){
        console.log('Connected to Server');

        socket.emit('createMessage', {
            from : 'abc@gmai.com',
            text : 'i am Fine '
        });
    });
    socket.on('disconnect', function() {
        console.log('Server Disconnected');
    });

    socket.on('newMessage', function(message){
        console.log('New Message', message);
    });