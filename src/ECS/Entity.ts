export default class Entity {
    public components: any;
    public readonly id: number;

    constructor(){
        this.components = {};
        this.id = Math.random() * 1000;
    }
    public addComponent(component: any) {
        this.components[component.name] = component
        return this;
    }
    public removeComponent(componentName: string) {
        delete this.components[componentName];
    }
}

