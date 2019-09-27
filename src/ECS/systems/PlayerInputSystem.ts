import System from "../System";
import EntityContainer from '../EntityContainer';
import InputManager from '../../utils/InputManager';

class PlayerInputSystem extends System {
    public update(entityContainer: EntityContainer): void {
        for(let id in entityContainer.playerControlled_components){
            
        }
    }
    
}