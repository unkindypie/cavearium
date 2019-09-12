import * as PIXI from 'pixi.js'
import Entity from './Entity'
import Collision from '../components/Collision'
import loader from '../pixi/loader'

class Block extends Entity implements Collision {
    constructor(type:string, x: number, y: number){
        switch(type){
            case 'ground':
                super(loader.resources['ground'].texture);
        }
        this.x = x;
        this.y = y;
        this.width = this.height = 8
    }
}

export default Block;