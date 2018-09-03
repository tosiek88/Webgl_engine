
import RawModel2DFactory from "../Factors/ModelFactory";

import Complex from "../../vendors/helper/Complex";
import Model from "../Abstract/Model";
import ILoader from "../Interfaces/ILoader";
import IRenderable from "../Interfaces/IRenderable";
import IUpdateable from "../Interfaces/IUpdateable";
import Loader from "../Loader";

interface ILineArgs {
    width: number;
    begin: Complex;
    end: Complex;
}

export default class Line implements IRenderable, IUpdateable {
    private model: Model;
    private vector: Complex;
    private loader: ILoader<ILineArgs, Float32Array> = new Loader<ILineArgs>();
    constructor(private gl: WebGL2RenderingContext, private args: ILineArgs) {

        this.model = RawModel2DFactory.create(gl);

        this.vector = Complex.Substract(args.end, args.begin);
        console.log(`BEGIN: ${this.args.begin}`);
        console.log(`END: ${this.args.end}`);
        console.log(`AFTER SUBSTRACT ${this.vector}`);
        let normal = this.vector.Perpendicular;
        console.log(`PERPENDICULAR ${normal}`);
        normal = normal.Normal;
        console.log(`NORMAL ${normal.Normal}`);

        this.model.setData(
            this.loader.load(
                (Args) => {
                    const { begin, end, width } = args;

                    const samples: Float32Array = new Float32Array(
                        [
                            begin.X - width * normal.X, begin.Y - width * normal.Y,
                            end.X - width * normal.X, end.Y - width * normal.Y,
                            end.X + width * normal.X, end.Y + width * normal.Y,
                            begin.X + width * normal.X, begin.Y + width * normal.Y,

                        ]);
                    console.log(samples);
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
