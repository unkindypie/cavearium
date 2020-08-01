import * as planck from 'planck-js';
import * as createNdarray from 'ndarray-pack';
import * as decompose from 'bitmap-to-boxes';

import { b2World } from '../../world/World';
import IComponent from './IComponent';
import WorldOptions from '../../world/WorldOptions';

export default class CompoundStaticBody implements IComponent {
    //matrix: number[][];
    public body: planck.Body;
    created: Boolean = false;
    x: number;
    y: number;
    shapes: Array<planck.PolygonShape> = [];

    constructor(matrix: number[][], xM: number, yM: number) {
        this.x = xM;
        this.y = yM;

        // TODO: мб стоит делать отдельную матрицу во время генерации
        // чтобы не было этих итераций 
        this.calculateShapes(
            matrix.map(row => row.map(n => n === -1 ? 0 : 1))
            );

        
        // for(let i = 0; i < WorldOptions.ChunkSize; i++){
        //     for(let j = 0; j < WorldOptions.ChunkSize; j++){
        //         if(this.matrix[i][j] === -1)
        //             continue;
                
        //         this.shapes.push(
        //             this.createShape(
        //                 j * WorldOptions.mTileSize,
        //                 -i * WorldOptions.mTileSize
        //         ));    
        //     }
        // }
    }

    calculateShapes(matrix: number[][]) {
        if(matrix.length === 0) return;
        const ndarray = createNdarray(matrix);
        const parts = decompose(ndarray, true);

        this.shapes = [];
        for(let part of parts) {
            const x1 = part[0][0] * WorldOptions.mTileSize;
            const y1 = part[0][1] * WorldOptions.mTileSize;
        
            const x2 = (part[1][0] - 1) * WorldOptions.mTileSize;
            const y2 = (part[1][1] - 1) * WorldOptions.mTileSize;
            
            const halfWidth = (x2 - x1)/2;
            const halfHeight = (y2 - y1)/2;
            this.shapes.push(
                planck.Box(
                    halfWidth,
                    halfHeight,
                    planck.Vec2(x1 + halfWidth, -(y1 + halfHeight))
                )
            )

        }
    }

    addTile(shape: planck.PolygonShape) {
        this.body.createFixture(shape,
            {
            density: 0.2,
            friction: 0.3,
            restitution: 1
        });

    }

    createShape(xM: number, yM: number) {
        return planck.Box(
            WorldOptions.mTileSize/2,
            WorldOptions.mTileSize/2,
            planck.Vec2(xM, yM)
        );
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
            if(this.shapes.length === 0) return;

            this.body = b2World.createBody({
                position: planck.Vec2(this.x, this.y),
                angle: 0,
                type: 'static'
            })

            for(let shape of this.shapes) {
                this.addTile(shape);
            }
            this.created = true;
        }
    }
}