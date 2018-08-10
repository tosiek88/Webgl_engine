
import IColor from "./Interfaces/IColor";
import IDrawable from "./Interfaces/IDrawable";

import IRenderable from "./Interfaces/IRenderable";
import IUpdateable from "./Interfaces/IUpdateable";
import Retangle from "./Primitives/Retangle";

export default class Core implements IUpdateable, IDrawable {
    public timeSpent: number = 0;

    public countVertex: number = 0;
    public primitiveType: number = 0;

    private readonly DEFAULT_CANVAS: string = "primary_canvas";
    private canvas: HTMLCanvasElement | null = null;
    private gl: WebGL2RenderingContext | null = null;
    private objToUpdate: Retangle[] = [];

    public constructor(canvasID?: string) {

        this.selectCanvas(canvasID);

        this.gl = this.canvas.getContext("webgl2") as WebGL2RenderingContext;
        this.primitiveType = this.gl.TRIANGLES;
        this.countVertex = 256000;
        this.resize(this.gl);
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

    }
    public clear(color: IColor) {
        this.gl.clearColor(color.r, color.g, color.b, color.a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    public resize(glContext: WebGL2RenderingContext) {
        const realToCSSPixels = window.devicePixelRatio;

        // Lookup the size the browser is displaying the canvas in CSS pixels
        // and compute a size needed to make our drawingbuffer match it in
        // device pixels.
        const displayWidth = Math.floor(glContext.canvas.clientWidth * realToCSSPixels);
        const displayHeight = Math.floor(glContext.canvas.clientHeight * realToCSSPixels);

        // Check if the canvas is not the same size.
        if (glContext.canvas.width !== displayWidth ||
            glContext.canvas.height !== displayHeight) {

            // Make the canvas the same size
            glContext.canvas.width = displayWidth;
            glContext.canvas.height = displayHeight;
        }
    }

    public addObj(obj: Retangle) {

        this.objToUpdate.push(obj);
    }

    public update(deltaTime: number): boolean {
        this.timeSpent += 0.1;
        this.objToUpdate.forEach((it) => {
            it.update(this.timeSpent);
        });
        return true;
    }

    public render(): boolean {
        return true;
    }

    public run() {

        requestAnimationFrame(this.renderLoop);
    }

    public draw(): boolean {
        this.gl.drawElements(this.primitiveType, this.countVertex, this.gl.UNSIGNED_SHORT, 0);
        // this.gl.drawElementsInstanced(this.primitiveType, this.countVertex, this.gl.UNSIGNED_SHORT, 0, 10000);
        return true;
    }

    private renderLoop = () => {
        const color = { r: 7 / 255, g: 33 / 255, b: 66 / 255, a: 1.0 } as IColor;
        this.clear(color);
        this.update(0);

        this.render();
        this.draw();
        requestAnimationFrame(this.renderLoop);
    }

    private selectCanvas(idCanvas: string) {
        if (idCanvas === undefined) {
            this.canvas = document.getElementById(this.DEFAULT_CANVAS) as HTMLCanvasElement;
        } else {
            this.canvas = document.getElementById(idCanvas) as HTMLCanvasElement;
        }
    }

    public get GL(): WebGL2RenderingContext {
        return this.gl;
    }

}
