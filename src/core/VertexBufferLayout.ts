

interface IVertexBufferElement {
    type: number,
    count: number,
    normalize: boolean,
    offset: number
}

class VertexBufferElement implements IVertexBufferElement {
    public type: number=0;    
    public count: number=0;
    public normalize: boolean=true;
    public offset: number=0;

    constructor(elements:IVertexBufferElement) {
        this.type=elements.type;
        this.count=elements.count;
        this.normalize=elements.normalize;
        this.offset=elements.offset;
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

    public GetElements():VertexBufferElement[]{
        return this._elements;
    }

    public get Stride():number{
        return this._stride;
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

