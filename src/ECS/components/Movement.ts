import IComponent from './IComponent';

export default class Movement implements IComponent {
    public dirX: number;
    public dirY: number;
    constructor(){
        this.dirX = 0;
        this.dirY = 0;
        
    }
}