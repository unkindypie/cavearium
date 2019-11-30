import System from "../System";
import EntityContainer from '../EntityContainer';
import inputManager from '../../utils/InputManager';
import viewport from '../../pixi/viewport';
import { Point } from "pixi.js";

export default class PlayerInputSystem extends System {
    public update(entityContainer: EntityContainer): void {
        if(entityContainer.constructor.name === 'Tilemap') return;
        
        for(let id_ in entityContainer.playerControlled_components){
            const id = parseInt(id_); 
            if(entityContainer.velocity_components[id]){
                if(inputManager.actions.forward){
                    //console.log('forward');
                    entityContainer.velocity_components[id].velocity = entityContainer.velocity_components[id].absoluteVelocity;
                }
                else{
                    entityContainer.velocity_components[id].velocity = 0;
                }
            }
            if(entityContainer.movement_components[id] && entityContainer.position_components[id]){
                const mouse = viewport.toWorld(inputManager.screenPointer);
                
                //vector from player to mouse
                const deltaDirX = mouse.x  - entityContainer.position_components[id].x;
                const deltaDirY = mouse.y  - entityContainer.position_components[id].y;
                
                //normalizing vector
                const dirLength = Math.sqrt(deltaDirX * deltaDirX + deltaDirY * deltaDirY);
                let normalizedDirX = deltaDirX / dirLength;
                let normalizedDirY = deltaDirY / dirLength;
                entityContainer.movement_components[id].dirY = normalizedDirY;
                entityContainer.movement_components[id].dirX = normalizedDirX;
                
                if(entityContainer.sprite_components[id]){
                    //rotating player sprite by his moving direction
                    entityContainer.sprite_components[id].rotation = 1.5708 + Math.atan2(entityContainer.movement_components[id].dirY, entityContainer.movement_components[id].dirX);
                }
            }

        }
    }
}
