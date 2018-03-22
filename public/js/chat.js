var socket = io();

function scrollToBottom() {
    // Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child')
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}


socket.on('connect', function () {
    console.log('Connected to Server');
});
socket.on('disconnect', function () {
    console.log('Server Disconnected');
});

socket.on('newMessage', function (message) {
    console.log('New Message', message);

    var li = jQuery('<li></li>');
    li.text(`${message.from} ${message.createdAt} : ${message.text}`);

    jQuery('#messages').append(li);
    scrollToBottom();
});


socket.on('newLocationMessage', function (message) {

    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>')
    li.text(`${message.from} ${message.createdAt} : `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
    scrollToBottom();
});


jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {
        jQuery('[name=message]').val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by Browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location ...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch Location');
    })
});