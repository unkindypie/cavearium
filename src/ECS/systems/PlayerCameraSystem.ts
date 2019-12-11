import System from "../System";
import EntityContainer from '../EntityContainer';
import viewport from '../../pixi/viewport';
import DynamicBody from '../components/DynamicBody'; 
import * as MH from '../../utils/MathHelper';

export default class PlayerCameraSystem extends System {
    public update(entityContainer: EntityContainer): void {
        if (entityContainer.constructor.name === 'Tilemap') return;

        for (let id_ in entityContainer.component('PlayerConrrolled')) {
            const id = parseInt(id_);
            if (entityContainer)
                if (entityContainer.component('DynamicBody')) {
                    const playerPositon = MH.toScreen((entityContainer.component('DynamicBody') as DynamicBody).body.getPosition());

                    //moving viewport to the player
                    viewport.moveCenter(playerPositon.x, playerPositon.y);
                }

        }
    }
}