import Model from "./Abstract/Model";
import VertexBufferLayout from "./VertexBufferLayout";

export default class RawModel2D extends Model {
    private layout: VertexBufferLayout;

    public setData(position: number[], size: number[], phase: number) {
        const samples: number[] = [];

        for (let index = 0; index < 64000; index++) {
            const x = 0.0025 * index - 1;
            const freq = 50;
            samples.push(x); samples.push(0.9 * Math.sin(Math.PI * x * freq + phase));
            samples.push(x + size[0]); samples.push(0.9 * Math.sin(Math.PI * x * freq + phase));
            samples.push(x + size[0]); samples.push(0.9 * Math.sin(Math.PI * x * freq + phase) + size[1]);
            samples.push(x); samples.push(0.9 * Math.sin(Math.PI * x * freq + phase) + size[1]);
        }
        let positionAndSize = new Float32Array(samples);

        this.vbo.setBuffer(positionAndSize);
        positionAndSize = null;

        const sampleIndicies: number[] = [];
        for (let index = 0; index < 256000; index += 4) {
            sampleIndicies.push(index + 0);
            sampleIndicies.push(index + 1);
            sampleIndicies.push(index + 2);
            sampleIndicies.push(index + 2);
            sampleIndicies.push(index + 3);
            sampleIndicies.push(index + 0);
        }

        this.vao.addBuffor(this.vbo, this.layout);

        let indicies = new Uint16Array(sampleIndicies);
        this.ibo.setBuffor(indicies);
        indicies = null;
    }
}
