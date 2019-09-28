import IComponent from './IComponent';

export default class Velocity implements IComponent {
    public velocity: number;
    public absoluteVelocity: number;
    constructor(velocity: number){
        this.velocity = velocity;
    }
}