import Model from "../Abstract/Model";

export default interface IBulider<T> {
    build(gl: WebGL2RenderingContext): T;
}
