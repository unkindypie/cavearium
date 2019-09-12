import * as PIXI from 'pixi.js'
const app = new PIXI.Application({
    resolution: 1,
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
});


document.body.appendChild(app.view);


export default app;