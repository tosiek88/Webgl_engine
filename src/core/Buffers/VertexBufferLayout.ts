import VertexBufferElement from "./VertexBufferElement";
export default class VertexBufferLayout {
    private elements: VertexBufferElement[] = [];
    private stride: number = 0;
    private offset: number = 0;

    public GetElements(): VertexBufferElement[] {
        return this.elements;
    }

    public get Stride(): number {
        return this.stride;
    }

    public GetCountOfElement(index: number): number {
        return this.elements[index].count;
    }

    public Push<FLOAT>(count: number) {
        const o = {
            count,
            normalize: true,
            offset: this.offset,
            type: WebGLRenderingContext.FLOAT,
        };

        this.elements.push(new VertexBufferElement(o));

        this.offset = count * VertexBufferElement.GetSizeOfType(o.type);
        this.stride += this.offset;
    }

}
