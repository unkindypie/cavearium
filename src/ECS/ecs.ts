import * as PIXI from 'pixi.js'
import System from './System';
import Chunk from "../world/Chunk";
//components
import Collision from './components/Collision';
import Sprite from './components/Sprite';
import Position from './components/Position';
//systems
import RenderSystem from './systems/RenderSystem'


export default class ECS {
    //for generating unique id
    private static entityCount: number = 0;
    private static entityIDs: number[] = [];

    //system object references
    public static readonly systems: System[] = [new RenderSystem()];

    //component types references
    public static readonly components = {
        Position,
        Collision,
        Sprite  
    };

    private constructor(){}

    public static genareteEntityId(): number {
        let id;

        do{
            id = (Math.random()*10000 + Date.now()/100000)^0;
        }
        while(ECS.entityIDs.indexOf(id) != -1)
        
        ECS.entityIDs.push(id);

        return id;
    }

    
}

//export default ECS;

