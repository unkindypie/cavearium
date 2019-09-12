import * as PIXI from 'pixi.js'

abstract class Entity extends PIXI.Sprite {
    components: [];

    constructor(texture?: PIXI.Texture){
        super(texture);
    }
}

export default Entity;