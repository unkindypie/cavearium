import Entity from './Entity'
import EntityContainer from './EntityContainer';


export default abstract class System {
    //public abstract initalize()
    public abstract update(entityContainer: EntityContainer, delta: number): void;
}

