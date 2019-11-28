import System from "../System";
import Entity from '../Entity'
import EntityContainer from '../EntityContainer';
import Chunk from "../../world/Chunk";
import Tilemap from '../../world/Tilemap';
import viewport from '../../pixi/viewport';
import Position from '../components/Position';
import Collision from '../components/Collision';
import BlockAssembler from '../assemblers/BlockAssembler';

export default class MovementSystem extends System{
    //translates entity's sprite to every crossed tile possitons in tilemap matrix
    private doesCollideWithTilemap(position: Position, size: Collision, chunk: Chunk, nested: boolean = false): boolean {
        const tilemap = chunk.tilemap;
        for(let i = ((((position.y - tilemap.rect.top) ^ 0) / BlockAssembler.blockSize)^0) - 1; 
            i < Math.floor(((position.y - tilemap.rect.top + size.height) ^ 0) / BlockAssembler.blockSize) - 1; i++){
            for(let j = ((((position.x - tilemap.rect.left) ^ 0) / BlockAssembler.blockSize) ^ 0) - 1;
                 j < Math.floor(((position.x - tilemap.rect.left + size.width) ^ 0) / BlockAssembler.blockSize) - 1;j++ ){     
                    //recursive check for nearby chunks if they are crossed
                    if(!nested){
                        if(i < 0 && this.doesCollideWithTilemap(position, size, chunk.next.top, true)){
                            return true;
                        }
                        if(i >= Chunk.chunkSize && this.doesCollideWithTilemap(position, size, chunk.next.down, true)){
                            return true;
                        }
                        if(j < 0 && Chunk.chunkSize && this.doesCollideWithTilemap(position, size, chunk.next.left, true)){
                            return true;
                        }
                        if(j >= Chunk.chunkSize && this.doesCollideWithTilemap(position, size, chunk.next.right, true)){
                            return true;
                        } 
                        //TODO: проверка на коллизии с угловыми чанками, если таковые пересечены
                        
                    } 
                    //handling out of marix in case entity not collide with tiles in nearby chunks or we are in nested call and we should't check for other chunks
                    if(i < 0 || j < 0 || i >= Chunk.chunkSize || j >= Chunk.chunkSize){
                        continue;
                    }

                    if(tilemap.isTileCollidable(j, i)){
                        //console.log('collision', nested);
                        return true;
                    }
                 }
        }

        return false;
    }

    public update(entityContainer: EntityContainer, delta: number): void {
        if(entityContainer.constructor.name === 'Tilemap') return;

        for(let id_ in entityContainer.movement_components){
            const id = parseInt(id_);
            const position = entityContainer.position_components[id]
            if(position){
                let velocity = entityContainer.velocity_components[id].velocity;
                if(!velocity) velocity = 0;
                //moving current entity position
                let offsetX;
                let offsetY; 
                position.x += offsetX = entityContainer.movement_components[id].dirX * velocity * delta;
                position.y += offsetY = entityContainer.movement_components[id].dirY * velocity * delta;

                if(entityContainer.collision_components[id] && this.doesCollideWithTilemap(position, entityContainer.collision_components[id], entityContainer as Chunk)){
                    position.x -= offsetX;
                    position.y -= offsetY;
                }

                if(entityContainer.sprite_components[id]){
                    entityContainer.sprite_components[id].x = position.x;
                    entityContainer.sprite_components[id].y = position.y;  
                }
                //if we are a player we should move the camera
                //TODO: пихнуть в отдельную систему и камеру и крутилку
                if(entityContainer.playerControlled_components[id]){
                    //moving viewport to the player
                    viewport.moveCenter(entityContainer.position_components[id].x,  entityContainer.position_components[id].y);
                    //rotating player sprite by his moving direction
                    entityContainer.sprite_components[id].rotation = 1.5708 + Math.atan2(entityContainer.movement_components[id].dirY, entityContainer.movement_components[id].dirX);
                }

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