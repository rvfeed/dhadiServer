import * as http from 'http';
import App from './App';
//create a server and pass our Express app to it.
const server = http.createServer(App);
var io = require('socket.io')(server);
import { User, DhadiIndices } from './lib/dhadi';
import { UserService } from './lib/User';
let users: User[] = [];
let dhadiObj: any = {};
let colors = ["user1", "user2"];

io.on('connection', (socket) => {
    console.log(socket.id);
    
    users.push(new User(socket.id, colors[0], false));
        if(users.length > 2){
           users.shift();
        }
    
    console.log(users.length)
    if(users.length == 2){
        let dObj = new DhadiIndices();
        let userSer = new UserService();
        users[0].isActive = true;
        users.forEach( (user, i) =>{
            user.color = colors[i];
        })
        userSer.users = <User[]>users;
        dhadiObj.currentUser = userSer.currentUser;
        let emitObj = { 
            dhadiData: dhadiObj, 
            users: userSer.users,
            dhadiIndices: dObj.dhadiIndices,
            winner: null }
        io.emit('message', emitObj)
        socket.on('message', (msg) =>{
            console.log(socket.id, msg);
           
        })
        socket.on("drag", (data) =>{
        let winner: string = null;
        data = JSON.parse(data);
        console.log("data.previousDye, data.currentDye", data.previousDye, data.currentDye)
            users.forEach(user =>{
                console.log("user.name == socket.id", user.name , socket.id, user.name == socket.id)
                if(user.name == socket.id){
                    user.changeFinalPosition(data.previousDye, data.currentDye);
                  
                   if(dObj.winCombination(user.finalPosition)){
                        winner = socket.id;
                        user.winner = true;
                   };
                }
         
            });
            userSer.swapUser();
            emitObj.winner = winner;
            io.emit('message', emitObj);
        })
        socket.on('clickedOnDye', (data) =>{
            console.log(socket.id)
            //searching for the current user
           // this.userSer.users = this.userSer.users || []
           data = JSON.parse(data);
            let user = userSer.users.filter(user => user.name == socket.id)[0];
          //  console.log("data", data)
            console.log("data.currentDye", data.currentDye)
            user.position = data.currentDye;
            if(user){
                if(dObj.winCombination(user.finalPosition)){
                    emitObj.winner = socket.id;
                    user.winner = true;
               };
                userSer.updateCurrentUserDyeCount();
                userSer.swapUser();
            }
      //      console.log(userSer.users)
           io.emit('message', emitObj);

            //console.log(userSer);

        })
    }else{      
        socket.emit('message', "Waiting for the match");
    }
   
});
server.listen(3001, ()=>{
    console.log("Server has started at 3001")
});