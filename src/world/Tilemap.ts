import * as PIXI from 'pixi.js'
import EntityContainer from "../ECS/EntityContainer";
import ECS from '../ECS/ecs'

export default class Tilemap implements EntityContainer {
    //implementing interface
    public sprite_components: import("../ECS/components/Sprite").default[] = [];
    public position_components: import("../ECS/components/Position").default[] = [];
    public collision_components: import("../ECS/components/Collision").default[] = [];
    public movement_components: import("../ECS/components/Movement").default[] = [];
    public acceleration_components: import("../ECS/components/Acceleration").default[] = [];
    public velocity_components: import("../ECS/components/Velocity").default[] = [];
    public playerControlled_components: import("../ECS/components/PlayerControlled").default[] = [];
    public child: EntityContainer = null;
    //tile's entity ids
    public map: number[][] = [];
    //tilemap parameters
    public static readonly size = 64;
    public readonly rect: PIXI.Rectangle;
    constructor(x: number, y: number){
        this.rect = new PIXI.Rectangle(x, y, ECS.assemblers.BlockAssembler.blockSize * Tilemap.size, ECS.assemblers.BlockAssembler.blockSize * Tilemap.size);
    }
}

