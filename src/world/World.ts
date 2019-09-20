import * as PIXI from 'pixi.js'
import OpenSimplexNoise from "../../node_modules/open-simplex-noise/lib/index";
import Block from '../entities/Block'
import Chunk from './Chunk'
import viewport from '../pixi/viewport'

class World /*extends PIXI.Container*/ {
    public seed: number;
    public world: Block[][] = [];
    public chunks: Chunk[] = [];
    tilesWidth: number;
    tilesHeight: number;
    noiseIncrement:number = 0.05;

    constructor(tilesWidth: number = 400, tilesHeight: number = 400){
        //super();
        this.tilesWidth = tilesWidth;
        this.tilesHeight = tilesHeight;
        this.generateWorld();
    }
    private generateWorld(){
        this.seed = Math.random() * 10000;
        for(let y = 0; y < this.tilesHeight; y += Chunk.chunkSize){
            for(let x = 0; x < this.tilesWidth; x += Chunk.chunkSize){
               this.chunks.push(this.generateChunk(x, y));
            }
        }   
    }
    private generateChunk(x: number, y: number): Chunk{
        const noise = new OpenSimplexNoise(this.seed);
        

        //считаю аргументы для шума
        const xoffStart = x * this.noiseIncrement;
        let xoff;
        let yoff = y * this.noiseIncrement;

        const blocks: Block[][] = [];

        for(let by = 0; by < Chunk.chunkSize; by++){
            blocks[by] = [];
            xoff = xoffStart;
            yoff += this.noiseIncrement;

            for(let bx = 0; bx < Chunk.chunkSize; bx++){
                const noiseValue = noise.noise2D(xoff, yoff);
                if(noiseValue > 0.1 ){
                    blocks[by][bx] = new Block('ground', (bx + x) * Block.size, (by + y) * Block.size);
                }
                else{
                    blocks[by][bx] = null;
                }
                xoff += this.noiseIncrement;
            }
        }
        const chunk = new Chunk(blocks, x * Block.size, y * Block.size);
        viewport.addChild(chunk);
        return chunk;
    }

    public updateWorld(){
        //      culling
        const bounds = viewport.getVisibleBounds();

        for(let i = 0; i < this.chunks.length; i++){

            if(this.chunks[i].visible = !(this.chunks[i].rect.right <= bounds.x || this.chunks[i].rect.left >= bounds.x + bounds.width ||
                this.chunks[i].rect.bottom <= bounds.y || this.chunks[i].rect.top >= bounds.y + bounds.height))
            {
                let beginY = bounds.y - this.chunks[i].rect.y;
                let endY = bounds.y + bounds.height - this.chunks[i].rect.y;

                if(beginY < 0) beginY = 0;
                if(endY > this.chunks[i].rect.bottom) endY = this.chunks[i].rect.bottom;

                let beginX = bounds.x - this.chunks[i].rect.x;
                let endX = bounds.x + bounds.width - this.chunks[i].rect.x

                if(beginX < 0) beginX = 0;
                if(endX > this.chunks[i].rect.right) endX = this.chunks[i].rect.right;

                this.chunks[i].update((beginX/Block.size)^0, (beginY/Block.size)^0, (endX/Block.size)^0, (endY/Block.size)^0);
            }
        }
        

    }
    // private generateWorld(){
    //     this.seed = Math.random() * 100;
    //     const noise = new OpenSimplexNoise(this.seed);

    //     let xoff = 0;
    //     let yoff = 0;
    //     let inc = 0.07;

    //     for(let y = 0; y < this.tilesHeight; y++){
    //         this.world[y] = [];
    //         xoff = 0;
    //         yoff += inc;
    //         for(let x = 0; x < this.tilesWidth; x++){
    //             const noiseValue = noise.noise2D(xoff, yoff);
    //             if(noiseValue > 0){
    //                 this.world[y][x] = new Block('ground', x * 8, y * 8);
    //                 viewport.addChild(this.world[y][x]);
    //                 //this.addChild(this.world[y][x])
    //             }
    //             xoff += inc;
    //         }
    //     }   
    // }
}

export default World