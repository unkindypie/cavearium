import * as PIXI from 'pixi.js';
import viewport from '../pixi/viewport';
import app from '../pixi/pixiapp';

class InputManager {
    public screenPointer: PIXI.Point;
    public viewportPointer: PIXI.Point;

    public keyboardLayout = {
        forward: 'w',
        backward: 'd'
    }
    public actions = {forward: false}

    constructor(){
        this.screenPointer = new PIXI.Point(0, 0);
        this.viewportPointer = new PIXI.Point(0, 0);
        
        window.onmousemove = (e: any)=>{
            this.screenPointer.x = e.x != undefined ? e.x : 0;
            this.screenPointer.y = e.y != undefined ? e.y : 0;
            this.viewportPointer = viewport.toWorld(this.screenPointer);
        }
    }
}

const inputManager = new InputManager();

window.onkeydown = (e: any)=>{
    if(e.key === inputManager.keyboardLayout.forward || e.key === inputManager.keyboardLayout.forward.toUpperCase()){
        inputManager.actions.forward = true;
    }
}
window.onkeyup = (e: any)=>{
    if(e.key == inputManager.keyboardLayout.forward){
        inputManager.actions.forward = false;
    }
}
export default inputManager;