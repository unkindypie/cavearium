import * as MH from '../utils/MathHelper';
export default class WorldOptions {
    public static readonly mTileSize = MH.xToWorld(64);
    public static readonly pTileSize = 64;
    public static readonly ChunkSize = 32;
    public static EMPTY_ENT_ID = -1;
}