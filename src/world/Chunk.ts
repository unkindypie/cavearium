import * as PIXI from 'pixi.js'
import viewport from '../pixi/viewport'
import ECS from '../ECS/ecs'
import Sprite from '../ECS/components/Sprite'
import Position from '../ECS/components/Position'
import Collision from '../ECS/components/Collision'
import Entity from '../ECS/Entity';
import EntityContainer from '../ECS/EntityContainer';
import Tilemap from './Tilemap'

export default class Chunk extends PIXI.Container implements EntityContainer{

    public static readonly chunkSize: number = Tilemap.size;
    public readonly rect: PIXI.Rectangle;
    public child: Tilemap;
    public tilemap: Tilemap;//reference to a child to rename it but still implementing the interface
    //components tables
    public sprite_components: Sprite[] = [];
    public position_components: Position[] = [];
    public collision_components: Collision[] = [];
    


    constructor(tilemap: Tilemap){
        super();

        this.child = tilemap;
        this.tilemap = this.child;
        this.rect = tilemap.rect;

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
    update(beginX: number, beginY: number, endX: number, endY: number){
        // for(let i = 0; i < Chunk.chunkSize; i++){
        //     for(let j = 0; j < Chunk.chunkSize; j++){
        //         if(!this.static[i][j]) continue;
        //         this.static[i][j].visible = i >= beginY && i <= endY && j >= beginX && j <= endX;
        //     }
        // }
    }

}