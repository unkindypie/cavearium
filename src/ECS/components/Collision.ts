import IComponent from "./IComponent";
import { Rectangle } from 'pixi.js';

export default class Collision implements IComponent{
    public width: number;
    public height: number;
    public rect: Rectangle = null;

    constructor(width: number, height: number){
        this.width = width;
        this.height = height;
    }
}