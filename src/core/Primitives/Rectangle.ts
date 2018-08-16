
import RawModel2DFactory from "../Factors/ModelFactory";

import Complex from "../../vendors/helper/Complex";
import IRenderable from "../Interfaces/IRenderable";
import IUpdateable from "../Interfaces/IUpdateable";
import Loader from "../Loader";
import RawModel2D from "../RawModel2D";

export default class Rectangle implements IRenderable, IUpdateable {
    private model: RawModel2D;
    private loader: Loader = new Loader();
    constructor(private gl: WebGL2RenderingContext, private pos: Complex, private dim: Complex) {

        this.model = RawModel2DFactory.create(gl);

        interface IRetangleArgs {
            dim: Complex;
            pos: Complex;
        }

        const RetangleArgs = {
            dim,
            pos,
        };

        this.model.setData(
            this.loader.load<IRetangleArgs>(
                (Args) => {
                    const samples: Float32Array = new Float32Array(
                        [
                            Args.pos.X, Args.pos.Y,
                            Args.pos.X + Args.dim.X, Args.pos.Y,
                            Args.pos.X + Args.dim.X, Args.pos.Y + Args.dim.Y,
                            Args.pos.X, Args.pos.Y + Args.dim.Y,

                        ]);
                    return samples;
                },
                RetangleArgs),
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
