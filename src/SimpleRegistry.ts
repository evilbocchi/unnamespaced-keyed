import Keyed from "./Keyed";
import Registry from "./Registry";

type Indexable = { __index: unknown };

export default class SimpleRegistry <T extends Keyed> extends Registry<T> {

    readonly registryType: T;
    readonly map: Map<string, T>;

    constructor(registryType: T) {
        super();
        const built = new Map<string, T>();
        const mainClass = ((registryType as unknown) as Indexable).__index; // ahahahaha
        for (const [key, value] of pairs(mainClass as T)) {
            if (typeOf(value) === "table" && (value as Indexable).__index === mainClass) { // cheap hack to get around instanceof limitations
                if ((value as T)["getKey"] === undefined)
                    continue;
                const finalKey = (value as T).getKey() ?? key; // if no key found for getKey then just use the variable's name
                built.set(finalKey, value as T);
            }
        }

        this.map = built;
        this.registryType = registryType;
    }

    public get(key: string): T | undefined {
        return this.map.get(key);
    }

    public forEach(callbackfn: (value: T, key: string, self: this) => void): void {
        for (const [key, value] of this.map) {
            callbackfn(value, key, this);
        }
    }

    public keys(): string[] {
        const keys = new Array<string>();
        for (const [key, _value] of this.map) {
            keys.push(key);
        }
        return keys;
    }

    public values(): T[] {
        const values = new Array<T>();
        for (const [_key, value] of this.map) {
            values.push(value);
        }
        return values;
    }
}