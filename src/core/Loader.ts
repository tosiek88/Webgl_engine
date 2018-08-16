import staticImplements from "../vendors/decorator/staticImplements";
import ILoader from "./Interfaces/ILoader";

export type ICallback<Args, ReturnType> = (args: Args) => ReturnType;

export default class Loader implements ILoader<Float32Array> {
    public load<T>(genFnc: ICallback<T, Float32Array>, args: T): Float32Array {

        return genFnc(args);
    }
}
