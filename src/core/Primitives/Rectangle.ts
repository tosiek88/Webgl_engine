
import RawModel2DFactory from "../Factors/ModelFactory";

import IRenderable from "../Interfaces/IRenderable";
import IUpdateable from "../Interfaces/IUpdateable";
import Loader, { IMyArgs } from "../Loader";
import RawModel2D from "../RawModel2D";

export default class Rectangle implements IRenderable, IUpdateable {
    private model: RawModel2D;
    private loader: Loader = new Loader();
    constructor(private gl: WebGL2RenderingContext, private position: number[], private size: number[]) {

        this.model = RawModel2DFactory.create(gl);
        const args: IMyArgs = {
            position,
            size,
        };

        this.model.setData(
            this.loader.load(
                (myArgs) => {
                    const samples: Float32Array = new Float32Array(
                        [
                            myArgs.position[0], myArgs.position[1],
                            myArgs.position[0] + myArgs.size[0], args.position[1],
                            myArgs.position[0] + myArgs.size[0], args.position[1] + args.size[1],
                            myArgs.position[0], myArgs.position[1] + args.size[1],

                        ]);
                    return samples;
                },
                args),
        );
        this.model.useProgram();
    }

    public render(): boolean {
        this.model.bind();
        this.gl.drawElements(this.gl.TRIANGLES, this.model.Count, this.gl.UNSIGNED_SHORT, 0);

        return true;
    }

    public update(deltaTime: number): boolean {

        return true;
    }

}
