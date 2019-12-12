import System from "../System";
import EntityContainer from '../EntityContainer';
import inputManager from '../../utils/InputManager';
import viewport from '../../pixi/viewport';
import DynamicBody from '../components/DynamicBody';
import Shiplike from '../components/Shiplike';
import * as MH from '../../utils/MathHelper';
import { Vec2 } from "planck-js";

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
            }
        }
    }
}