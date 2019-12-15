import Body from './Body';
import * as planck from 'planck-js';
import {b2World} from '../../world/World';

export default class StaticBody extends Body {
    constructor(shape: planck.Shape, xM: number, yM: number){
        super();
        this.shape = shape;
        this.position = planck.Vec2(xM, yM);
        this.angle = 0;
        this.fixtureOptions = {
            density: 0.2,
            friction: 0.3,
            restitution: 1
        }
    }
    public destroyBody(){
        if(this.created){
            //TODO: сдлеать тела, координаты которых нельзя менять, чтобы не было этих двух строк
            this.position = this.position;
            this.angle = this.angle;

            b2World.destroyBody(this.body);
            this.body = null;

            this.created = false;
        }
    }
    public createBody(){
        if(!this.created){
            this.body = b2World.createBody({
                position: this.position,
                angle: this.angle,
                type: 'static'
            })
        
            this.body.createFixture(this.shape, this.fixtureOptions);
            this.created = true;
        }
    }
}