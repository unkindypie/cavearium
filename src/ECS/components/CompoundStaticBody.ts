import * as planck from 'planck-js';
import { b2World } from '../../world/World';
import IComponent from './IComponent';
import WorldOptions from '../../world/WorldOptions';

export default class CompoundStaticBody implements IComponent {
    matrix: number[][];
    public body: planck.Body;
    created: Boolean = false;
    x: number;
    y: number;
    constructor(matrix: number[][], xM: number, yM: number) {
        this.matrix = matrix;
        this.x = xM;
        this.y = yM;
       
        
    }
    addTile(xM: number, yM: number) {
        this.body.createFixture(planck.Box(WorldOptions.mTileSize/2, WorldOptions.mTileSize/2, planck.Vec2(xM, yM)),
            {
                density: 0.2,
                friction: 0.3,
                restitution: 1
            });

    }

    public destroyBody() {
        if (this.created) {
            b2World.destroyBody(this.body);
            this.body = null;
            this.created = false;
        }
    }
    public createBody() {
        if (!this.created) {
            this.body = b2World.createBody({
                position: planck.Vec2(this.x, this.y),
                angle: 0,
                type: 'static'
            })

            for(let i = 0; i < WorldOptions.ChunkSize; i++){
                for(let j = 0; j < WorldOptions.ChunkSize; j++){
 
                    if(this.matrix[i][j] === -1)
                        continue
                    this.addTile(j * WorldOptions.mTileSize, -i * WorldOptions.mTileSize);
                    
                }
            }
            this.created = true;
        }
    }
}