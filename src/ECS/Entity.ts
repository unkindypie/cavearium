import IComponent from "./components/IComponents";
import ECS from "./ecs";
import Chunk from "../world/Chunk";

//components
import Collision from './components/Collision';
import Sprite from './components/Sprite';
import Position from './components/Position';

export default class Entity {
    public readonly id: number;
    public chunk: Chunk;

    constructor(chunk: Chunk, id?: number){
        this.chunk = chunk;
        if(!id){
            this.id = ECS.genareteEntityId();
            return;
        }
        this.id = id;
    }
    public get Position(): Position {
        return this.chunk.position_components[this.id];
    }
    public get Collision(): Collision {
        return this.chunk.collision_components[this.id];
    }
    public get Sprite(): Sprite {
        return this.chunk.sprite_components[this.id];
    }
    public addComponent(component: IComponent) {
        
        switch(component.constructor.name){
        
            case 'Position': 
                this.chunk.position_components[this.id] = component as Position;
                break;
            case 'Sprite':
                this.chunk.sprite_components[this.id] = component as Sprite;
                break;
            case 'Collision':
                this.chunk.collision_components[this.id] = component as Collision;
                break;
        }
        return this;
    }
    public removeComponent(component: IComponent) {
        
        switch(component.constructor.name){
        
            case 'Position': 
                delete this.chunk.position_components[this.id];
                break;
            case 'Sprite':
                delete this.chunk.sprite_components[this.id];
                break;
            case 'Collision':
                delete this.chunk.collision_components[this.id];
                break;
        }
        return this;
    }
}
