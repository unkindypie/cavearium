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
     inSimulation: boolean;
     
     initializeComponentTables: (componentTables: Array<string>)=>void;
     addComponentTable:  (componentName: string)=>void;
     component: (tableName: string) => any[];
     
     startSimulation: ()=>void;
     stopSimulation: ()=>void;
}