import * as PIXI from 'pixi.js'
import IComponent from './IComponents';

export default class Sprite extends PIXI.Sprite implements IComponent  {
    constructor(texture: PIXI.Texture){
        super(texture);
    }
}