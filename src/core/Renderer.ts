
import IRenderable from "./Interfaces/IRenderable";

export default class Renderer implements IRenderable {
    private objects: IRenderable[] = [];

    public attach(object: IRenderable) {
        this.objects.push(object);
    }

    public render(): boolean {
        for (const el of this.objects) {
            el.render();
        }
        return true;
    }
}
