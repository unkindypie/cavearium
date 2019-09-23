import * as PIXI from 'pixi.js'
import System from '../System';
import Entity from '../Entity'
import Chunk from '../../world/Chunk'
import viewport from '../../pixi/viewport';
import Sprite from '../components/Sprite';

export default class RenderSystem extends System {
    public initalize(chunk: Chunk, entity: Entity){
        //if(chunk.)
    }
    public update(chunk: Chunk): void {
        // const bounds = viewport.getVisibleBounds();

        // let beginY = bounds.y - chunk.rect.y;
        // let endY = bounds.y + bounds.height - chunk.rect.y;

        // if(beginY < 0) beginY = 0;
        // if(endY > chunk.rect.bottom) endY = chunk.rect.bottom;

        // let beginX = bounds.x - chunk.rect.x;
        // let endX = bounds.x + bounds.width - chunk.rect.x

        // if(beginX < 0) beginX = 0;
        // if(endX > chunk.rect.right) endX = chunk.rect.right;

        // for(let i = 0; i < Chunk.chunkSize; i++){
        //     if(!chunk.static[i]) continue;
        //     for(let j = 0; j < Chunk.chunkSize; j++){
        //         if(!chunk.static[i][j]) continue;
        //         chunk.static[i][j].visible = i >= beginY && i <= endY && j >= beginX && j <= endX;
        //     }
        // }
        for(let i = 0; i < chunk.sprite_components.length; i++){
            //chunk.sprite_components[i].visible = true;
        }
    }

}