import * as PIXI from 'pixi.js'
import OpenSimplexNoise from "../../node_modules/open-simplex-noise/lib/index";
import Chunk from './Chunk'
import viewport from '../pixi/viewport'
import Tilemap from './Tilemap'
import Entity from '../ECS/Entity'
import ECS from '../ECS/ecs';
import loader from '../pixi/loader';
import * as WorleyNoise from 'worley-noise'
import * as planck from 'planck-js';
import * as MH from '../utils/MathHelper';
import app from '../pixi/pixiapp';
import WorldOptions from './WorldOptions';

export const b2World = planck.World({
    //gravity: planck.Vec2(0, -9)
});

class World /*extends PIXI.Container*/ {
    public seed: number;
    public chunks: Chunk[] = [];
    tilesWidth: number;
    tilesHeight: number;
    caveNoiseIncrement: number = 0.05;
    asteroidNoiseIncrement: number = 0.002;
    public visibleChunks: Chunk[] = [];
    public b2World: planck.World = b2World;

    constructor(tilesWidth: number = 400, tilesHeight: number = 400) {
        MH.setScreenHeight(app.renderer.height);
        console.log('generating world...')
        this.tilesWidth = tilesWidth;
        this.tilesHeight = tilesHeight;
        this.generateWorld();
        //Adding player
        const player = new Entity(this.chunks[0]);
        player.newId();
        player.addComponent(new ECS.components.Sprite(loader.resources['player'].texture))
            .addComponent(new ECS.components.PlayerControlled())
            .addComponent(new ECS.components.DynamicBody(
                new planck.Box(
                    MH.xToWorld(60 * 6),
                    MH.xToWorld(60 * 6)
                ),
                MH.xToWorld((60 * 6) * 2),
                MH.yToWorld((60 * 6) * 2)
            ))
            .addComponent(new ECS.components.Shiplike())

        this.chunks[0].addChild(player.component('Sprite'));
        player.component('Sprite').anchor.x = player.component('Sprite').anchor.y = 0.5;
        player.component('Sprite').zIndex = 5;

        player.component('Sprite').width = player.component('Sprite').height = 60 * 6;

        player.component('DynamicBody').createBody();


        // const player2 = new Entity(this.chunks[0]);
        // player2.newId();
        // player2.addComponent(new ECS.components.Sprite(loader.resources['player'].texture))
        //     .addComponent(new ECS.components.DynamicBody(
        //         new planck.Box(
        //             MH.xToWorld(60 * 6 + 60),
        //             MH.xToWorld(60 * 6)
        //         ),
        //         MH.xToWorld((60 * 6) * 2 + 60),
        //         MH.yToWorld((60 * 6) * 2 + 60)
        //     ))

        // this.chunks[0].addChild(player2.component('Sprite'));
        // player2.component('Sprite').anchor.x = player2.component('Sprite').anchor.y = 0.5;
        // player2.component('Sprite').zIndex = 5;

        // player2.component('Sprite').width = player2.component('Sprite').height = 60 * 6;

        // player2.component('DynamicBody').createBody();



        console.log('done.')
        // for(let i = 0; i < 20; i++){
        //     const player2 = new Entity(this.chunks[0]);
        //     player2.newId();
        //     player2.addComponent(new ECS.components.Sprite(loader.resources['player'].texture))
        //         .addComponent(new ECS.components.Position(200 + 64 * 3 * i, 200))
        //         .addComponent(new ECS.components.Movement())
        //         .addComponent(new ECS.components.Velocity(7))
        //         .addComponent(new ECS.components.Acceleration(3, 0))
        //         .addComponent(new ECS.components.Collision(64 * 4, 64 * 4));
        //     this.chunks[0].addChild(player2.Sprite);
        //     player2.Sprite.anchor.x = player2.Sprite.anchor.y = 0.5;
        //     player2.Sprite.width = player2.Sprite.height = 64 * 3;
        //     player2.Velocity.absoluteVelocity = 10;
        //     player2.Movement.dirY = 1;
        // }
    }
    private generateWorld() {
        this.seed = Math.random() * 10000;
        for (let y = 0; y < this.tilesHeight; y += Chunk.chunkSize) {
            for (let x = 0; x < this.tilesWidth; x += Chunk.chunkSize) {
                this.chunks.push(this.generateChunk(x, y));
                if (this.chunks[this.chunks.length - 1 - this.tilesHeight / Chunk.chunkSize]) {
                    this.chunks[this.chunks.length - 1].next.top = this.chunks[this.chunks.length - 1 - this.tilesHeight / Chunk.chunkSize];
                    this.chunks[this.chunks.length - 1 - this.tilesHeight / Chunk.chunkSize].next.down = this.chunks[this.chunks.length - 1];
                }

                if (x != 0) {
                    this.chunks[this.chunks.length - 1].next.left = this.chunks[this.chunks.length - 2];
                    this.chunks[this.chunks.length - 2].next.right = this.chunks[this.chunks.length - 1];
                }
            }
        }
    }
    private generateChunk(x: number, y: number): Chunk {
        const noise = new OpenSimplexNoise(this.seed);
        const asteroidNoise = new OpenSimplexNoise((this.seed / 2 + 12312124) / 4);
        const worleyNoise = new WorleyNoise({
            numPoints: 15,
            seed: this.seed
        });

        //calculating noise args considering offsets
        const xoffStart = x * this.caveNoiseIncrement;
        let xoff;
        let yoff = y * this.caveNoiseIncrement;
        let asteroid_xoffStart = x * this.asteroidNoiseIncrement;
        let asteroid_xoff;
        let asteroid_yoff = y * this.asteroidNoiseIncrement;

        const tilemap = new Tilemap(x * WorldOptions.pTileSize, y * WorldOptions.pTileSize, WorldOptions.pTileSize * Tilemap.size,  WorldOptions.pTileSize * Tilemap.size);
        const block = new Entity(tilemap);

        for (let by = 0; by < Chunk.chunkSize; by++) {
            tilemap.map[by] = [];
            xoff = xoffStart;
            yoff += this.caveNoiseIncrement;
            asteroid_xoff = asteroid_xoffStart;
            asteroid_yoff += this.asteroidNoiseIncrement;

            for (let bx = 0; bx < Chunk.chunkSize; bx++) {
                const caveNoiseValue = noise.noise2D(xoff, yoff);
                const asteroidNoiseValue = asteroidNoise.noise2D(asteroid_xoff, asteroid_yoff);
                const worleyNoiseValue = worleyNoise.getEuclidean({ x: (x + bx) / this.tilesWidth, y: (y + by) / this.tilesHeight }, 1);

                if (worleyNoiseValue / Math.abs(asteroidNoiseValue) < 0.2 && caveNoiseValue < (worleyNoiseValue / Math.abs(asteroidNoiseValue)) * 4) {
                    // block.newId(); //changing id
                    // //assembling block entity in tilemap
                    // ECS.assemblers.BlockAssembler.Assemble(block, 'ground', (bx + x) * ECS.assemblers.BlockAssembler.blockSize, (by + y) * ECS.assemblers.BlockAssembler.blockSize);
                    // tilemap.map[by][bx] = block.id; //saving it's id in map matrix
                }
                //broders
                else if ((x === 0 && bx == 0) || (x === this.tilesWidth - 1 && bx == Chunk.chunkSize - 1)
                    || (y === 0 && by == 0) || (y === this.tilesHeight - 1 && by == Chunk.chunkSize - 1)) {
                    // block.newId(); //changing id
                    // //assembling block entity in tilemap
                    // ECS.assemblers.BlockAssembler.Assemble(block, 'ground', (bx + x) * ECS.assemblers.BlockAssembler.blockSize, (by + y) * ECS.assemblers.BlockAssembler.blockSize);
                    // tilemap.map[by][bx] = block.id; //saving it's id in map matrix
                }
                //empty space
                else {
                    tilemap.map[by][bx] = -1;
                }
                xoff += this.caveNoiseIncrement;
                asteroid_xoff += this.asteroidNoiseIncrement;
            }
        }
        const chunk = new Chunk(tilemap);
        viewport.addChild(chunk);
        return chunk;
    }

    public updateWorld(delta: number) {
        const bounds = viewport.getVisibleBounds();
        for (let i = 0; i < this.chunks.length; i++) {

            if (this.chunks[i].visible = !(this.chunks[i].rect.right <= bounds.x || this.chunks[i].rect.left >= bounds.x + bounds.width ||
                this.chunks[i].rect.bottom <= bounds.y || this.chunks[i].rect.top >= bounds.y + bounds.height)) {
                this.chunks[i].startSimulation();
                ECS.updateSystems(this.chunks[i], delta);
            }
            else {
                this.chunks[i].stopSimulation();
            }
        }
    }
}

export default World