import * as PIXI from 'pixi.js'
import loader from '../pixi/loader'
import Entity from './Entity'
//components
import collision from '../components/collision'

class Block extends Entity{
    static readonly size = 8;
    durability: number;
    constructor(type:string, x: number, y: number){
        switch(type){
            case 'ground':
                super(loader.resources['ground'].texture);
                this.id = 1;
                this.durability = 5;
        }
        this.addComponent(collision)

        this.x = x;
        this.y = y;
        this.width = this.height = Block.size;
    }
}

export default Block;