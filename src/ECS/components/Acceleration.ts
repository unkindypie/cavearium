import IComponent from './IComponent';

export default class Acceleration implements IComponent {
    public a: number = 0;
    public max: number;
    public min: number;
    constructor(max: number, min: number){
        this.max = max;
        this.min = min;
    }
}