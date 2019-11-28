import IComponent from "./IComponent";

export default class Collision implements IComponent{
    public width: number;
    public height: number;
    constructor(width: number, height: number){
        this.width = width;
        this.height = height;
    }
}