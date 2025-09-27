"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildModule = ChildModule;
const validate_module_keys_util_1 = require("@nestjs/common/utils/validate-module-keys.util");
const constants_1 = require("@nestjs/common/constants");
const swagger_1 = require("@nestjs/swagger");
const PREFIX_METADATA = '__prefix___';
function fixPath(strInput) {
    let path = strInput;
    const regex = new RegExp('//', 'g');
    while (path.includes('//')) {
        path = path.replace(regex, '/');
    }
    const regexConfig = /(^\/+|\/+$)/gm;
    return path.replace(regexConfig, '');
}
const toPascalCase = (str) => {
    return str
        .replace(new RegExp(/[-_]+/, 'g'), ' ')
        .replace(new RegExp(/[^\w\s]/, 'g'), '')
        .replace(new RegExp(/\s+(.)(\w+)/, 'g'), ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`)
        .replace(new RegExp(/\s/, 'g'), '')
        .replace(new RegExp(/\w/), s => s.toUpperCase());
};
function ChildModule(childMetadata) {
    let { prefix = '', ...metadata } = childMetadata;
    const propsKeys = Object.keys(metadata);
    (0, validate_module_keys_util_1.validateModuleKeys)(propsKeys);
    return target => {
        console.log('=====ChildModule=====');
        for (const property in metadata) {
            if (metadata.hasOwnProperty(property)) {
                Reflect.defineMetadata(property, metadata[property], target);
            }
        }
        const defPrefix = fixPath(prefix);
        Reflect.defineMetadata(constants_1.MODULE_PATH, defPrefix ? '/' + defPrefix : defPrefix, target);
        const data = metadata['imports'] || [];
        data.forEach(item => {
            const childPath = Reflect.getMetadata(constants_1.MODULE_PATH, item) || '';
            const mixPath = fixPath(defPrefix + childPath);
            Reflect.defineMetadata(constants_1.MODULE_PATH, mixPath ? '/' + mixPath : mixPath, item);
        });
        const controllers = metadata['controllers'] || [];
        controllers.forEach(ctr => {
            const groupName = prefix ? `[${toPascalCase(prefix)}] ${ctr.name}` : `[API]${ctr.name}`;
            (0, swagger_1.ApiTags)(groupName)(ctr);
        });
    };
}
//# sourceMappingURL=index.js.map