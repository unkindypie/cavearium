import IComponent from "./IComponent";
import { Rectangle } from 'pixi.js';

export default class Collision implements IComponent{
    public width: number;
    public height: number;

    public useSpriteAsRect: boolean = true
    public rotationOffset: number = 0;
    public offsetX: number = 0;
    public offsetY: number = 0;

    constructor(width: number, height: number){
        this.width = width;
        this.height = height;
    }
}