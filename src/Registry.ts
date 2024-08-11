import Keyed from "./Keyed";

interface Registry<T extends Keyed> {
    get(key: string): T | undefined;
    forEach(callbackfn: (value: T, key: string, self: this) => void): void;
    keys(): string[];
    values(): T[];
}

export = Registry;