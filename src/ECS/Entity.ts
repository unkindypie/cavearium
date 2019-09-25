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

export default class Entity {
    public id: number;
    public entityContainer: EntityContainer;

    constructor(entityContainer: EntityContainer, id?: number){
        this.entityContainer = entityContainer;
        if(id) this.id = id;
    }
    public newId(){
        this.id = ECS.genareteEntityId();
    }
    public get Position(): Position {
        return this.entityContainer.position_components[this.id];
    }
    public get Collision(): Collision {
        return this.entityContainer.collision_components[this.id];
    }
    public get Sprite(): Sprite {
        return this.entityContainer.sprite_components[this.id];
    }
    public get Movement(): Movement {
        return this.entityContainer.movement_components[this.id];
    }
    public get Velocity(): Velocity {
        return this.entityContainer.velocity_components[this.id];
    }
    public get Acceleration(): Acceleration {
        return this.entityContainer.acceleration_components[this.id];
    }
    public get PlayerControlled(): PlayerControlled {
        return this.entityContainer.playerControlled_components[this.id];
    }
    public removeEntity(){
        delete this.entityContainer.collision_components[this.id];
        delete this.entityContainer.sprite_components[this.id];
        delete this.entityContainer.position_components[this.id];
        delete this.entityContainer.velocity_components[this.id];
        delete this.entityContainer.acceleration_components[this.id];
        delete this.entityContainer.playerControlled_components[this.id];
        delete this.entityContainer.movement_components[this.id];
    }
    public switchContainer(newConrainer: EntityContainer){
        newConrainer.acceleration_components[this.id] = this.entityContainer.acceleration_components[this.id];
        newConrainer.collision_components[this.id] = this.entityContainer.collision_components[this.id];
        newConrainer.sprite_components[this.id] = this.entityContainer.sprite_components[this.id];
        newConrainer.position_components[this.id] = this.entityContainer.position_components[this.id];
        newConrainer.velocity_components[this.id] = this.entityContainer.velocity_components[this.id];
        newConrainer.playerControlled_components[this.id] = this.entityContainer.playerControlled_components[this.id];
        newConrainer.movement_components[this.id] = this.entityContainer.movement_components[this.id];
        this.removeEntity();
        this.entityContainer = newConrainer;
    }
    public addComponent(component: IComponent) {
        
        switch(component.constructor.name){
        
            case 'Position':
                if(this.entityContainer.sprite_components[this.id]){
                    this.entityContainer.sprite_components[this.id].x = (component as Position).x;
                    this.entityContainer.sprite_components[this.id].y = (component as Position).y;
                } 
                this.entityContainer.position_components[this.id] = component as Position;
                break;
            case 'Sprite':
                this.entityContainer.sprite_components[this.id] = component as Sprite;
                if(this.entityContainer.position_components[this.id]){
                    this.entityContainer.sprite_components[this.id].x = this.entityContainer.position_components[this.id].x;
                    this.entityContainer.sprite_components[this.id].y = this.entityContainer.position_components[this.id].y;
                }
                break;
            case 'Collision':
                this.entityContainer.collision_components[this.id] = component as Collision;
                break;
            case 'Movement':
                this.entityContainer.movement_components[this.id] = component as Movement;
                break;
            case 'Velocity':
                this.entityContainer.velocity_components[this.id] = component as Velocity;
                break;
            case 'Acceleration':
                this.entityContainer.acceleration_components[this.id] = component as Acceleration;
                break;
            case 'PlayerControlled':
                this.entityContainer.playerControlled_components[this.id] = component as PlayerControlled;
                break;    
            
        }
        return this;
    }
    public removeComponent(component: IComponent) {
        
        switch(component.constructor.name){
        
            case 'Position': 
                delete this.entityContainer.position_components[this.id];
                break;
            case 'Sprite':
                delete this.entityContainer.sprite_components[this.id];
                break;
            case 'Collision':
                delete this.entityContainer.collision_components[this.id];
                break;
            case 'Movement':
                delete this.entityContainer.movement_components[this.id];
                break;
            case 'Velocity':
                delete this.entityContainer.velocity_components[this.id];
                break;
            case 'Acceleration':
                delete this.entityContainer.acceleration_components[this.id];
                break;
            case 'PlayerControlled':
                delete this.entityContainer.playerControlled_components[this.id];
                break;    
        }
        return this;
    }
}
