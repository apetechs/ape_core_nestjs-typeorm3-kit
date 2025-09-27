"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emoji = Emoji;
exports.NewClass = NewClass;
function Emoji() {
    return function (target, key) {
        let val = target[key];
        const getter = () => {
            return val;
        };
        const setter = (next) => {
            val = `🍦 ${next} 🍦`;
        };
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    };
}
function NewClass() {
    return function (target) {
        const original = target;
        function construct(constructor, args) {
            const c = function () {
                return constructor.apply(this, args);
            };
            c.prototype = constructor.prototype;
            return new c();
        }
        const newConstructor = function (...args) {
            return construct(original, args);
        };
        newConstructor.prototype = original.prototype;
        return newConstructor;
    };
}
//# sourceMappingURL=index.js.map