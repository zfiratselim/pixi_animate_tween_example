import * as PIXI from "pixi.js";


export default class PixiAnimateTween extends PIXI.Application{
    constructor(){
        super({
            view:<HTMLCanvasElement>document.querySelector("#canvas"),
            width:600,
            height:400,
            backgroundColor:0x000000
        });
    }

}
(window as any).context = new PixiAnimateTween();