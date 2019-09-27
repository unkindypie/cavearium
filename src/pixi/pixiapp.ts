import * as PIXI from 'pixi.js'
//to make pixi do not print his hello message
PIXI.utils.skipHello();

const app = new PIXI.Application({
    resolution: 1,
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    //запрещаю рендеру начинать рендерить самовольно
    autoStart: false
});

document.body.appendChild(app.view);


export default app;