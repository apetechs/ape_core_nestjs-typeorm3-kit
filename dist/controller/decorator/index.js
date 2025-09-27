"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefController = DefController;
exports.DefGet = DefGet;
exports.DefPost = DefPost;
exports.DefPut = DefPut;
exports.DefPatch = DefPatch;
exports.DefDelete = DefDelete;
const common_1 = require("@nestjs/common");
const constants_1 = require("@nestjs/common/constants");
const swagger_1 = require("@nestjs/swagger");
const _types_1 = require("../../@types");
function DefController(options) {
    return (target) => {
        const modulePath = Reflect.getMetadata(constants_1.MODULE_PATH, target);
        const pathMetadata = Reflect.getMetadata(constants_1.PATH_METADATA, target);
        console.log('-------------------');
        console.log(JSON.stringify({ modulePath, pathMetadata }));
        console.log('-------------------');
        (0, swagger_1.ApiBearerAuth)()(target);
        (0, common_1.Controller)(options)(target);
    };
}
function DefGet(path, options = new _types_1.MethodGetOptions()) {
    return function (target, propertyKey, descriptor) {
        const { statusCode = common_1.HttpStatus.OK, summary, responseType = undefined } = options;
        const output = {
            ...(0, common_1.HttpCode)(statusCode)(target, propertyKey, descriptor),
            ...(0, swagger_1.ApiOperation)({ summary })(target, propertyKey, descriptor),
            ...(0, common_1.Get)(path)(target, propertyKey, descriptor),
        };
        if (responseType) {
            Object.assign(output, {
                ...(0, swagger_1.ApiResponse)({ status: statusCode, type: responseType })(target, propertyKey, descriptor),
            });
        }
        else {
            Object.assign(output, {
                ...(0, swagger_1.ApiResponse)({ status: statusCode })(target, propertyKey, descriptor),
            });
        }
        return output;
    };
}
function DefPost(path, options = new _types_1.MethodOptions()) {
    return function (target, propertyKey, descriptor) {
        const { statusCode = common_1.HttpStatus.OK, summary, responseType = undefined, bodyType = undefined, } = options;
        const output = {
            ...(0, common_1.HttpCode)(statusCode)(target, propertyKey, descriptor),
            ...(0, swagger_1.ApiOperation)({ summary })(target, propertyKey, descriptor),
            ...(0, common_1.Post)(path)(target, propertyKey, descriptor),
        };
        if (responseType) {
            Object.assign(output, {
                ...(0, swagger_1.ApiResponse)({ status: statusCode, type: responseType })(target, propertyKey, descriptor),
            });
        }
        else {
            Object.assign(output, {
                ...(0, swagger_1.ApiResponse)({ status: statusCode })(target, propertyKey, descriptor),
            });
        }
        if (bodyType) {
            Object.assign(output, { ...(0, swagger_1.ApiBody)({ type: bodyType })(target, propertyKey, descriptor) });
        }
        return output;
    };
}
function DefPut(path, options = new _types_1.MethodOptions()) {
    return function (target, propertyKey, descriptor) {
        const { statusCode = common_1.HttpStatus.OK, summary, responseType = undefined, bodyType = undefined, } = options;
        const output = {
            ...(0, common_1.HttpCode)(statusCode)(target, propertyKey, descriptor),
            ...(0, swagger_1.ApiOperation)({ summary })(target, propertyKey, descriptor),
            ...(0, common_1.Put)(path)(target, propertyKey, descriptor),
        };
        if (responseType) {
            Object.assign(output, {
                ...(0, swagger_1.ApiResponse)({ status: statusCode, type: responseType })(target, propertyKey, descriptor),
            });
        }
        else {
            Object.assign(output, {
                ...(0, swagger_1.ApiResponse)({ status: statusCode })(target, propertyKey, descriptor),
            });
        }
        if (bodyType) {
            Object.assign(output, { ...(0, swagger_1.ApiBody)({ type: bodyType })(target, propertyKey, descriptor) });
        }
        return output;
    };
}
function DefPatch(path, options = new _types_1.MethodOptions()) {
    return function (target, propertyKey, descriptor) {
        const { statusCode = common_1.HttpStatus.OK, summary, responseType = undefined, bodyType = undefined, } = options;
        const output = {
            ...(0, common_1.HttpCode)(statusCode)(target, propertyKey, descriptor),
            ...(0, swagger_1.ApiOperation)({ summary })(target, propertyKey, descriptor),
            ...(0, common_1.Patch)(path)(target, propertyKey, descriptor),
        };
        if (responseType) {
            Object.assign(output, {
                ...(0, swagger_1.ApiResponse)({ status: statusCode, type: responseType })(target, propertyKey, descriptor),
            });
        }
        else {
            Object.assign(output, {
                ...(0, swagger_1.ApiResponse)({ status: statusCode })(target, propertyKey, descriptor),
            });
        }
        if (bodyType) {
            Object.assign(output, { ...(0, swagger_1.ApiBody)({ type: bodyType })(target, propertyKey, descriptor) });
        }
        return output;
    };
}
function DefDelete(path, options = new _types_1.MethodOptions()) {
    return function (target, propertyKey, descriptor) {
        const { statusCode = common_1.HttpStatus.OK, summary, responseType = undefined, bodyType = undefined, } = options;
        const output = {
            ...(0, common_1.HttpCode)(statusCode)(target, propertyKey, descriptor),
            ...(0, swagger_1.ApiOperation)({ summary })(target, propertyKey, descriptor),
            ...(0, common_1.Delete)(path)(target, propertyKey, descriptor),
        };
        if (responseType) {
            Object.assign(output, {
                ...(0, swagger_1.ApiResponse)({ status: statusCode, type: responseType })(target, propertyKey, descriptor),
            });
        }
        else {
            Object.assign(output, {
                ...(0, swagger_1.ApiResponse)({ status: statusCode })(target, propertyKey, descriptor),
            });
        }
        if (bodyType) {
            Object.assign(output, { ...(0, swagger_1.ApiBody)({ type: bodyType })(target, propertyKey, descriptor) });
        }
        return output;
    };
}
//# sourceMappingURL=index.js.map