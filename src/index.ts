import * as PIXI from "pixi.js"
import * as sketch from "./app/sketch"

async function setup() {
  await new Promise((resolve) => {
    PIXI.Loader.shared
      // .add("assets/sprites/animation.json")
      .add("assets/sprites/rock.png")
      .add("assets/sprites/void.png")
      .load(resolve)
  })

  await sketch.setup()
}

setup().then(() => {
  PIXI.Ticker.shared.add(sketch.update, undefined, PIXI.UPDATE_PRIORITY.HIGH)
})
