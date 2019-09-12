import * as PIXI from 'pixi.js'
import app from './pixi/pixiapp'
import { loadResourses } from './pixi/loader'
import Block from './entities/Block'
import World from './world/World'


const onLoad = ()=>{
    const world = new World(400, 400);
    //viewport.addChild(world);
    app.ticker.add(()=>{
        
    })
}
loadResourses(onLoad);