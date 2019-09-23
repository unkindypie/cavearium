import * as PIXI from 'pixi.js'
import EntityContainer from "../ECS/EntityContainer";

export default class Tilemap implements EntityContainer {
    //implementing interface
    public sprite_components: import("../ECS/components/Sprite").default[] = [];
    public position_components: import("../ECS/components/Position").default[] = [];
    public collision_components: import("../ECS/components/Collision").default[] = [];
    //tile's entity ids
    public map: number[][] = [];
    //tilemap parameters
    public static readonly size = 16;
    public readonly rect: PIXI.Rectangle;

}

