import Entity from '../entities/Entity'

export default abstract class System {
    abstract update(entity: Entity): void;
}

