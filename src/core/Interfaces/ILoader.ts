
export type ICallback<Args, ReturnType> = (args: Args) => ReturnType;
export default interface ILoader<Args, ReturnType> {
    load(genFnc: ICallback<Args, ReturnType>, args: Args): ReturnType;
}
