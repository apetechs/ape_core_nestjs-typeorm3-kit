"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPhoneNumber = IsPhoneNumber;
exports.IsNumber = IsNumber;
exports.IsLongerThan = IsLongerThan;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
function IsPhoneNumber(region, validationOptions) {
    return function (target, propertyKey) {
        (0, class_transformer_1.Type)(() => String)(target, propertyKey);
        (0, class_validator_1.IsPhoneNumber)(region, validationOptions)(target, propertyKey);
    };
}
function IsNumber(validationOptions) {
    return function (target, propertyKey) {
        var _a;
        const isRequired = (_a = validationOptions === null || validationOptions === void 0 ? void 0 : validationOptions.required) !== null && _a !== void 0 ? _a : false;
        if (!isRequired) {
            (0, class_validator_1.IsOptional)({ each: true })(target, propertyKey);
        }
        (0, class_transformer_1.Type)(() => Number)(target, propertyKey);
        (0, class_validator_1.IsNumber)({ allowNaN: false }, validationOptions)(target, propertyKey);
    };
}
function IsLongerThan(property, validationOptions = {}) {
    return function (object, propertyKey) {
        if (!validationOptions.message) {
            validationOptions.message = `${String(propertyKey)} must be longer than ${property}`;
        }
        (0, class_validator_1.registerDecorator)({
            name: "isLongerThan",
            target: object.constructor,
            propertyName: propertyKey,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = args.object[relatedPropertyName];
                    return (typeof value === "string" &&
                        typeof relatedValue === "string" &&
                        value.length > relatedValue.length);
                },
            },
        });
    };
}
//# sourceMappingURL=index.js.map