

interface IVertexBufferElement {
    type: number,
    count: number,
    normalize: boolean,
    offset: number
}

class VertexBufferElement {
    constructor(BufferElement: IVertexBufferElement) {

    }

    static GetSizeOfType = (type: number): number => {
        switch (type) {
            case WebGLRenderingContext.FLOAT: {
                return 4;
                break;
            }
            default:
                return 0;
        }
    }
}

export default class VertexBufferLayout {
    private _elements: VertexBufferElement[] = [];
    private _stride: number = 0;
    private _offset: number = 0;

    constructor() {

    }

    public Push<FLOAT>(count: number) {
        let o = {
            type: WebGLRenderingContext.FLOAT,
            count: count,
            normalize: true,
            offset: this._offset
        }

        this._elements.push( new VertexBufferElement(o));

        this._offset = count * VertexBufferElement.GetSizeOfType(o.type);
        this._stride += this._offset;
    }   

}

