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
        for(let i = Math.round(((position.y - size.height/2 - tilemap.rect.top)) / BlockAssembler.blockSize); 
            i < Math.round(((position.y - tilemap.rect.top + size.height / 2)) / BlockAssembler.blockSize); i++){
            for(let j = Math.round(((position.x - size.width/2 - tilemap.rect.left)) / BlockAssembler.blockSize);
                 j < Math.round(((position.x - tilemap.rect.left + size.width/2)) / BlockAssembler.blockSize);j++ ){     
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

                    //TODO: проверка не по наличию тайла с коллизиями, а по пересечению его ректа ректом сущности
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
                    if(entityContainer.collision_components[id]){
                        //console.log(entityContainer.sprite_components[id].getBounds());
                    }  
  
                }
            }
            
        }
    }
    
}