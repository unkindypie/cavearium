import * as PIXI from 'pixi.js'

class ECS {
    public systems = {};
    public components = {
        Collision: function(){
            return this;
        },
        Sprite: PIXI.Sprite/*function(texture: PIXI.Texture){
            this.sprite = new PIXI.Sprite(texture);
            return this;
        }*/
        
    };
    constructor(){
        
    }
}