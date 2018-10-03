type dyePostions = {
  x: number;
  y: number;
}

export class DhadiService {
  public dye = null;  
  private drag = false;  
  private dragPrev = false; 
  public currentDye = 0;
  public previousDye = 0;
  public dragPrevDye = 0;
  getDye(){
     return this.currentDye;
  }
  dragDye(flag: boolean){
     return this.dragDye;
  }
  dragPrevDyeO(d){
    return this.dragPrev;
  }
}
