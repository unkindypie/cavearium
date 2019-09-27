
class InputManager {
    public pointerPosition: any;
    public keyboardLayout = {
        forward: 'w',
        backward: 'd'
    }
    public actions = {forward: false}

    constructor(){
        window.onkeydown = (e: any)=>{
            if(e.key == this.keyboardLayout.forward){
                this.actions.forward = true;
            }
        }
        window.onkeyup = (e: any)=>{
            if(e.key == this.keyboardLayout.forward){
                this.actions.forward = false;
            }
        }
    }
}

const inputManager = new InputManager();

export default inputManager;