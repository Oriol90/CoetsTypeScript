class Rocket{
   
    name:string;
    thrusters:number;
    maxPower:number[];    
    
    constructor(name:string, thrusters:number, maxPower:number[]){
        this.name = name;
        this.thrusters = thrusters;
        this.maxPower = maxPower;
    }
}