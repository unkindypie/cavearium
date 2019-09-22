import * as PIXI from 'pixi.js'
import app from './pixi/pixiapp'
import { loadResourses } from './pixi/loader'
import Block from './entities/Block'
import World from './world/World'
import viewport from './pixi/viewport'

import ECS from './ECS/ecs';
import Entity from './ECS/Entity'
import Chunk from './world/Chunk';
import loader from './pixi/loader'

const FPS = 60;
const frameTime = 1000/FPS;
let elapsedTime = 0;


const onLoad = ()=>{
    //const world = new World(700, 700);

    const chunk = new Chunk([[]], 0, 0);
    const block = new Entity(chunk);
    //chunk.static[0].push()

    block.addComponent(new ECS.components.Position(0, 0)).
    addComponent(new ECS.components.Sprite(loader.resources['ground'].texture));

    ECS.systems[0].update(chunk);
    
    app.ticker.add((delta)=>{
        elapsedTime += delta;
        
        if(elapsedTime >= frameTime){
            //world.updateWorld();

            
            app.render();
            elapsedTime = 0;
        }
    })
    app.ticker.start();
}
loadResourses(onLoad);