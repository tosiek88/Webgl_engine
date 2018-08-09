import IBO from "./IBO";
import IRenderable from "./Interfaces/IRenderable";
import VAO from "./VAO";
import VBO from "./VBO";

export default class Renderer implements IRenderable {
    private objects: IRenderable[];

    public attach(object: IRenderable) {
        this.objects.push(object);
    }

    public render(): boolean {
        return true;
    }
}
