import * as PIXI from 'pixi.js'
import app from './pixi/pixiapp'
import { loadResourses } from './pixi/loader'
import World from './world/World'
import viewport from './pixi/viewport'

const FPS = 60;
const frameTime = 1000/FPS;
let elapsedTime = 0;


const onLoad = ()=>{
    const world = new World(1280, 1280);
    
    app.ticker.add((delta)=>{
        elapsedTime += delta;
        
        //if(elapsedTime >= frameTime){
            world.updateWorld();

            
            app.render();
            elapsedTime = 0;
        //}
    })
    app.ticker.start();
}
loadResourses(onLoad);