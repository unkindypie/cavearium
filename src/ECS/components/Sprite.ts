import * as PIXI from 'pixi.js'
import IComponent from './IComponent';

export default class Sprite extends PIXI.Sprite implements IComponent  {
    constructor(texture: PIXI.Texture){
        super(texture);
    }
}