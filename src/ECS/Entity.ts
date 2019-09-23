import IComponent from "./components/IComponent";
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
