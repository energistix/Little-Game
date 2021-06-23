import * as PIXI from "pixi.js"
import * as game from "../core/game"

let spacing: number = 100
const rows: number = Math.floor(game.getHeight() / spacing)
const cols: number = Math.floor(game.getWidth() / spacing)
spacing = game.getHeight() / rows

let rock: PIXI.Sprite

type types = "empty" | "rock"

const stuffToCreate: Array<types> = ["rock"]

class Cell {
  readonly x : number
  readonly y : number
  public type : types
  private _sprite: PIXI.Sprite | undefined
  private drawn: boolean
  
  constructor(x:number, y:number) {
    this.x = x
    this.y = y
    this.type = "empty"
    this.drawn = false
  }
  
  set sprite(sprite: PIXI.Sprite){
    sprite = PIXI.Sprite.from(sprite.texture)
    sprite.x = this.x * spacing
    sprite.y = this.y * spacing
    sprite.height = spacing
    sprite.width = spacing
    this._sprite = sprite
    if(!this.drawn){
      game.app.stage.addChild(this._sprite)
      this.drawn = true
    }
  }
}

const grid: Array<Array<Cell>> = new Array(cols).fill([]).map((_,x) => new Array(rows).fill(new Cell(0,0)).map((_,y) => new Cell(x,y)))


/**
 * After resources is loaded, setup your Game
 */
export async function setup() {
  rock = game.getSprite("rock")
  console.log(spacing)
}

/**
 * Called for each Game tick
 */

function selectRandomPos() {
  return new PIXI.Point(Math.floor(Math.random() * cols), Math.floor(Math.random() * rows))
}

export async function update() {
  const ticker: PIXI.Ticker = PIXI.Ticker.shared
  ticker.add(() => {
    if (Math.random() < 0.000001) {
      const pos = selectRandomPos()
      const cell = grid[pos.x][pos.y]
      if(cell.type === "empty"){
        console.log("tick")
        const thingToCreate = stuffToCreate[Math.floor(Math.random() * stuffToCreate.length)]
        cell.sprite = game.getSprite(thingToCreate)
        cell.type = thingToCreate
      }
    }
  })
}
