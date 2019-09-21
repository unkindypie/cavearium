import Entity from './Entity'
import Chunk from '../world/Chunk'

export default abstract class System {
    public abstract update(chunk: Chunk): void;
}

