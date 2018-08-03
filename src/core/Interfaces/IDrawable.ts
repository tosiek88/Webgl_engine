export default interface IDrawable {
    readonly primitiveType: number;
    readonly countVertex: number;
    draw(): boolean;
}
