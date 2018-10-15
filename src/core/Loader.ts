import staticImplements from "../vendors/decorator/staticImplements";
import ILoader, { ICallback } from "./Interfaces/ILoader";

export default class Loader<T> implements ILoader<T, Float32Array> {
    public load(genFnc: ICallback<T, Float32Array>, args: T): Float32Array {

        return genFnc(args);
    }
}
