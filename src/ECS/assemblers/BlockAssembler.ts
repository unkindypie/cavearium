import EntityContainer from "../EntityContainer";
import Entity from "../Entity";
import ECS from '../ecs';
import loader from '../../pixi/loader';

export default class BlockAssembler {
    public static readonly blockSize: number = 64;
    public static Assemble(entity: Entity,type: string, x: number, y: number){
        switch(type){
            case 'ground':
                entity.addComponent(new ECS.components.Position(x, y))
                    .addComponent(new ECS.components.Sprite(loader.resources['ground'].texture))
                    .addComponent(new ECS.components.Collision(BlockAssembler.blockSize, BlockAssembler.blockSize));
                entity.Sprite.width = entity.Sprite.height = BlockAssembler.blockSize;
        }
        
    }
}