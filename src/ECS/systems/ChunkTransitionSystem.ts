import System from "../System";
import EntityContainer from '../EntityContainer';
import Chunk from '../../world/Chunk';
import Entity from '../Entity';


export default class ChunkTransitionSystem extends System {
    public update(entityContainer: EntityContainer): void {
        // if(entityContainer.constructor.name === 'Tilemap') return;

        // for(let id_ in entityContainer.component('DynamicBody')){
        //     const id = parseInt(id_);
        //     const position = entityContainer.position_components[id];
        //     if(!position) continue;

        //     //if we are outside the chunk we should be stored in another chunk
        //     if(position.y < entityContainer.rect.y)
        //     {   
        //         //changing entity container         
        //         const entity = new Entity(entityContainer, id);
        //         entity.switchContainer((entityContainer as Chunk).next.top)
        //         //changing current pixi.container aka chunk
        //         if(entity.Sprite){
        //             (entityContainer as Chunk).removeChild(entity.Sprite);
        //             (entityContainer as Chunk).next.top.addChild(entity.Sprite);
        //         }
        //     } 
        //     if(position.y >= entityContainer.rect.bottom){
        //         const entity = new Entity(entityContainer, id);
        //         entity.switchContainer((entityContainer as Chunk).next.down);
        //         if(entity.Sprite){
        //             (entityContainer as Chunk).removeChild(entity.Sprite);
        //             (entityContainer as Chunk).next.down.addChild(entity.Sprite);
        //         }
                
        //     }
        //     if(position.x <= entityContainer.rect.left){
        //         const entity = new Entity(entityContainer, id);
        //         entity.switchContainer((entityContainer as Chunk).next.left)
        //         if(entity.Sprite){
        //             (entityContainer as Chunk).removeChild(entity.Sprite);
        //             (entityContainer as Chunk).next.left.addChild(entity.Sprite);
        //         }
        //     }
        //     if(position.x >= entityContainer.rect.right){
        //         const entity = new Entity(entityContainer, id);
        //         entity.switchContainer((entityContainer as Chunk).next.right)
        //         if(entity.Sprite){
        //             (entityContainer as Chunk).removeChild(entity.Sprite);
        //             (entityContainer as Chunk).next.right.addChild(entity.Sprite);
        //         }
        //     }
        // }
    }
}