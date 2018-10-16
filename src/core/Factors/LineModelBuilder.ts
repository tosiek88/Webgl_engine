import * as fragmentSrc from "../../shaders/fragmentALine.glsl";
import * as vertexSrc from "../../shaders/vertexALine.glsl";
import Model from "../Abstract/Model";
import VertexBufferLayout from "../Buffers/VertexBufferLayout";
import { IBuliderModel } from "../Interfaces/IBuilder";
import ShaderCompiler from "../ShaderCompiler";
import Builder from "./ModelBulider";

export default class LineModelBuilder<T extends Model> extends Builder<T> {
    public build(Type: new (obj: IBuliderModel) => T, gl: WebGL2RenderingContext): T {
        return super.build(Type, gl);
    }

    protected setupVBOLayout(layout: VertexBufferLayout) {
        layout.Push(2);
        layout.Push(2);
    }

    protected setupCompiler() {
        this.compiler = new ShaderCompiler(this.gl, vertexSrc.default, fragmentSrc.default);
        this.compiler.name = "Aline";

        this.compiler.useProgram();
        this.compiler.setDefaultOrthoMatrix();

    }

}
