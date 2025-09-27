"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryWrapper = void 0;
const typeorm_1 = require("typeorm");
class RepositoryWrapper extends typeorm_1.Repository {
    async findOne(options) {
        var _a;
        const where = options === null || options === void 0 ? void 0 : options.where;
        const columns = (((_a = this === null || this === void 0 ? void 0 : this.metadata) === null || _a === void 0 ? void 0 : _a.columns) || []).map((col) => col.propertyName);
        if (!where || typeof where !== "object") {
            return null;
        }
        for (const key of columns) {
            if ((where || {}).hasOwnProperty(key)) {
                if ((where || {})[key] === undefined) {
                    return null;
                }
            }
        }
        return super.findOne(options);
    }
}
exports.RepositoryWrapper = RepositoryWrapper;
//# sourceMappingURL=types.js.map