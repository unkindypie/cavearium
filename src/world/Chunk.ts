import * as PIXI from 'pixi.js'
import viewport from '../pixi/viewport'
import ECS from '../ECS/ecs'
import Sprite from '../ECS/components/Sprite'
import Position from '../ECS/components/Position'
import Collision from '../ECS/components/Collision'
import Entity from '../ECS/Entity';
import EntityContainer from '../ECS/EntityContainer';
import Tilemap from './Tilemap'
interface NextChunks {
    left: Chunk,
    right: Chunk,
    top: Chunk,
    down: Chunk
}
export default class Chunk extends PIXI.Container implements EntityContainer{

    public static readonly chunkSize: number = Tilemap.size;
    public readonly rect: PIXI.Rectangle;
    public child: Tilemap;
    public tilemap: Tilemap;//reference to a child to rename it but still implementing the interface
    public next: NextChunks;
    //components tables
    public sprite_components: Sprite[] = [];
    public position_components: Position[] = [];
    public collision_components: Collision[] = [];
    public movement_components: import("../ECS/components/Movement").default[] = [];
    public acceleration_components: import("../ECS/components/Acceleration").default[] = [];
    public velocity_components: import("../ECS/components/Velocity").default[] = [];
    public playerControlled_components: import("../ECS/components/PlayerControlled").default[] = [];


    constructor(tilemap: Tilemap){
        super();

        this.child = tilemap;
        this.tilemap = this.child;
        this.rect = tilemap.rect;

        this.next = {left: null, right: null, top: null, down: null};

        const block = new Entity(tilemap);
        for(let y = 0; y < this.tilemap.map.length; y++){
            for(let x = 0; x < this.tilemap.map[y].length; x++){

                if(!this.tilemap.map[y][x]) continue;
                //if entity in that place has sprite we should draw it
                block.id = this.tilemap.map[y][x];
                if(block.Sprite){
                    this.addChild(block.Sprite);
                }
            }
        }

    }
}