"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodOptions = exports.MethodGetOptions = void 0;
const common_1 = require("@nestjs/common");
class MethodGetOptions {
    constructor() {
        this.summary = '';
        this.statusCode = common_1.HttpStatus.OK;
    }
}
exports.MethodGetOptions = MethodGetOptions;
class MethodOptions extends MethodGetOptions {
}
exports.MethodOptions = MethodOptions;
//# sourceMappingURL=index.js.map