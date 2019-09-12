import * as PIXI from 'pixi.js'
import Block from '../entities/Block'
import OpenSimplexNoise from "../../node_modules/open-simplex-noise/lib/index";
import viewport from '../pixi/viewport'

class World /*extends PIXI.Container*/ {
    public seed: number;
    public world: Block[][] = [];
    tilesWidth: number;
    tilesHeight: number;

    constructor(tilesWidth: number = 100, tilesHeight: number = 100){
        //super();
        this.tilesWidth = tilesWidth;
        this.tilesHeight = tilesHeight;
        this.generateWorld();
    }

    private generateWorld(){
        this.seed = Math.random() * 100;
        const noise = new OpenSimplexNoise(this.seed);

        let xoff = 0;
        let yoff = 0;
        let inc = 0.07;

        for(let y = 0; y < this.tilesHeight; y++){
            this.world[y] = [];
            xoff = 0;
            yoff += inc;
            for(let x = 0; x < this.tilesWidth; x++){
                const noiseValue = noise.noise2D(xoff, yoff);
                if(noiseValue > 0){
                    this.world[y][x] = new Block('ground', x * 8, y * 8);
                    viewport.addChild(this.world[y][x]);
                    //this.addChild(this.world[y][x])
                }
                xoff += inc;
            }
        }
        
    }
}

export default World