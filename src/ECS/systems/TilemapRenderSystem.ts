import * as PIXI from 'pixi.js'
import System from '../System';
import Entity from '../Entity'
import Tilemap from '../../world/Tilemap'
import viewport from '../../pixi/viewport';
import Sprite from '../components/Sprite';
import EntityContainer from '../EntityContainer';
import ECS from '../ecs'
import * as planck from 'planck-js';
import * as MH from '../../utils/MathHelper';
import WorldOptions from '../../world/WorldOptions';
import StaticBody from '../components/StaticBody';

export default class TilemapRenderSystem extends System {
    //culling system
    public update(container: EntityContainer): void {
        //if it's chunk or whatever go to it's child
        if (container.constructor.name !== 'Tilemap') {
            if (container.child != null) this.update(container.child);
            return;
        }
        //this system only works with tilemap
        const tilemap = container as Tilemap;

        const bounds = viewport.getVisibleBounds();
        bounds.x -= WorldOptions.pTileSize;
        bounds.y -= WorldOptions.pTileSize;
        bounds.width += WorldOptions.pTileSize;
        bounds.height += WorldOptions.pTileSize;

        let beginY = bounds.y - tilemap.pRect.y;
        let endY = bounds.y + bounds.height - tilemap.pRect.y;

        if (beginY < 0) beginY = 0;
        if (endY > tilemap.pRect.bottom) endY = tilemap.pRect.bottom;

        let beginX = bounds.x - tilemap.pRect.x;
        let endX = bounds.x + bounds.width - tilemap.pRect.x

        if (beginX < 0) beginX = 0;
        if (endX > tilemap.pRect.right) endX = tilemap.pRect.right;

        beginX = (beginX / WorldOptions.pTileSize) ^ 0;
        endX = (endX / WorldOptions.pTileSize) ^ 0;
        beginY = (beginY / WorldOptions.pTileSize) ^ 0;
        endY = (endY / WorldOptions.pTileSize) ^ 0;

        const tilemapHeight = tilemap.pRect.height / WorldOptions.pTileSize;
        const tilemapWidth = tilemap.pRect.width / WorldOptions.pTileSize;

        const block = new Entity(tilemap);
        for (let i = 0; i < tilemapHeight; i++) {
            if (!tilemap.map[i]) continue;
            for (let j = 0; j < tilemapWidth; j++) {
                //if entity's id is -1 entity doesn't exist
                if (!tilemap.map[i][j]) continue;

                //getting entity from tilemap
                block.id = tilemap.map[i][j];
                if (!block.component('Sprite')) continue;
                //changing it's visibility
                if (block.component('Sprite').visible = i >= beginY && i <= endY && j >= beginX && j <= endX) {
                    if(!block.component('StaticBody')) continue;
                    const bodyPos = MH.toScreen((block.component('StaticBody') as StaticBody).body.getPosition());
                    block.component('Sprite').x = bodyPos.x;
                    block.component('Sprite').y = bodyPos.y;
                    block.component('Sprite').rotation = block.component('StaticBody').body.getAngle();

                }
            }
        }
    }
}