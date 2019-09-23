import * as PIXI from 'pixi.js'
import System from '../System';
import Entity from '../Entity'
import Chunk from '../../world/Chunk'
import viewport from '../../pixi/viewport';
import Sprite from '../components/Sprite';
import EntityContainer from '../EntityContainer';

export default class RenderSystem extends System {
    public initalize(chunk: Chunk, entity: Entity){
        //if(chunk.)
    }
    public update(container: EntityContainer): void {
        // for(let i = 0; i < container.sprite_components.length; i++){
        //     //chunk.sprite_components[i].visible = true;
        // }
    }

}