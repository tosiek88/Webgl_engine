interface IVertexBufferElement {
    type: number;
    count: number;
    normalize: boolean;
    offset: number;
}

export default class VertexBufferElement implements IVertexBufferElement {
   public static GetSizeOfType = (type: number): number => {
        switch (type) {
            case WebGLRenderingContext.FLOAT: {
                return 4;
                break;
            }
            default:
                return 0;
        }
    }

    public type: number = 0;
    public count: number = 0;
    public normalize: boolean = true;
    public offset: number = 0;

    constructor(elements: IVertexBufferElement) {
        this.type = elements.type;
        this.count = elements.count;
        this.normalize = elements.normalize;
        this.offset = elements.offset;
    }

}
