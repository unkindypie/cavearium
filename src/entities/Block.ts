import * as PIXI from 'pixi.js'
import loader from '../pixi/loader'
import Entity from './Entity'
//components
import collision from '../components/collision'
import render from '../components/render'

class Block extends Entity{
    constructor(type:string, x: number, y: number){
        switch(type){
            case 'ground':
                super(loader.resources['ground'].texture);
                this.id = 1;
        }
        this.components.push(collision);
        // this.components.push(
        //     [
        //         collision,
        //         render
        //     ]);

        this.x = x;
        this.y = y;
        this.width = this.height = 8
    }
}

export default Block;