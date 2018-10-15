import { User, DhadiIndices } from "./dhadi";
import { DhadiService } from "./dye"

export class UserService{
  activeUsers : number[] = [1,2]
  _currentUser: number = 1;
  finalPosition = [];
  _users = [];
  successMsg = ''
  constructor() { 
      
  }
  swapUser(){
    let u = this.activeUsers;
      this.activeUsers = [u[0]-(u[0]-u[1]), u[1]-(u[1]-u[0])];
      this.currentUser = this.activeUsers[0];
    //  console.log("  console.log(this.users)", this.users)
     this.activeUsers.forEach((user) =>{
  //   console.log(user, "user")
       this._users[user-1].isActive = !this._users[user-1].isActive;
     })
  }
  
  set userPosition(position: number){
    console.log(new DhadiIndices().winIndices)
    this.currentUserObj.previousDye = new DhadiService().previousDye;
    this.currentUserObj.position = position;
    
    for(let arr of new DhadiIndices().winIndices){
      if(arr.toString() == this.userFinalPosition.toString()){
         console.log ("Hurreyyyy!! "+this.currentUserObj.name+" has won!");  
      }
    }
    console.log(this.currentUserObj.name)
    console.log(this.userFinalPosition)
  }
  get userFinalPosition(): number[]{
    return this.currentUserObj.finalPosition;
  }

  get users(){
    return this._users;
  }
  set users(users){
        this._users = users;
  }

  get currentUser(): number{
    return this._currentUser;
  }
  set currentUser(user){
    this._currentUser = user;
  }
  get currentUserFlag(): string{
    return "user"+this.currentUser+"Active";
  }
  get currentUserObj(): User{
    return this._users[this.currentUser-1];
  }
  get currentUserDyeCount(){
    return this.currentUserObj.dyeCount;
  }
  updateCurrentUserDyeCount(){
    return this.currentUserObj.dyeCount--;
  }
}