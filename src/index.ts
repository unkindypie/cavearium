import * as PIXI from 'pixi.js'
import app, { startGameLoop } from './pixi/pixiapp'
import { loadResourses } from './pixi/loader'
import World from './world/World'
import viewport from './pixi/viewport'


let frameCounter = 0;

const onLoad = ()=>{
    const world = new World(1920, 1920);
    // const world = new World(128, 128);
    //const world = new World(1, 1);
    world.updateWorld(0);
    app.ticker.start();
    startGameLoop((delta: any)=>{
        world.updateWorld(delta);
        viewport.update(delta);
    })
}
loadResourses(onLoad);