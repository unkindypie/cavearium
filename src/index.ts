import * as PIXI from 'pixi.js'
import app from './pixi/pixiapp'
import { loadResourses } from './pixi/loader'
import Block from './entities/Block'
import World from './world/World'

// import OpenSimplexNoise from "../node_modules/open-simplex-noise/lib/index";
// const noise = new OpenSimplexNoise(14514145);

// for(let i = 0; i < 100; i+=0.01){
//     console.log(noise.noise2D(i, i));
// }

const onLoad = ()=>{
    const g = new PIXI.Graphics();
    // let blocks: Block[][] = [];
    // blocks[0] = [];

    // blocks[0][0] = new Block('ground', 100, 100);

    // app.stage.addChild(g);
    // app.stage.addChild(blocks[0][0]);

    const world = new World();
    console.log(world);

    app.ticker.add(()=>{
        // g.beginFill(0xDE3249);
        // g.drawRect(random.int(0, app.view.width), random.int(0, app.view.height), 50, 50);
        // g.endFill();
    })
}
loadResourses(onLoad);