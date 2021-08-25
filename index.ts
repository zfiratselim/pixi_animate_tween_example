import * as PIXI from "pixi.js";
import { SmoothGraphics as Graphics } from "@pixi/graphics-smooth";
import Tween from "tween.ts";
import { Container, Sprite } from "pixi.js";

export default class PixiAnimateTween extends PIXI.Application {
    sprite: Sprite;
    tween;
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
        const t = this.createTexture(size * 2, color);
        const sprite = new PIXI.Sprite(t);
        sprite.anchor.set(.5);
        sprite.x = x;
        sprite.y = y;
        sprite.width = size;
        sprite.height = size;
        con.addChild(sprite)
        return sprite
    }
    action({ x, y }: { x: number, y: number }, easing) {
        return new Tween.Tween(this.sprite)
            .to({ x, y }, 1000)
            .repeat(0)
            .delay(500)
            .easing(easing)
            .start();
    }
    ticcker() {
        this.ticker.add(delta => {
            Tween.update(this.ticker.lastTime)
        })
    }
    startGame() {
        this.sprite = this.createCircleSprite(650, 400, 150, 0xFF0022, this.stage);
        this.action({ x: 500, y: 100 }, Tween.Easing.Cubic.InOut).onComplete(() => {
            this.action({ x: 200, y: 400 }, Tween.Easing.Exponential.Out).onComplete(() => {
                this.action({ x: 100, y: 200 }, Tween.Easing.Linear.None).onComplete(() => {
                    this.action({ x: 1200, y: 700 }, Tween.Easing.Sinusoidal.InOut).onComplete(() => {
                        this.action({ x: 100, y: 200 }, Tween.Easing.Quintic.InOut);
                    })
                })
            })
        })

            ;


        this.ticcker();
    }
}
(window as any).context = new PixiAnimateTween();