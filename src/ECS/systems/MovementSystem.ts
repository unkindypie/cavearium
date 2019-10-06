import System from "../System";
import Entity from '../Entity'
import EntityContainer from '../EntityContainer';
import Chunk from "../../world/Chunk";
import viewport from '../../pixi/viewport';

export default class MovementSystem extends System{

    public update(entityContainer: EntityContainer, delta: number): void {
        // if(entityContainer.child != null){
        //     this.update(entityContainer.child);
        // }
        //if(!entityContainer) return;
        if(entityContainer.constructor.name === 'Tilemap') return;

        for(let id_ in entityContainer.movement_components){
            const id = parseInt(id_);
            const position = entityContainer.position_components[id]
            if(position){
                let velocity = entityContainer.velocity_components[id].velocity;
                if(!velocity) velocity = 0;
                position.x += entityContainer.movement_components[id].dirX * velocity * delta;
                position.y += entityContainer.movement_components[id].dirY * velocity * delta;
                if(entityContainer.sprite_components[id]){
                    entityContainer.sprite_components[id].x = position.x;
                    entityContainer.sprite_components[id].y = position.y;
                   
                }
                if(entityContainer.playerControlled_components[id]){
                    //moving viewport to the player
                    viewport.moveCenter(entityContainer.position_components[id].x,  entityContainer.position_components[id].y);
                    //rotating player sprite by his moving direction
                    entityContainer.sprite_components[id].rotation = 1.5708 + Math.atan2(entityContainer.movement_components[id].dirY, entityContainer.movement_components[id].dirX);
                }

                //continue;

                //if we are outside the chunk we should be stored in another chunk
                //TODO: будет работать коряво когда сделаю проверку коллизий, т.к. я могу быть половиной спрайта в одном чанке, половиной в другом
                //при этом в одном из чанков коллизии обрабатываться не будут
                if(position.y < entityContainer.rect.y)
                {   
                    //changing entity container         
                    const entity = new Entity(entityContainer, id);
                    entity.switchContainer((entityContainer as Chunk).next.top)
                    //changing current pixi.container aka chunk
                    if(entity.Sprite){
                        (entityContainer as Chunk).removeChild(entity.Sprite);
                        (entityContainer as Chunk).next.top.addChild(entity.Sprite);
                    }
                } 
                if(position.y >= entityContainer.rect.bottom){
                    const entity = new Entity(entityContainer, id);
                    entity.switchContainer((entityContainer as Chunk).next.down);
                    if(entity.Sprite){
                        (entityContainer as Chunk).removeChild(entity.Sprite);
                        (entityContainer as Chunk).next.down.addChild(entity.Sprite);
                    }
                    
                }
                if(position.x <= entityContainer.rect.left){
                    const entity = new Entity(entityContainer, id);
                    entity.switchContainer((entityContainer as Chunk).next.left)
                    if(entity.Sprite){
                        (entityContainer as Chunk).removeChild(entity.Sprite);
                        (entityContainer as Chunk).next.left.addChild(entity.Sprite);
                    }
                }
                if(position.x >= entityContainer.rect.right){
                    //const entity = new Entity(entityContainer, Number.parseInt(id));
                    const entity = new Entity(entityContainer, id);
                    entity.switchContainer((entityContainer as Chunk).next.right)
                    if(entity.Sprite){
                        (entityContainer as Chunk).removeChild(entity.Sprite);
                        (entityContainer as Chunk).next.right.addChild(entity.Sprite);
                    }
                }
            }
            
        }
    }
    
}