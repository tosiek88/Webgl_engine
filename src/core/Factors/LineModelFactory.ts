
import staticImplements from "../../vendors/decorator/staticImplements";
import LineModel from "../LineModel";
import LineModelBuilder from "./LineModelBuilder";

@staticImplements<ICreator<LineModel>>()
export default abstract class LineModelFactory {
    public static create(gl: WebGL2RenderingContext): LineModel {

        const builder = new LineModelBuilder<LineModel>();
        const model: LineModel = builder.build(LineModel, gl);

        model.setData(new Float32Array([]));
        model.generateIndicies();

        return model;
    }

}
