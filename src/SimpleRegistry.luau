--!native
--!optimize 2

local SimpleRegistry = {};
SimpleRegistry.__index = SimpleRegistry;

function SimpleRegistry.new<T>(registryType: T): SimpleRegistry<T>
    local built = {};
    local mainClass = registryType.__index;
    local mainClassString = tostring(mainClass);

    for key, value in pairs(mainClass) do
        if (typeof(value) ~= "table" or tostring(value.__index) ~= mainClassString or value.getKey == nil or key == "__index") then
            continue;
        end
        local defaultKey = value:getKey();
        if defaultKey == nil then
            defaultKey = key;
        end
        built[defaultKey] = value;
        if (value.key == nil) then
            value.key = defaultKey;
        end
    end

    return setmetatable({
        map = built,
        registryType = registryType.__index
    }, SimpleRegistry);
end

function SimpleRegistry.get<T>(self: SimpleRegistry<T>, key: string): T
    return self.map[key];
end

function SimpleRegistry.forEach<T>(self: SimpleRegistry<T>, callbackfn: (T, string, SimpleRegistry<T>) -> ())
    for key, value in pairs(self.map) do
        callbackfn(value, key, self);
    end
end

function SimpleRegistry.keys<T>(self: SimpleRegistry<T>)
    local keys = {}
    for key, _value in pairs(self.map) do
        table.insert(keys, key);
    end
    return keys
end

function SimpleRegistry.values<T>(self: SimpleRegistry<T>)
    local values = {}
    for _key, value in pairs(self.map) do
        table.insert(values, value);
    end
    return values
end

export type BaseSimpleRegistry<T> = {map: {[string]: T}, registryType: T}
export type SimpleRegistry<T> = typeof (setmetatable({} :: BaseSimpleRegistry<T>, SimpleRegistry));

return SimpleRegistry;