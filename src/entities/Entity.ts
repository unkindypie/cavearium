import * as PIXI from 'pixi.js'

abstract class Entity extends PIXI.Sprite {
    components: any[];
    id: number = 0;

    constructor(texture?: PIXI.Texture){
        super(texture);
        this.components = [];
    }

    public hasComponent(componentName: string): boolean {
        for(let i = 0; i < this.components.length; i++) {
            if(this.components[i].name === componentName) {
                return true;
            }
        }
        return false;
    }
    public addComponent(component: object) {
        this.components.push(component);
    }
    public removeComponent(componentName: string) {
        this.components = this.components.filter((component: any) => component.name === componentName)
    }
}

export default Entity;