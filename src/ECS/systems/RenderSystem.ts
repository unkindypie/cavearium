import * as PIXI from 'pixi.js'
import System from '../System';
import Entity from '../Entity'
import Chunk from '../../world/Chunk'
import viewport from '../../pixi/viewport';
import Sprite from '../components/Sprite';
import EntityContainer from '../EntityContainer';
import DynamicBody from '../components/DynamicBody';
import * as MH from '../../utils/MathHelper';

export default class RenderSystem extends System {
    public update(container: EntityContainer): void {
        if (container.constructor.name === 'Tilemap') return;

        const bounds = viewport.getVisibleBounds();
        for(let id_ in container.component('Sprite')){
            const id = parseInt(id_);
            
            //applying body changes to sprite
            if(container.component('DynamicBody')[id]){
                //console.log('PH:', (container.component('DynamicBody')[id] as DynamicBody).body.getPosition());
                const bodyPos = MH.toScreen((container.component('DynamicBody')[id] as DynamicBody).body.getPosition());
                //console.log('S:', bodyPos);
                container.component('Sprite')[id].x = bodyPos.x;
                container.component('Sprite')[id].y = bodyPos.y;
                container.component('Sprite')[id].rotation = -container.component('DynamicBody')[id].body.getAngle();
                
            } 
            
            container.component('Sprite')[id].visible = container.component('Sprite')[id].x >= bounds.x && container.component('Sprite')[id].x <= bounds.x + bounds.width
            && container.component('Sprite')[id].y >= bounds.y && container.component('Sprite')[id].y <= bounds.y + bounds.height;
        }
    }

}