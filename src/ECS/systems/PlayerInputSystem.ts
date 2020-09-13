import { Vec2 } from "planck-js";

import System from "../System";
import EntityContainer from '../EntityContainer';
import inputManager from '../../utils/InputManager';
import viewport from '../../pixi/viewport';
import DynamicBody from '../components/DynamicBody';
import Shiplike from '../components/Shiplike';
import * as MH from '../../utils/MathHelper';
import WorldOption from '../../world/WorldOptions';
import WorldOptions from "../../world/WorldOptions";
import Tilemap from "../../world/Tilemap";
import Chunk from "../../world/Chunk";
import Entity from "../Entity";
import ECS from "../ecs";
import CompoundStaticBody from "../components/CompoundStaticBody";

export default class PlayerInputSystem extends System {
    public update(entityContainer: EntityContainer): void {
        if (entityContainer.constructor.name === 'Tilemap') return;

        for (let id_ in entityContainer.component('PlayerControlled')) {
            const id = parseInt(id_);
            if (entityContainer.component('Shiplike')[id] && entityContainer.component('DynamicBody')[id]) {
                //векторо между мышью и игроком
                const mouse = viewport.toWorld(inputManager.screenPointer);
                const playerPos =  MH.toScreen((entityContainer.component('DynamicBody')[id] as DynamicBody).body.getPosition());
                const delta = Vec2(mouse.x, mouse.y).sub((Vec2(playerPos.x, playerPos.y)));
                delta.normalize();
                delta.y *= -1;
                (entityContainer.component('Shiplike')[id] as Shiplike).desiredAngleVector = delta;
                if(inputManager.actions.forward){
                    (entityContainer.component('Shiplike')[id] as Shiplike).moving = true;
                }
                else{
                    (entityContainer.component('Shiplike')[id] as Shiplike).moving = false;
                }

                const tilemap = (entityContainer as Chunk).child;
                if(!tilemap) continue;
                if(inputManager.actions.clicked) {
      
                    if(tilemap.pRect.contains(mouse.x, mouse.y)) {
                        const bx = ((mouse.x / WorldOption.pTileSize)
                         % WorldOption.ChunkSize) ^ 0;
                        const by = ((mouse.y / WorldOption.pTileSize) 
                         % WorldOption.ChunkSize) ^ 0;
                        if(!tilemap.map) {
                            console.log('not found');
                            continue;
                        }
                        //debugger;
                        const blockId = tilemap.map[by][bx];
                        if(blockId && blockId !== -1) {
                            console.log(blockId);
                            
                            for(let _compoundBody in tilemap.component('CompoundStaticBody')) {
                                const compoundBody = tilemap.component('CompoundStaticBody')
                                [parseInt(_compoundBody)] as CompoundStaticBody;
                   
                                const block = new Entity(tilemap, blockId);
                                console.log(block.listComponents());
                                compoundBody.removeBlock(tilemap, block, bx, by);
                            }
                        }
                        console.log(`block: ${bx}, ${by}`);
                    }
                    // TODO: найди блок и вызвать deleteBlock для CompoundStaticBody
                }
            }
        }
    }
}