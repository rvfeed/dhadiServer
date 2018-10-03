var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);
let User = require('./lib/dhadi').User;
let users = [];
io.on('connection', (socket) => {
    console.log(socket.id);
    
    if(users.length == 2){
        socket.on('message', (msg) =>{
            console.log(socket.id, msg);
            socket.emit('message', users)
        })
    }else{
        users.push(new User(socket.id, "#FF0000", false));
        socket.emit('message', "Waiting for the match");
    }
   
});
server.listen(3001, ()=>{
    console.log("Server has started at 3001")
});