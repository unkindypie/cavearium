import IComponent from "./components/IComponents";
import ECS from "./ecs";
import EntityContainer from './EntityContainer'

//components
import Collision from './components/Collision';
import Sprite from './components/Sprite';
import Position from './components/Position';

export default class Entity {
    public id: number;
    public entityContainer: EntityContainer;

    constructor(entityContainer: EntityContainer, id?: number){
        this.entityContainer = entityContainer;
        if(!id){
            this.id = ECS.genareteEntityId();
            return;
        }
        this.id = id;
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
    public addComponent(component: IComponent) {
        
        switch(component.constructor.name){
        
            case 'Position': 
                this.entityContainer.position_components[this.id] = component as Position;
                break;
            case 'Sprite':
                this.entityContainer.sprite_components[this.id] = component as Sprite;
                break;
            case 'Collision':
                this.entityContainer.collision_components[this.id] = component as Collision;
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
        }
        return this;
    }
}
