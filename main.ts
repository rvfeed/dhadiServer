import * as http from 'http';
import App from './App';
//create a server and pass our Express app to it.
const server = http.createServer(App);
var io = require('socket.io')(server);
import { User, DhadiIndices } from './lib/dhadi';
import { UserService } from './lib/User';
let users = [];
let dhadiObj: any = {};
let colors = ["user user1", "user user2"]
io.on('connection', (socket) => {
    console.log(socket.id);
    
        users.push(new User(socket.id, colors[users.length], false));
        if(users.length > 2){
           users.shift();
        }
    
    console.log(users.length)
    if(users.length == 2){
        let dObj = new DhadiIndices();
        let userSer = new UserService();
        users[0].isActive = true;
        userSer.users = <User[]>users;
        dhadiObj.currentUser = dObj.currentUser;
        io.emit('message', { dhadiObj, users: users })
        socket.on('message', (msg) =>{
            console.log(socket.id, msg);
           
        })
        socket.on('clickedOnDye', (data) =>{
            console.log(socket.id)
            //searching for the current user
            let user = this.userSer.users.filter(user => user.name == socket.id)[0];
            user.position = data.payload.currentDye;
            if(user){
                userSer.updateCurrentUserDyeCount();
                userSer.swapUser();
            }
           socket.emit('message', users);
            //console.log(userSer);

        })
    }else{      
        socket.emit('message', "Waiting for the match");
    }
   
});
server.listen(3001, ()=>{
    console.log("Server has started at 3001")
});