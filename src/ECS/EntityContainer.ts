import * as PIXI from 'pixi.js'
import Sprite from './components/Sprite'
import Position from './components/Position'
import Collision from './components/Collision'
import Movement from './components/Movement'
import Velocity from './components/Velocity'
import Acceleration from './components/Acceleration'
import PlayerControlled from './components/PlayerControlled'
import DymanicBody from './components/DynamicBody';
import Shiplike from './components/Shiplike';
import IComponents from './components/IComponent';

export default interface EntityContainer {
     tables: Map<string, any[]>;
     // sprite_components: Sprite[];
     // position_components: Position[];
     // collision_components: Collision[];
     // movement_components: Movement[]; 
     // acceleration_components: Acceleration[]; 
     // velocity_components: Velocity[]; 
     // playerControlled_components: PlayerControlled[];
     // dynamicBody_components: DymanicBody[];
     // shiplike_components: Shiplike[];
     child: EntityContainer;
     rect: PIXI.Rectangle;
     
     initializeComponentTables: Function;
     addComponentTable: Function;
     component: Function;
}