import * as PIXI from 'pixi.js'
import viewport from '../pixi/viewport'
import ECS from '../ECS/ecs'
import Sprite from '../ECS/components/Sprite'
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
    public tables: Map<string, any[]> = new Map<string, any[]>();

    public inSimulation = false;


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

    constructor(tilemap: Tilemap){
        super();
        this.initializeComponentTables(ECS.componentTables);

        this.zIndex = 1;

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
                if(block.component('Sprite')){
                    this.addChild(block.component('Sprite'));
                }
            }
        }
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(10, 0xFFFFFF, 1);
        //graphics.beginFill(0xAA4F08);
        graphics.drawRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
        graphics.endFill();
        this.addChild(graphics);
    }
    public startSimulation() {
        if(!this.inSimulation){
            //create all the bodies...

            this.inSimulation = true;
        }
    
    }
    public stopSimulation() {
        if(this.inSimulation){
            //destroy all the bodies...

            this.inSimulation = false;
        }
        
    }
}