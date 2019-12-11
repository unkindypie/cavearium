import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import app from './pixiapp'

const viewport = new Viewport({
    screenWidth: app.renderer.width,
    screenHeight: app.renderer.height,
    worldWidth: 1920,
    worldHeight: 1920,
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