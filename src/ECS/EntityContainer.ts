import ECS from './ecs'
import Sprite from './components/Sprite'
import Position from './components/Position'
import Collision from './components/Collision'
import Entity from './Entity';

export default interface EntityContainer {
     sprite_components: Sprite[];
     position_components: Position[];
     collision_components: Collision[];
}