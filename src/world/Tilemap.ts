import * as PIXI from 'pixi.js'
import EntityContainer from "../ECS/EntityContainer";
import ECS from '../ECS/ecs'

export default class Tilemap implements EntityContainer {    
    public tables: Map<string, any[]> = new Map<string, any[]>();

    public child: EntityContainer = null;
    //tile's entity ids
    public map: number[][] = [];
    //tilemap parameters
    public static readonly size = 64;
    public readonly rect: PIXI.Rectangle;
    //check is that tile has collision components
    public isTileCollidable(x: number, y: number): boolean {
        return !!this.tables.get('Collision')[this.map[y][x]];
    }
    
    public addComponentTable = (componentName: string)=>{
        this.tables.set(componentName, []);
    }
    public initializeComponentTables = (componentTables: Array<string>)=>{
        componentTables.forEach((component)=>{
            this.addComponentTable(component);
        })    
    }
    public component = (componentName: string) => {
        return this.tables.get(componentName);
    }

    //(values in pixels)
    constructor(x: number, y: number, width: number, height: number){
        this.rect = new PIXI.Rectangle(x, y, width, height);
        this.initializeComponentTables(ECS.componentTables);
    }
}

