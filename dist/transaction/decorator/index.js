"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefTransaction = DefTransaction;
const typeorm_transactional_1 = require("typeorm-transactional");
function DefTransaction(options) {
    if (!options) {
        return function (target, propertyKey, descriptor) {
            return (0, typeorm_transactional_1.Transactional)({})(target, propertyKey, descriptor);
        };
    }
    const { connectionName = undefined, propagation = undefined, isoLevel = undefined } = options;
    let isolationLevel = undefined;
    Object.keys(typeorm_transactional_1.IsolationLevel).forEach(key => {
        if (isoLevel === key) {
            isolationLevel = typeorm_transactional_1.IsolationLevel[key];
        }
    });
    const mixOptions = {};
    if (connectionName) {
        Object.assign(mixOptions, { connectionName });
    }
    if (propagation) {
        Object.assign(mixOptions, { propagation });
    }
    if (isoLevel) {
        Object.assign(mixOptions, { isoLevel });
    }
    return function (target, propertyKey, descriptor) {
        return (0, typeorm_transactional_1.Transactional)(mixOptions)(target, propertyKey, descriptor);
    };
}
//# sourceMappingURL=index.js.map