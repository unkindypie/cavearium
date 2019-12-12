import IComponents from './IComponent';
import {Vec2} from 'planck-js';
export default class Shiplike implements IComponents {
    public desiredAngleVector: Vec2 = Vec2();
    public moving: boolean = false;
}