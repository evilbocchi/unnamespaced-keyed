import Keyed from "./Keyed";

export default abstract class Registry<T extends Keyed> {

    public abstract get(key: string): T | undefined;
    public abstract forEach(callbackfn: (value: T, key: string, self: this) => void): void;
    public abstract keys(): string[];
    public abstract values(): T[];
}