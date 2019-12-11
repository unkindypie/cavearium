import IComponent from "./components/IComponent";
import ECS from "./ecs";
import EntityContainer from './EntityContainer'

//components
import Collision from './components/Collision';
import Sprite from './components/Sprite';
import Position from './components/Position';
import Movement from './components/Movement';
import Velocity from './components/Velocity';
import Acceleration from './components/Acceleration';
import PlayerControlled from './components/PlayerControlled';
import DymanicBody from './components/DynamicBody';
import Shiplike from './components/Shiplike';


export default class Entity {
    public id: number;
    public entityContainer: EntityContainer;

    constructor(entityContainer: EntityContainer, id?: number) {
        this.entityContainer = entityContainer;
        if (id) this.id = id;
    }
    public newId() {
        this.id = ECS.genareteEntityId();
    }
    public component(compName: string): any {
        return this.entityContainer.component(compName)[this.id];
    }
    public removeEntity() {
        //remove entitie's components for every table in that chunk
        this.entityContainer.tables.forEach((table) => {
            delete table[this.id];
        })
    }
    public switchContainer(newContainer: EntityContainer) {
        this.entityContainer.tables.forEach((table, tableName) => {
            if (table[this.id]) {
                newContainer.component(tableName)[this.id] = table[this.id];
            }
            delete table[this.id];
        })
        //this.removeEntity();
        this.entityContainer = newContainer;
    }
    public addComponent(component: IComponent) {
        this.entityContainer.component(component.constructor.name)[this.id] = component;
        
        // switch (component.constructor.name) {

        //     case 'DymanicBody':
        //         this.entityContainer.dynamicBody_components[this.id] = component as DymanicBody;
        //         break;
        //     case 'Shiplike':
        //         this.entityContainer.shiplike_components[this.id] = component as Shiplike;
        //         break;
        //     case 'Position':
        //         if (this.entityContainer.sprite_components[this.id]) {
        //             this.entityContainer.sprite_components[this.id].x = (component as Position).x;
        //             this.entityContainer.sprite_components[this.id].y = (component as Position).y;
        //         }
        //         this.entityContainer.position_components[this.id] = component as Position;
        //         break;
        //     case 'Sprite':
        //         this.entityContainer.sprite_components[this.id] = component as Sprite;
        //         if (this.entityContainer.position_components[this.id]) {
        //             this.entityContainer.sprite_components[this.id].x = this.entityContainer.position_components[this.id].x;
        //             this.entityContainer.sprite_components[this.id].y = this.entityContainer.position_components[this.id].y;
        //         }
        //         break;
        //     case 'Collision':
        //         this.entityContainer.collision_components[this.id] = component as Collision;
        //         break;
        //     case 'Movement':
        //         this.entityContainer.movement_components[this.id] = component as Movement;
        //         break;
        //     case 'Velocity':
        //         this.entityContainer.velocity_components[this.id] = component as Velocity;
        //         break;
        //     case 'Acceleration':
        //         this.entityContainer.acceleration_components[this.id] = component as Acceleration;
        //         break;
        //     case 'PlayerControlled':
        //         this.entityContainer.playerControlled_components[this.id] = component as PlayerControlled;
        //         break;

        // }
        return this;
    }
    public removeComponent(component: IComponent) {
        delete this.entityContainer.component(component.constructor.name)[this.id];
        return this;
    }
}
