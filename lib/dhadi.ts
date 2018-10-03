interface IUser{
    name: string;
    finalPosition;
}
export class DhadiIndices{
    _currentUser : number= 1
    constructor(){}
    get currentUser(){
        return this._currentUser;
    }
    set currentUser(user: number){
         this._currentUser = user;
    }

    get dhadiIndices() {
     return {
        "9":[1,3,8],
        "8": [3,7,9],
        "7": [3,6,8],
        "6" : [3,5,7],
        "5": [3,4,6],
        "4": [2,3,4],
        "3": [1, 2, 4, 5, 6, 7, 8, 9],
        "2": [1,3,4],
        "1": [2,3,9]
    }
}
   get winIndices() {
    return [
        [1,2,9],
        [3,4,8],
        [5,6,7],
        [2,4,5],
        [1,3,6],
        [7,8,9],
        [3,5,9],
        [2,3,7]
        ]
    
   } 
}
class Dye extends DhadiIndices{
    readonly maxDyeCount = 3;
    dyeCount: number = 3;
    previousDye: number = 0;
    constructor(){
        super();
    }
}
export class User extends Dye implements IUser {
    name: string;    
    isActive: boolean = false;
    private  _position: number = 0;
    private _finalPosition: Array<number> = []
    color: string = "#ff0000";
    constructor(name, color, isActive = false){
        super();
        this.name =  name;
        this.color = color;
        this.isActive = isActive;
    }
    get finalPosition(){
        return this._finalPosition.slice(0).sort();
    }
    private setfinalPosition(){
       // this._finalPosition = finalArray;
       console.log(this._position)
        if(this.finalPosition.length < this.maxDyeCount ){
            this._finalPosition.push(this._position);
          }else{
             this._finalPosition.splice(this._finalPosition.indexOf(this.previousDye), 1);
            this._finalPosition.push(this._position);
          }
          console.log(this.finalPosition)
    }
    get position(){
        return this._position;
    }
    set position(pos: number){
       
        this._position = pos;
        this.setfinalPosition();
    }
}





