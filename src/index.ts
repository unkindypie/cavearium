import * as PIXI from 'pixi.js'
import app from './pixi/pixiapp'
import { loadResourses } from './pixi/loader'
import Block from './entities/Block'
import World from './world/World'
import viewport from './pixi/viewport'


const onLoad = ()=>{
    const world = new World(1700, 1700);

    app.ticker.add(()=>{
        world.updateWorld();
    })
}
loadResourses(onLoad);