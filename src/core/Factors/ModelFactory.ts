
import staticImplements from "../../vendors/decorator/staticImplements";
import RawModel2D from "../RawModel2D";
import Builder from "./Builder";

@staticImplements<ICreator<RawModel2D>>()
export default abstract class RawModel2DFactory {
    public static create(gl: WebGL2RenderingContext): RawModel2D {
        const builder = new Builder<RawModel2D>();
        const model: RawModel2D = builder.build(RawModel2D, gl);
        model.setData(new Float32Array([]));
        model.generateIndicies();
        return model;
    }

}
