var express = require('express');
var path = require('path');
const http = require('http');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var socketIO = require('socket.io');
var appRoutes = require('./routes/app');
var messageUtils = require('./utils/message');
var {Users} = require('./utils/users');

var port = process.env.PORT || 3000;
var app = express();

var server = http.createServer(app);

var io = socketIO(server);
var users = new Users();

io.on('connection', (socket) => {
    console.log('USer connected');

    
    
    //Chat room concept
    socket.on('join',(params,callback)=>{
        socket.join(params.room); 
        users.removeUser(socket.id);
        users.addUser(socket.id, params.user, params.room);

        io.to(params.room).emit('updateUserList',users.getUserList(params.room));

        socket.emit('newMessage', messageUtils.generateMessage('Admin',`Welcome ${params.user } to chat App`));
        socket.broadcast.to(params.room).emit('newMessage',messageUtils.generateMessage('Admin',` ${params.user} has Joined`));
        callback('done');

    })

    socket.on('disconnect', ()=> {
        console.log('user Disconnedted');
        var user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',messageUtils.generateMessage('Admin',` ${user.name} has Left`)); 
        }
    });

    // socket.emit('newMessage', {
    //     from : 'Mukul',
    //     text : 'How are you ?'
    // });

    socket.on('createMessage', (message,callback)=> {
        // console.log('Create Message : ', message);
        var user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newMessage', messageUtils.generateMessage(user.name,message.text));
        }

        
        callback('done');
    })

    socket.on('createLocationMessage', (coords)=> {
        var user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage', messageUtils.generateLocationMessage(user.name,coords.latitude ,coords.longitude));

        }
    })
});




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});


server.listen(port, () => {
    console.log('Server Up !!');
})

// module.exports = app;
