import * as PIXI from 'pixi.js'
import System from '../System';
import Entity from '../Entity'
import Chunk from '../../world/Chunk'
import viewport from '../../pixi/viewport';
import Sprite from '../components/Sprite';
import EntityContainer from '../EntityContainer';

export default class RenderSystem extends System {
    public update(container: EntityContainer): void {
        const bounds = viewport.getVisibleBounds();
        for(let i in container.sprite_components){
            container.sprite_components[i].visible = container.sprite_components[i].x >= bounds.x && container.sprite_components[i].x <= bounds.x + bounds.width
            && container.sprite_components[i].y >= bounds.y && container.sprite_components[i].y <= bounds.y + bounds.height;
        }
    }

}