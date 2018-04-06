const moment = require('moment');

var generateMessage = (from, text, socketId) => {
    return {
        from,
        text,
        createdAt : moment().format("h:mm a"),
        type : 'text',
        socketId 
    }
}

var generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        text : `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt : moment().format("h:mm a"),
        type : 'location'
    }
};
module.exports = {
    generateMessage,
    generateLocationMessage
}