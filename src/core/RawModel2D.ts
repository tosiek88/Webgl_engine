import Model from "./Abstract/Model";
import { IBuliderModel } from "./Interfaces/IBuilder";

export default class RawModel2D extends Model {
    constructor(private obj?: IBuliderModel) {
        super();
        this.gl = obj.gl;
        this.vao = obj.vao;
        this.vbo = obj.vbo;
        this.ibo = obj.ibo;
        this.compiler = obj.compiler;
    }

    public generateIndicies() {
        const indicies: number[] = [];

        indicies.push(0);
        indicies.push(1);
        indicies.push(2);
        indicies.push(2);
        indicies.push(3);
        indicies.push(0);

        this.indicies = new Uint16Array(indicies);
        this.setIndicies(indicies);
    }

}
