import System from "../System";
import EntityContainer from '../EntityContainer';
import Chunk from '../../world/Chunk';
import Entity from '../Entity';

export default class ChunkTransitionSystem extends System {
    public update(entityContainer: EntityContainer): void {
        if(entityContainer.constructor.name === 'Tilemap') return;

        for(let id_ in entityContainer.component('DynamicBody')){
            const id = parseInt(id_);
            const position = entityContainer.component('DynamicBody')[id].body.getPosition();
            if(!position) continue;

            //if we are outside the chunk we should be stored in another chunk
            if(position.y > entityContainer.mRect.y)
            {   
                console.log('TRANSITION.')
                //changing entity container         
                const entity = new Entity(entityContainer, id);
                entity.switchContainer((entityContainer as Chunk).next.top)
                //changing current pixi.container aka chunk
                if(entity.component('Sprite')){
                    (entityContainer as Chunk).removeChild(entity.component('Sprite'));
                    (entityContainer as Chunk).next.top.addChild(entity.component('Sprite'));
                }
            } 
            if(position.y <= entityContainer.mRect.y - entityContainer.mRect.height){
                console.log('TRANSITION.')
                const entity = new Entity(entityContainer, id);
                entity.switchContainer((entityContainer as Chunk).next.down);
                if(entity.component('Sprite')){
                    (entityContainer as Chunk).removeChild(entity.component('Sprite'));
                    (entityContainer as Chunk).next.down.addChild(entity.component('Sprite'));
                }
            }
            if(position.x <= entityContainer.mRect.left){
                console.log('TRANSITION.')
                const entity = new Entity(entityContainer, id);
                entity.switchContainer((entityContainer as Chunk).next.left)
                if(entity.component('Sprite')){
                    (entityContainer as Chunk).removeChild(entity.component('Sprite'));
                    (entityContainer as Chunk).next.left.addChild(entity.component('Sprite'));
                }
            }
            if(position.x >= entityContainer.mRect.right){
                console.log('TRANSITION.')
                const entity = new Entity(entityContainer, id);
                entity.switchContainer((entityContainer as Chunk).next.right)
                if(entity.component('Sprite')){
                    (entityContainer as Chunk).removeChild(entity.component('Sprite'));
                    (entityContainer as Chunk).next.right.addChild(entity.component('Sprite'));
                }
            }
        }
    }
}