import IComponent from './IComponent';
import * as planck from 'planck-js';
//import {b2World} from '../../world/World';

export default abstract class Body implements IComponent {
    public body: planck.Body;
    public fixtureOptions: planck.FixtureOpt;
    public shape: planck.Shape;
    public position: planck.Vec2;
    public angle: number;
    public created: boolean = false;
    public abstract destroyBody(): void;
    public abstract createBody(): void;
    
}