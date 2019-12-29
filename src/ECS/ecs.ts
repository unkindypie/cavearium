import * as PIXI from 'pixi.js'
import System from './System';
import EntityContainer from './EntityContainer';
//components
import Sprite from './components/Sprite';
import PlayerControlled from './components/PlayerControlled'
import Shiplike from './components/Shiplike';
import DynamicBody from './components/DynamicBody';
import StaticBody from './components/StaticBody';
import CompoundStaticBody from './components/CompoundStaticBody';
//systems
import RenderSystem from './systems/RenderSystem';
import Box2DSystem from './systems/Box2D';
import TilemapRenderSystem from './systems/TilemapRenderSystem';
import PlayerInputSystem from './systems/PlayerInputSystem';
import PlayerCameraSystem from './systems/PlayerCameraSystem';
import ChunkTransitionSystem from './systems/ChunkTransitionSystem'
import ShiplikeMovementSystem from './systems/ShiplikeMovementSystem';

//assemblers
import BlockAssembler from './assemblers/BlockAssembler';

export default class ECS {
    //for generating unique id
    private static iter: number = 0;
    private static entityIDs: number[] = [];
    public static Physics: Box2DSystem = new Box2DSystem()

    //System object references
    public static readonly systems: System[] = [
        new PlayerInputSystem(),
        new ShiplikeMovementSystem(),
        new PlayerCameraSystem(),
        new TilemapRenderSystem(), 
        new RenderSystem(),
        new ChunkTransitionSystem() //to fix strange glitch next render after transition shuld be called adter box2d.step() so this is in the end
    ];

    public static readonly componentTables = [
        'Sprite',
        'PlayerControlled',
        'DynamicBody',
        'StaticBody',
        'Shiplike',
        'CompoundStaticBody'
    ]
    //component contructor references
    public static readonly components = {
        Sprite,
        PlayerControlled,
        Shiplike,
        DynamicBody,
        StaticBody,
        CompoundStaticBody
    };

    //current bunch of EntitieContainers that are being updating
    public static visibleConteiners: EntityContainer[] = [];

    //bindings to fastly create specific entities
    public static readonly assemblers = {
        BlockAssembler
    }

    private constructor() { }

    public static genareteEntityId(): number {
        let id;
        ECS.iter++;
        return ECS.iter;
        do {
            id = (Math.random() * 10000 + Date.now() / 100000) ^ 0;
        }
        while (ECS.entityIDs.indexOf(id) != -1)

        ECS.entityIDs.push(id);

        return id;
    }
    public static updateSystems(container: EntityContainer, delta: number) {
        
        for (let i = 0; i < this.systems.length; i++) {
            this.systems[i].update(container, delta);
        }
        // //updating prePhysicsSystems for every chunk
        // for (let i = 0; i < this.prePhysicsSystems.length; i++) {
        //     this.prePhysicsSystems[i].update(container, delta);
        // }

        // //updating physics
        // ECS.Physics.update(delta);

        // //updating postPhysicsSystems for every chunk
        // for (let i = 0; i < this.postPhysicsSystems.length; i++) {
        //     this.postPhysicsSystems[i].update(container, delta);
        // }
    }

}
