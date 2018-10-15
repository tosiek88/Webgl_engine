
import RawModel2DFactory from "../Factors/ModelFactory";

import Complex from "../../vendors/helper/Complex";
import Model from "../Abstract/Model";
import ILoader from "../Interfaces/ILoader";
import IRenderable from "../Interfaces/IRenderable";
import IUpdateable from "../Interfaces/IUpdateable";
import Loader from "../Loader";

interface IRetangleArgs {
    dim: Complex;
    pos: Complex;
}

export default class Rectangle implements IRenderable, IUpdateable {
    private model: Model;
    private loader: ILoader<IRetangleArgs, Float32Array> = new Loader<IRetangleArgs>();
    constructor(private gl: WebGL2RenderingContext, private prop: IRetangleArgs) {

        this.model = RawModel2DFactory.create(gl);

        this.model.setData(
            this.loader.load(
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
                prop),
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
