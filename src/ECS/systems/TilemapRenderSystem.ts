import * as PIXI from 'pixi.js'
import System from '../System';
import Entity from '../Entity'
import Tilemap from '../../world/Tilemap'
import viewport from '../../pixi/viewport';
import Sprite from '../components/Sprite';
import EntityContainer from '../EntityContainer';
import ECS from '../ecs'

export default class TilemapRenderSystem extends System {
    //culling system
    public update(container: EntityContainer): void {

        //if it's chunk or whatever go to it's child
        if(container.constructor.name != 'Tilemap'){
            if(container.child != null) this.update(container.child);
            return;
        }
        //this system only works with tilemap
        const tilemap = container as Tilemap;

        const bounds = viewport.getVisibleBounds();
        bounds.x -= ECS.assemblers.BlockAssembler.blockSize;
        bounds.y -= ECS.assemblers.BlockAssembler.blockSize;
        bounds.width += ECS.assemblers.BlockAssembler.blockSize;
        bounds.height += ECS.assemblers.BlockAssembler.blockSize;

        let beginY = bounds.y - tilemap.rect.y;
        let endY = bounds.y + bounds.height - tilemap.rect.y;

        if(beginY < 0) beginY = 0;
        if(endY > tilemap.rect.bottom) endY = tilemap.rect.bottom;

        let beginX = bounds.x - tilemap.rect.x;
        let endX = bounds.x + bounds.width - tilemap.rect.x

        if(beginX < 0) beginX = 0;
        if(endX > tilemap.rect.right) endX = tilemap.rect.right;
        
        beginX = (beginX / ECS.assemblers.BlockAssembler.blockSize) ^ 0;
        endX = (endX / ECS.assemblers.BlockAssembler.blockSize) ^ 0;
        beginY = (beginY / ECS.assemblers.BlockAssembler.blockSize) ^ 0;
        endY = (endY / ECS.assemblers.BlockAssembler.blockSize) ^ 0;
        
        const tilemapHeight = tilemap.rect.height/ECS.assemblers.BlockAssembler.blockSize;
        const tilemapWidth = tilemap.rect.width/ECS.assemblers.BlockAssembler.blockSize;

        const block = new Entity(tilemap);
        for(let i = 0; i < tilemapHeight; i++){
            if(!tilemap.map[i]) continue;
            for(let j = 0; j < tilemapWidth; j++){
                //if entity's id is -1 entity doesn't exist
                if(!tilemap.map[i][j]) continue;
                
                //getting entity from tilemap
                block.id = tilemap.map[i][j];
                if(!block.Sprite) continue;
                //changing it's visibility
                block.Sprite.visible = i >= beginY && i <= endY && j >= beginX && j <= endX;
            }
        }
    }
}