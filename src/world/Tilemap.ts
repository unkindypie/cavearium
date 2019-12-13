import * as PIXI from 'pixi.js'
import EntityContainer from "../ECS/EntityContainer";
import ECS from '../ECS/ecs'

import WorldOptions from './WorldOptions';

export default class Tilemap implements EntityContainer {    
    public tables: Map<string, any[]> = new Map<string, any[]>();

    public child: EntityContainer = null;
    //tile's entity ids
    public map: number[][] = [];
    //tilemap parameters
    public static readonly size = WorldOptions.ChunkSize;
    public readonly pRect: PIXI.Rectangle;
    public readonly mRect: PIXI.Rectangle;
    public inSimulation = false;
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

    public startSimulation() {
        if (!this.inSimulation) {
            for(let id_ in this.component('StaticBody')){
                const id = parseInt(id_);
                this.component('StaticBody')[id].createBody();
            }
            this.inSimulation = true;
        }

    }
    public stopSimulation() {
        if (this.inSimulation) {
            for(let id_ in this.component('StaticBody')){
                const id = parseInt(id_);
                this.component('StaticBody')[id].destroyBody();
            }

            this.inSimulation = false;
        }

    }

    constructor(mRect: PIXI.Rectangle, pRect: PIXI.Rectangle){
        this.pRect = pRect;
        this.mRect = mRect;
        this.initializeComponentTables(ECS.componentTables);
    }
}

