import * as PIXI from 'pixi.js'
import Entity from '../entities/Entity'
import Block from '../entities/Block'
import viewport from '../pixi/viewport'

export default class Chunk extends PIXI.Container {
    public static: Block[][] = [];
    public dymanic: Entity[] = [];
    public static readonly chunkSize = 16;
    constructor(blocks: Block[][]){
        super();
        this.static = blocks;
        
        for(let y = 0; y < this.static.length; y++){
            for(let x = 0; x < this.static[y].length; x++){
                if(!this.static[y][x]) continue;
                this.addChild(this.static[y][x]);
            }
        }
    }
    update(){
        //TODO: апдейтить, когда пересекает вьпорт
    }

}