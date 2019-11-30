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

    
    const gameLoop = ()=> {
        const curTime = Date.now();
        const delta = curTime - oldTime;
        oldTime = curTime;
        updateCallback(delta / 1000);
        app.renderer.render(app.stage);
        requestAnimationFrame(gameLoop);
    }
    let oldTime = Date.now();
    //this will start game loop
    requestAnimationFrame(gameLoop);
}

export default app;