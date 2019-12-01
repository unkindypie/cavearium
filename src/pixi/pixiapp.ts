import * as PIXI from 'pixi.js'
//to make pixi do not print his hello message
PIXI.utils.skipHello();

// const app = new PIXI.Application({
//     resolution: 1,
//     width: document.documentElement.clientWidth,
//     height: document.documentElement.clientHeight,
//     //запрещаю рендеру начинать рендерить самовольно
//     autoStart: false    
// });
// document.body.appendChild(app.view);

const app = {
    ticker: PIXI.Ticker.shared,
    renderer: new PIXI.Renderer({ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight, backgroundColor: 0x000 }),
    stage: new PIXI.Container(),
    loader: new PIXI.Loader()
};
document.body.appendChild(app.renderer.view);   

export const startGameLoop = (updateCallback: CallableFunction)=>{
    const fps = 30 / 1000;
    let frameCount = 1;
    let oldTime = Date.now();
    let lastDelta = 0;
    const gameLoop = ()=> {
        frameCount++;
        const curTime = Date.now();
        const delta = curTime - oldTime;
        oldTime = curTime;
        
        if(frameCount % 2 === 0){
            console.log(lastDelta);
            updateCallback(lastDelta * fps); //updates work on 30fps
        }
        else{
            lastDelta = delta;
        }
       
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