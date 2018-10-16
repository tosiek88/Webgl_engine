
import Complex from "../../vendors/helper/Complex";
import Model from "../Abstract/Model";
import LineModelFactory from "../Factors/LineModelFactory";
import ILoader from "../Interfaces/ILoader";
import IRenderable from "../Interfaces/IRenderable";
import IUpdateable from "../Interfaces/IUpdateable";
import Loader from "../Loader";

interface ILineArgs {
    width: number;
    begin: Complex;
    end: Complex;

}

export default class AntialiasedLine implements IRenderable, IUpdateable {
    private model: Model;
    private vector: Complex;
    private loader: ILoader<ILineArgs, Float32Array> = new Loader<ILineArgs>();
    constructor(private gl: WebGL2RenderingContext, private args: ILineArgs) {

        this.model = LineModelFactory.create(gl);
        this.vector = Complex.Substract(this.args.end, this.args.begin);
        let normal = this.vector.Perpendicular;
        normal = normal.Normal;

        this.model.setData(
            this.loader.load(
                (Args) => {
                    const { begin, end } = Args;

                    const samples: Float32Array = new Float32Array(
                        [
                            // tslint:disable-next-line:max-line-length
                            begin.X, begin.Y, normal.X, normal.Y,
                            begin.X, begin.Y, -normal.X, -normal.Y,
                            end.X, end.Y, -normal.X, -normal.Y,
                            end.X, end.Y, normal.X, normal.Y,

                        ]);

                    return samples;
                },
                this.args),
        );
        this.model.setUniforms([{
            name: "u_width",
            value: args.width,
        }]);
        this.model.useProgram();
    }

    public render(): boolean {
        this.model.bind();
        this.gl.drawElements(this.gl.TRIANGLES, this.model.Count, this.gl.UNSIGNED_SHORT, 0);
        return true;
    }

    public update(deltaTime: number): boolean {
        deltaTime *= 0.1;
        this.args.end.Angle = this.lerp(
            this.args.end.Angle + deltaTime * 0.01,
            this.args.end.Angle + deltaTime * 0.05,
            0.01);

        this.vector = Complex.Substract(this.args.end, this.args.begin);
        const normal = this.vector.Perpendicular.Normal;
        this.model.updateModel(this.loader.load(
            (Args) => {
                const { begin, end } = Args;
                const samples: Float32Array = new Float32Array(
                    [
                        // tslint:disable-next-line:max-line-length
                        begin.X, begin.Y, normal.X, normal.Y,
                        begin.X, begin.Y, -normal.X, -normal.Y,
                        end.X, end.Y, -normal.X, -normal.Y,
                        end.X, end.Y, normal.X, normal.Y,

                    ]);
                // console.log(samples);
                return samples;

            },
            this.args));
        this.model.setUniforms([{
            name: "u_width",
            value: this.args.width,
        }]);
        return true;
    }

    private lerp(min: number, max: number, fraction: number) {
        return (max - min) * fraction + min;
    }

}
