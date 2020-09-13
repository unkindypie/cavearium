import * as planck from 'planck-js';
import * as createNdarray from 'ndarray-pack';
import * as decompose from 'bitmap-to-boxes';

import { b2World } from '../../world/World';
import IComponent from './IComponent';
import WorldOptions from '../../world/WorldOptions';
import Tilemap from '../../world/Tilemap';
import CompoundStaticBodyMember from './CompoundStaticBodyMember';
import Entity from '../Entity';

export type SubBody = {
    includedEntities: Array<Array<number>>;
    shape: planck.PolygonShape;
    fixture?: null | planck.Fixture;
}

export default class CompoundStaticBody implements IComponent {
    public body: planck.Body;
    created: Boolean = false;
    x: number;
    y: number;
    subbodies: Array<SubBody> = [];

    constructor(matrix: number[][], xM: number, yM: number) {
        this.x = xM;
        this.y = yM;

        this.subbodies = CompoundStaticBody.decompose(matrix);
    }

    /**
     * Removes block and recreates body. Warning: completely
     * deletes entity from tilemap
     * @param tilemap 
     * @param block 
     * @param x tilemap.map index
     * @param y tilemap.map index
     */
    public removeBlock(tilemap: Tilemap, block: Entity, x: number, y: number) {
        //debugger;
        const member = block.component('CompoundStaticBodyMember') as CompoundStaticBodyMember;
        if(!member?.subbody) return;

        block.delete();
        console.log(member.subbody.includedEntities);
        const subs = CompoundStaticBody.
            decompose(member.subbody.includedEntities);
        console.log(subs);
        this.subbodies = [...this.subbodies.filter(
            s => s !== member.subbody
        ), ...subs];
        
        this.destroyBody();
        this.createBody();
        
        subs.forEach(s => {
            this.initMember(s, tilemap.component('CompoundStaticBodyMember'))
        })
    }

    // decomposes matrix into the fewest number of shapes for
    // performance reasons
    private static decompose(tilemapMatrix: number[][]): Array<SubBody> {
        const matrix = tilemapMatrix.map(row => row.map(n => n === -1 || n === undefined ? 0 : 1));
        console.log(matrix);
        if(matrix.length === 0) return;
        const ndarray = createNdarray(matrix);
        const parts = decompose(ndarray, true);

        const subbodies = [];
        console.log('tilemap: ');
        for(let part of parts) {
            console.log('part');
            const x1Ind = part[0][0];
            const y1Ind = part[0][1];
    
            const x2Ind = (part[1][0] - 1);
            const y2Ind = (part[1][1] - 1);

            // calculating box2d shape
            const x1 = x1Ind * WorldOptions.mTileSize;
            const y1 = y1Ind * WorldOptions.mTileSize;
            const x2 = x2Ind * WorldOptions.mTileSize;
            const y2 = y2Ind * WorldOptions.mTileSize;
            
            const halfWidth = (x2 - x1)/2;
            const halfHeight = (y2 - y1)/2;

            const shape = planck.Box(
                halfWidth,
                halfHeight,
                planck.Vec2(x1 + halfWidth, -(y1 + halfHeight))
            );
            const subBody: SubBody = {shape, includedEntities: []}
            // referencing all the entities(tiles) in this shape
            // and creating smaller tilemap for every part
            for(let i = y1Ind; i <= y2Ind; i++) {
                subBody.includedEntities[i] = [];
                for(let j = 0; j <= x2Ind; j++) {
                    if(j >= x1Ind) {
                        subBody.includedEntities[i][j] = tilemapMatrix[i][j];
                    }
                    else {
                        subBody.includedEntities[i][j] = -1;
                    }
                }
            }
            // console.log(x1Ind, x2Ind, y1Ind, y2Ind);
            // console.log(subBody.includedEntities);
            // console.log(shape.m_vertices);

            subbodies.push(subBody);
        }
        return subbodies;
    }

    private addTile(subbody: SubBody) {
        subbody.fixture = this.body.createFixture(subbody.shape,
            {
            density: 0.2,
            friction: 0.3,
            restitution: 1
        });
        subbody.fixture.setUserData(subbody);
    }

    public initMember(subbody: SubBody, members: CompoundStaticBodyMember[]) {
        for(let ids of subbody.includedEntities) {
            for(let _entId in ids) 
            {   
                const entId = ids[Number(_entId)];
                members[entId].subbody = subbody;
                //console.log(members[entId])
            }
        }
    }

    public initMembers(tilemap: Tilemap) {
        const members = tilemap.component('CompoundStaticBodyMember') as CompoundStaticBodyMember[];
        //debugger;
        
        this.subbodies.forEach(s => {
            this.initMember(s, members);
        })
    }

    public destroyBody() {
        if (this.created) {
            b2World.destroyBody(this.body);
            this.body = null;
            this.created = false;
            this.subbodies.forEach(s => s.fixture = null);
        }
    }
    public createBody() {
        if (!this.created) {
            if(this.subbodies.length === 0) return;

            this.body = b2World.createBody({
                position: planck.Vec2(this.x, this.y),
                angle: 0,
                type: 'static'
            })

            for(let subbody of this.subbodies) {
                this.addTile(subbody);
            }
            this.created = true;
        }
    }
}