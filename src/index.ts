import * as PIXI from 'pixi.js'
import app, { startGameLoop } from './pixi/pixiapp'
import { loadResourses } from './pixi/loader'
import World from './world/World'
import viewport from './pixi/viewport'


let frameCounter = 0;

const onLoad = ()=>{
    const world = new World(1920, 1920);
    world.updateWorld(0);
    app.ticker.start();
    startGameLoop((delta: any)=>{
        console.log('update');
        world.updateWorld(delta);
        viewport.update(delta);
    })
    
    // app.ticker.add((delta)=>{
    //     frameCounter++;

    //     if(frameCounter % 2 === 0){
    //         frameCounter = 0;
    //         world.updateWorld(delta);
    //         viewport.update(delta);
    //     }
   
    //     app.render();
    // })
    // app.ticker.start();
}
loadResourses(onLoad);