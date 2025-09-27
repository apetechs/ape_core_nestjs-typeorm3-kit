"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefRepositoryModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const utils_1 = require("../config/utils");
const fast_glob_1 = __importDefault(require("fast-glob"));
const constants_1 = require("../config/constants");
function getProviders(repositories, dataSource) {
    return repositories.map((repository) => {
        const entity = (0, utils_1.getEntityByRepository)(repository);
        return {
            provide: (0, utils_1.getDefRepositoryToken)(repository, dataSource),
            useFactory: (dataSource) => {
                return new repository(entity, dataSource.manager, dataSource === null || dataSource === void 0 ? void 0 : dataSource.createQueryRunner());
            },
            inject: [(0, typeorm_1.getDataSourceToken)(dataSource)],
        };
    });
}
class DefRepositoryModule {
    static forFeature(repositories, dataSource) {
        const providers = getProviders(repositories, dataSource);
        return { module: DefRepositoryModule, providers, exports: providers };
    }
    static async forRoot(options) {
        const repositories = await DefRepositoryModule.loadRepositories(options.globPattern);
        const providers = getProviders(repositories, options.dataSource);
        return { module: DefRepositoryModule, providers, exports: providers };
    }
    static async forRootAsync(options) {
        const asyncProviders = DefRepositoryModule.createAsyncProviders(options);
        const opts = await DefRepositoryModule.resolveOptions(options);
        const repositories = await DefRepositoryModule.loadRepositories(opts.globPattern);
        const providers = getProviders(repositories, opts.dataSource);
        return {
            module: DefRepositoryModule,
            imports: options.imports || [],
            providers: [...asyncProviders, ...providers],
            exports: [...providers],
        };
    }
    static createAsyncProviders(options) {
        if (options.useFactory) {
            return [
                {
                    provide: constants_1.DEF_REPOSITORY_OPTIONS,
                    useFactory: options.useFactory,
                    inject: options.inject || [],
                },
            ];
        }
        const injectClass = options.useClass || options.useExisting;
        if (!injectClass) {
            throw new Error("Invalid async configuration. Must provide useFactory, useClass, or useExisting.");
        }
        const providers = [
            {
                provide: constants_1.DEF_REPOSITORY_OPTIONS,
                useFactory: async (factory) => factory.createDefRepositoryOptions(),
                inject: [injectClass],
            },
        ];
        if (options.useClass) {
            providers.push({ provide: injectClass, useClass: injectClass });
        }
        return providers;
    }
    static async resolveOptions(options) {
        if (options.useFactory) {
            return await options.useFactory(...(options.inject || []));
        }
        const injectClass = options.useClass || options.useExisting;
        if (!injectClass) {
            throw new Error("Missing configuration provider (useClass, useExisting or useFactory).");
        }
        const instance = new injectClass();
        return await instance.createDefRepositoryOptions();
    }
    static async loadRepositories(globPattern) {
        globPattern = globPattern.replace(/\\/g, "/");
        const files = await (0, fast_glob_1.default)(globPattern, { absolute: true });
        const repositories = [];
        for (const file of files) {
            const moduleExports = await Promise.resolve(`${file}`).then(s => __importStar(require(s)));
            for (const exported of Object.values(moduleExports)) {
                if (typeof exported === "function") {
                    const hasEntityMeta = Reflect.hasMetadata(constants_1.ENTITY_METADATA_KEY, exported);
                    if (hasEntityMeta) {
                        repositories.push(exported);
                    }
                }
            }
        }
        return repositories;
    }
}
exports.DefRepositoryModule = DefRepositoryModule;
//# sourceMappingURL=index.js.map