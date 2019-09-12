import * as PIXI from 'pixi.js'
import Block from '../entities/Block'
import OpenSimplexNoise from "../../node_modules/open-simplex-noise/lib/index";
import app from '../pixi/pixiapp'

class World {
    public seed: number;
    public world: Block[][] = [];
    width: number;
    height: number;

    constructor(width: number = 100, height: number = 100){
        this.width = width;
        this.height = height;
        this.generateWorld();
    }

    private generateWorld(){
        this.seed = Math.random() * 100;
        const noise = new OpenSimplexNoise(this.seed);

        let xoff = 0;
        let yoff = 0;
        let inc = 0.07;

        for(let y = 0; y < this.height; y++){
            this.world[y] = [];
            xoff = 0;
            yoff += inc;
            for(let x = 0; x < this.width; x++){
                const noiseValue = noise.noise2D(xoff, yoff);
                if(noiseValue > 0){
                    this.world[y][x] = new Block('ground', x * 8, y * 8);
                    app.stage.addChild(this.world[y][x]);
                }
                xoff += inc;
            }
        }
        
    }
}

export default World