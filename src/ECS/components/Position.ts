import IComponent from "./IComponent";

export default class Position implements IComponent{
    public x: number;
    public y: number;
    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }
}