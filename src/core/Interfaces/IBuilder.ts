import Model from "../Abstract/Model";
import IBO from "../Buffers/IBO";
import VAO from "../Buffers/VAO";
import VBO from "../Buffers/VBO";
import ShaderCompiler from "../ShaderCompiler";
export interface IBuliderModel {
    gl: WebGL2RenderingContext; vao: VAO; vbo: VBO; ibo: IBO; compiler: ShaderCompiler;
}

export default interface IBulider<T, U> {
    build(T: new (obj: U) => T, gl: WebGL2RenderingContext): T;
}
