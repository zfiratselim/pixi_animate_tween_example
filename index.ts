import * as PIXI from "pixi.js";
import { SmoothGraphics as Graphics } from "@pixi/graphics-smooth";
import { Container } from "pixi.js";

export default class PixiAnimateTween extends PIXI.Application {
    constructor() {
        super({
            view: <HTMLCanvasElement>document.querySelector("#canvas"),
            width: 1300,
            height: 800,
            backgroundColor: 0x000000
        });
        this.startGame();
    }
    createTexture(size, color) {
        let p = new Graphics();
        p.beginFill(color);
        p.lineStyle(0);
        p.drawCircle(0, 0, size);
        p.endFill();
        return this.renderer.generateTexture(p);
    }
    createCircleSprite(x: number, y: number, size: number, color: number, con: Container) {
        const t = this.createTexture(size*2, color);
        const sprite = new PIXI.Sprite(t);
        sprite.anchor.set(.5);
        sprite.x = x;
        sprite.y = y;
        sprite.width=size;
        sprite.height=size;
        con.addChild(sprite)
        return sprite
    }
    startGame() {
        this.createCircleSprite(650, 400, 150, 0xFF0022, this.stage);
    }
}
(window as any).context = new PixiAnimateTween();