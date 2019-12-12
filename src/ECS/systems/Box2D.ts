import EntityContainer from '../EntityContainer';
import { b2World } from '../../world/World'; 
import * as planck from 'planck-js';

export default class Box2D {
    public update(delta: number): void {
        (b2World as planck.World).step(1/60);        
    }
}