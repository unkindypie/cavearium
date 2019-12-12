import Body from './Body';
import * as planck from 'planck-js';
import {b2World} from '../../world/World';

export default class DynamicBody extends Body {
    public linearVelocity: planck.Vec2 = planck.Vec2();
    public angularVelocity: number = 0;
    public massData: planck.MassData;

    /*
        xM - value in meters(box2d metric system)
    */
    constructor(shape: planck.Shape, xM: number, yM: number){
        super();
        this.shape = shape;
        this.position = planck.Vec2(xM, yM);
        this.massData = {
            mass: 1,
            center: planck.Vec2(),
            I: 1
        };
        this.angle = 0;

        this.fixtureOptions = {
            density: 0.2,
            friction: 0.3,
            restitution: 1
        }
    }

    public destroyBody(): void {
        if(!this.created) return;
        console.log('Body is destroyed.')
        this.position = this.body.getPosition();
        this.angle = this.body.getAngle();
        this.linearVelocity = this.body.getLinearVelocity();
        this.angularVelocity = this.body.getAngularVelocity();

        b2World.destroyBody(this.body);
        this.created = false;
    } 

    public createBody(): void {
        if(this.created) return;
        console.log('Body is created.')
        this.body = b2World.createDynamicBody({
            position: this.position,
            angle: this.angle,
            angularVelocity: this.angularVelocity,
            linearVelocity: this.linearVelocity
        })
        this.body.createFixture(this.shape, this.fixtureOptions);
        this.body.setMassData(this.massData);
        this.created = true;
    }

    

}