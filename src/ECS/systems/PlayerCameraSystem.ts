import System from "../System";
import EntityContainer from '../EntityContainer';
import viewport from '../../pixi/viewport';


export default class PlayerCameraSystem extends System {
    public update(entityContainer: EntityContainer): void {
        if(entityContainer.constructor.name === 'Tilemap') return;
        
        for(let id_ in entityContainer.playerControlled_components){
            const id = parseInt(id_);
                //moving viewport to the player
                viewport.moveCenter(entityContainer.position_components[id].x,  entityContainer.position_components[id].y);
        }
    }
}