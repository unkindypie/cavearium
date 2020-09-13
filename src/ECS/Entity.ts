import IComponent from "./components/IComponent";
import ECS from "./ecs";
import EntityContainer from './EntityContainer'

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
    public delete() {
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
        //engine needs it for situation where some entity has transit to not simulated chunk and we need to stop
        //simulation for that entity
        if(!newContainer.inSimulation){
            if(newContainer.component('DynamicBody')){
                for(let id_ in newContainer.component('DynamicBody')){
                    const id = parseInt(id_);
                    newContainer.component('DynamicBody')[id].destroyBody();
                }
            }
            if(newContainer.component('StaticBody')){
                for(let id_ in newContainer.component('StaticBody')){
                    const id = parseInt(id_);
                    newContainer.component('StaticBody')[id].destroyBody();
                }
            }
            if(newContainer.component('CompoundStaticBody')){
                for(let id_ in newContainer.component('CompoundStaticBody')){
                    const id = parseInt(id_);
                    newContainer.component('CompoundStaticBody')[id].destroyBody();
                }
            }
            
        }
        //this.removeEntity();
        this.entityContainer = newContainer;
    }
    public addComponent(component: IComponent) {
        this.entityContainer.component(component.constructor.name)[this.id] = component;
        return this;
    }

    public listComponents(): IComponent[] {
        const result: IComponent[] = [];
        this.entityContainer.tables.forEach(table => {
            if(table[this.id]) result.push(table[this.id]);
        })
        return result;
    }

    public removeComponent(component: IComponent) {
        delete this.entityContainer.component(component.constructor.name)[this.id];
        return this;
    }
}
