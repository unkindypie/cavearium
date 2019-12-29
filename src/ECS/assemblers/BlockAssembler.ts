import EntityContainer from "../EntityContainer";
import Entity from "../Entity";
import ECS from '../ecs';
import loader from '../../pixi/loader';
import WorldOptions from '../../world/WorldOptions';
import * as planck from 'planck-js';

export default class BlockAssembler {

    public static Assemble(entity: Entity, type: string, xP: number, yP: number) {
        switch (type) {
            case 'ground':
                entity
                    .addComponent(new ECS.components.Sprite(loader.resources['ground'].texture))
                    // .addComponent(new ECS.components.StaticBody(
                    //     new planck.Box(
                    //         WorldOptions.mTileSize / 2,
                    //         WorldOptions.mTileSize / 2),
                    //     xM + WorldOptions.mTileSize / 2, yM - WorldOptions.mTileSize / 2)
                    // )
                entity.component('Sprite').width = entity.component('Sprite').height = WorldOptions.pTileSize;
                entity.component('Sprite').zIndex = 1;
                entity.component('Sprite').anchor.x = entity.component('Sprite').anchor.y = 0.5;
                entity.component('Sprite').x = xP;
                entity.component('Sprite').y = yP;
                
        }

    }
}