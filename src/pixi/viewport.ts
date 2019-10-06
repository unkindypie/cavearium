import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import app from './pixiapp'

const viewport = new Viewport({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    worldWidth: 400 * 8,
    worldHeight: 400 * 8,
    noTicker: true, // viewport do not have his own ticker now
    interaction: app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
})

// add the viewport to the stage
app.stage.addChild(viewport)

// activate plugins
viewport
    .drag()
    .pinch()
    .wheel()
    .decelerate();

export default viewport;