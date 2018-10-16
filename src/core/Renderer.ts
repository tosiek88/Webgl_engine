
import IRenderable from "./Interfaces/IRenderable";

export default class Renderer {
    private objects: IRenderable[] = [];

    public render(objects: IRenderable[]): boolean {
        for (const el of objects) {
            el.render(0);
        }
        return true;
    }
}
