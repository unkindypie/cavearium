import * as PIXI from 'pixi.js'

abstract class Entity extends PIXI.Sprite {
    public components: any;
    id: number = 0;

    constructor(texture?: PIXI.Texture){
        super(texture);
        this.components = {};
    }

    // public hasComponent(componentName: string): boolean {
    //     this.components.keys
    //     for(let i = 0; i < this.components.length; i++) {
    //         if(this.components[i].name === componentName) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }
    public addComponent(component: any) {
        this.components[component.name] = component
        return this;
    }
    public removeComponent(componentName: string) {
        delete this.components[componentName];
    }
}

export default Entity;