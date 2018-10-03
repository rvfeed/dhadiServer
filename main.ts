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
type UserInfo = {
    username: string;
}
const payload = <any>{};
io.on('connection', (socket) => {
    console.log(socket.id);
    let dObj = new DhadiIndices();
    let userSer = new UserService();
/*     
       // users.push(new User(socket.id, colors[users.length], false));
        if(users.length > 2){
           users.shift();
        } */
    socket.on('load', (msg) =>{
        console.log('load', msg)
    })
    socket.on('login', (loginInfo: UserInfo) =>{
        if(users.length < 2)
            users.push(new User(loginInfo.username, colors[users.length], false));
        console.log('login', loginInfo)
        users[0].isActive = true;
        payload.users = users;
        payload.currentUser = dObj.currentUser;
        socket.emit('message', {payload})
    })
    socket.on('clickedOnDye', (data) => {
            if(!this.userSer) this.userSer = { users:[]}
            let user = this.userSer.users.filter(user => user.name == socket.id)[0];
            user.position = data.payload.currentDye;
            if(user){
                userSer.updateCurrentUserDyeCount();
                userSer.swapUser();
            }
           socket.emit('message', users);
        })
    
});
server.listen(3001, ()=>{
    console.log("Server has started at 3001")
});