import * as PIXI from 'pixi.js'
import Sprite from './components/Sprite'
import Position from './components/Position'
import Collision from './components/Collision'
import Movement from './components/Movement'
import Velocity from './components/Velocity'
import Acceleration from './components/Acceleration'
import PlayerControlled from './components/PlayerControlled'


export default interface EntityContainer {
     sprite_components: Sprite[];
     position_components: Position[];
     collision_components: Collision[];
     movement_components: Movement[]; 
     acceleration_components: Acceleration[]; 
     velocity_components: Velocity[]; 
     playerControlled_components: PlayerControlled[];
     child: EntityContainer;
     rect: PIXI.Rectangle;
}