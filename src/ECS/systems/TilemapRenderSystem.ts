import * as PIXI from 'pixi.js'
import System from '../System';
import Entity from '../Entity'
import Tilemap from '../../world/Tilemap'
import viewport from '../../pixi/viewport';
import Sprite from '../components/Sprite';

export default class TilemapRenderSystem extends System {
    //culling system
    public update(tilemap: Tilemap): void {
        const bounds = viewport.getVisibleBounds();

        let beginY = bounds.y - tilemap.rect.y;
        let endY = bounds.y + bounds.height - tilemap.rect.y;

        if(beginY < 0) beginY = 0;
        if(endY > tilemap.rect.bottom) endY = tilemap.rect.bottom;

        let beginX = bounds.x - tilemap.rect.x;
        let endX = bounds.x + bounds.width - tilemap.rect.x

        if(beginX < 0) beginX = 0;
        if(endX > tilemap.rect.right) endX = tilemap.rect.right;

        
        for(let i = 0; i < Tilemap.size; i++){
            if(!tilemap.map[i]) continue;
            for(let j = 0; j < Tilemap.size; j++){
                //if entity's id is -1 entity doesn't exist
                if(!tilemap.map[i][j]) continue;
                
                //getting entity from tilemap
                const entity = new Entity(tilemap, tilemap.map[i][j]);

                if(!entity.Sprite) continue;

                entity.Sprite.visible = i >= beginY && i <= endY && j >= beginX && j <= endX;
            }
        }
    }
}