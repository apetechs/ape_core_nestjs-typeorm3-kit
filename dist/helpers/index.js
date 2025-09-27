"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lazyLoadClasses = exports.configSwaggerDocument = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const configSwaggerDocument = (app, document, swaggerPath = "swagger") => {
    const metadatas = (0, class_validator_1.getFromContainer)(class_validator_1.MetadataStorage)
        .validationMetadatas;
    const targetSchemas = document.components.schemas || {};
    const schemasBinding = (0, class_validator_jsonschema_1.validationMetadatasToSchemas)(metadatas) || {};
    Object.keys(schemasBinding).forEach((key) => {
        const value = schemasBinding[key];
        if (!targetSchemas[key]) {
            Object.assign(targetSchemas, { key: value });
        }
        else {
            const targetValue = targetSchemas[key];
            Object.assign(targetValue.properties, value.properties);
            targetValue.required = value.required;
            Object.assign(targetSchemas, { key: targetValue });
        }
    });
    document.components.schemas = Object.assign({}, targetSchemas);
    swagger_1.SwaggerModule.setup(swaggerPath, app, document);
};
exports.configSwaggerDocument = configSwaggerDocument;
const path_1 = require("path");
const fs_1 = require("fs");
const lazyLoadClasses = (baseDir, suffixes, additionalClasses = []) => {
    const results = [...additionalClasses];
    const subDirs = (0, fs_1.readdirSync)(baseDir);
    for (const sub of subDirs) {
        const subPath = (0, path_1.join)(baseDir, sub);
        if (!(0, fs_1.statSync)(subPath).isDirectory())
            continue;
        const files = (0, fs_1.readdirSync)(subPath);
        for (const file of files) {
            const isMatch = suffixes.some((suffix) => file.endsWith(`${suffix}.ts`) || file.endsWith(`${suffix}.js`));
            if (!isMatch)
                continue;
            const fullPath = (0, path_1.join)(subPath, file);
            const filePathWithoutExt = fullPath
                .replace(/\.ts$/, "")
                .replace(/\.js$/, "");
            try {
                const module = require(filePathWithoutExt);
                const exportedClass = Object.values(module)[0];
                results.push(exportedClass);
            }
            catch (error) {
                console.warn(`⚠️ Failed to load class from: ${fullPath}`, error);
            }
        }
    }
    return results;
};
exports.lazyLoadClasses = lazyLoadClasses;
//# sourceMappingURL=index.js.map