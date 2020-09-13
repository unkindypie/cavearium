import * as PIXI from 'pixi.js'
//to make pixi do not print his hello message
PIXI.utils.skipHello();


const app = {
    ticker: PIXI.Ticker.shared,
    renderer: new PIXI.Renderer({ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight, backgroundColor: 0x000 }),
    stage: new PIXI.Container(),
    loader: new PIXI.Loader()
};
app.renderer.view.className = 'app__view'

document.body.appendChild(app.renderer.view);


export const startGameLoop = (updateCallback: CallableFunction)=>{
    const fps = 30 / 1000; //30 coz logic runs on frameCount % 2 of the fps
    let frameCount = 1;
    let oldTime = Date.now();
    let lastDelta = 0;
    const gameLoop = ()=> {
        frameCount++;
        const curTime = Date.now();
        const delta = curTime - oldTime;
        oldTime = curTime;
     
        updateCallback(lastDelta);
        // if(frameCount % 2 === 0){
        //     updateCallback(lastDelta * fps); //updates work on 30fps
        // }
        // else{
        //     lastDelta = delta;
        // }
       
        app.renderer.render(app.stage); //render
        if(frameCount >= 60){
            frameCount = 1
        }
       
        requestAnimationFrame(gameLoop);
    }
  
    //this will start game loop
    requestAnimationFrame(gameLoop);
}

export default app;