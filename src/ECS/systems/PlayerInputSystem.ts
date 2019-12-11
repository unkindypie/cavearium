import System from "../System";
import EntityContainer from '../EntityContainer';
import inputManager from '../../utils/InputManager';
import viewport from '../../pixi/viewport';
import DynamicBody from '../components/DynamicBody';
import Shiplike from '../components/Shiplike';
import * as MH from '../../utils/MathHelper';

export default class PlayerInputSystem extends System {
    public update(entityContainer: EntityContainer): void {
        if (entityContainer.constructor.name === 'Tilemap') return;

        for (let id_ in entityContainer.component('PlayerControlled')) {
            const id = parseInt(id_);
            //inputManager.actions.forward
            if (entityContainer.component('Shiplike')[id] && entityContainer.component('DynamicBody')[id]) {
                const mouseInPixels = viewport.toWorld(inputManager.screenPointer);
                const mouse = MH.toWorld(mouseInPixels.x, mouseInPixels.y);
                console.log('MOUSE:', mouseInPixels);
                const playerPos = (entityContainer.component('DynamicBody')[id] as DynamicBody).body.getPosition();
                console.log('BODY:', MH.toScreen(playerPos));

                mouse.sub(playerPos);
                mouse.normalize();
                console.log(mouse);
                (entityContainer.component('Shiplike')[id] as Shiplike).desiredAngleVector = mouse;
                
            }
        }
    }
}