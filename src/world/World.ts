import * as PIXI from 'pixi.js'
import OpenSimplexNoise from "../../node_modules/open-simplex-noise/lib/index";
import Chunk from './Chunk'
import viewport from '../pixi/viewport'
import Tilemap from './Tilemap'
import Entity from '../ECS/Entity'
import ECS from '../ECS/ecs';

class World /*extends PIXI.Container*/ {
    public seed: number;
    public chunks: Chunk[] = [];
    tilesWidth: number;
    tilesHeight: number;
    noiseIncrement:number = 0.05;

    constructor(tilesWidth: number = 400, tilesHeight: number = 400){
        //super();
        console.log('generating world...')
        this.tilesWidth = tilesWidth;
        this.tilesHeight = tilesHeight;
        this.generateWorld();
        console.log('done.')
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
        

        //calculating noise args considering offsets
        const xoffStart = x * this.noiseIncrement;
        let xoff;
        let yoff = y * this.noiseIncrement;

        const tilemap = new Tilemap(x * ECS.assemblers.BlockAssembler.blockSize, y * ECS.assemblers.BlockAssembler.blockSize);
        const block = new Entity(tilemap);
        for(let by = 0; by < Chunk.chunkSize; by++){
            tilemap.map[by] = [];
            xoff = xoffStart;
            yoff += this.noiseIncrement;

            for(let bx = 0; bx < Chunk.chunkSize; bx++){
                const noiseValue = noise.noise2D(xoff, yoff);
                if(noiseValue > 0.1 ){
                    //assembling block entity in tilemap
                    ECS.assemblers.BlockAssembler.Assemble(block, 'ground', (bx + x) * ECS.assemblers.BlockAssembler.blockSize, (by + y) * ECS.assemblers.BlockAssembler.blockSize);
                    tilemap.map[by][bx] = block.id; //saving it's id in map matrix
                    block.newId(); //changing id
                }
                else{
                    tilemap.map[by][bx] = -1;
                }
                xoff += this.noiseIncrement;
            }
        }
        const chunk = new Chunk(tilemap);
        viewport.addChild(chunk);
        return chunk;
    }

    public updateWorld(){
        const bounds = viewport.getVisibleBounds();
        for(let i = 0; i < this.chunks.length; i++){
            if(this.chunks[i].visible = !(this.chunks[i].rect.right <= bounds.x || this.chunks[i].rect.left >= bounds.x + bounds.width ||
                this.chunks[i].rect.bottom <= bounds.y || this.chunks[i].rect.top >= bounds.y + bounds.height))
            {
                ECS.updateSystems(this.chunks[i]);
            }
            
        }
    }
}

export default World