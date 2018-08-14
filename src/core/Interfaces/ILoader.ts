export default interface ILoader<T> {
    load(...args: any[]): T;
}
