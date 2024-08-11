/// <reference types="@rbxts/compiler-types" />
import Keyed from "./Keyed";
import Registry from "./Registry";

export default class SimpleRegistry<T extends Keyed> implements Registry<T> {
    readonly registryType: T;
    readonly map: Map<string, T>;
    constructor(registryType: T);
    get(key: string): T | undefined;
    forEach(callbackfn: (value: T, key: string, self: this) => void): void;
    keys(): string[];
    values(): T[];
}
