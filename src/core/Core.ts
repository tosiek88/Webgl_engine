
import IColor from "./Interfaces/IColor";
import IRenderable from "./Interfaces/IRenderable";
import IUpdateable from "./Interfaces/IUpdateable";
import Renderer from "./Renderer";

type IGraphObject = IRenderable & IUpdateable;

export default class Core implements IUpdateable, IRenderable {
    public timeSpent: number = 0;

    public countVertex: number = 0;
    public primitiveType: number = 0;
    private readonly BACKGROUND_COLOR = { r: 7 / 255, g: 33 / 255, b: 66 / 255, a: 1.0 } as IColor;

    private readonly DEFAULT_CANVAS: string = "primary_canvas";
    private canvas: HTMLCanvasElement | null = null;
    private gl: WebGL2RenderingContext | null = null;
    private renderer: Renderer = new Renderer();
    private objects: IGraphObject[] = [];
    private isRunning: boolean = true;

    public constructor(canvasID?: string) {

        this.selectCanvas(canvasID);

        this.gl = this.canvas.getContext("webgl2") as WebGL2RenderingContext;
        this.primitiveType = this.gl.TRIANGLES;

        this.resize(this.gl);
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

    }
    public clear(color: IColor) {
        this.gl.clearColor(color.r, color.g, color.b, color.a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    public resize(gl: WebGL2RenderingContext) {
        const realToCSSPixels = window.devicePixelRatio;

        // Lookup the size the browser is displaying the canvas in CSS pixels
        // and compute a size needed to make our drawingbuffer match it in
        // device pixels.
        const displayWidth = Math.floor(gl.canvas.clientWidth * realToCSSPixels);
        const displayHeight = Math.floor(gl.canvas.clientHeight * realToCSSPixels);

        // Check if the canvas is not the same size.
        if (gl.canvas.width !== displayWidth ||
            gl.canvas.height !== displayHeight) {

            // Make the canvas the same size
            gl.canvas.width = displayWidth;
            gl.canvas.height = displayHeight;
        }
    }

    public attach(object: IRenderable & IUpdateable) {
        this.objects.push(object);
    }

    public update(deltaTime: number): boolean {
        for (const it of this.objects) {
            it.update(deltaTime);
        }
        return true;
    }

    public run() {
        this.timeSpent = Date.now();
        requestAnimationFrame(this.render);
    }

    public stopMainLoop() {
        this.isRunning = !this.isRunning;
    }

    public render = (time: number) => {
        if (this.isRunning) {
            requestAnimationFrame(this.render);
        }

        const elapsed = Date.now() - this.timeSpent;
        if (elapsed > 1000 / 120) {

            this.timeSpent = Date.now() - (elapsed % 1000 / 60);
            this.clear(this.BACKGROUND_COLOR);
            this.update(elapsed);
            this.renderer.render(this.objects);
        }

        return true;

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
