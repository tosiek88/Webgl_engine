import staticImplements from "../vendors/decorator/staticImplements";
import ILoader from "./Interfaces/ILoader";

export type ICallback<Args, ReturnType> = (args: Args) => ReturnType;

export interface IMyArgs {
    position: number[];
    size: number[];
}

export default class Loader implements ILoader<Float32Array> {
    public load(genFnc: ICallback<IMyArgs, Float32Array>, args: IMyArgs): Float32Array {

        return genFnc(args);
    }
}
