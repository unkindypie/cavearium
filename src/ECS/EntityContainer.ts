import * as PIXI from 'pixi.js'
import Sprite from './components/Sprite'
import PlayerControlled from './components/PlayerControlled'
import DymanicBody from './components/DynamicBody';
import Shiplike from './components/Shiplike';
import IComponents from './components/IComponent';

export default interface EntityContainer {
     tables: Map<string, any[]>;
     
     child: EntityContainer;
     pRect: PIXI.Rectangle;
     mRect: PIXI.Rectangle;
     
     initializeComponentTables: Function;
     addComponentTable: Function;
     component: Function;
}