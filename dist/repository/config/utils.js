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
exports.getDefRepositoryToken = getDefRepositoryToken;
exports.getEntityByRepository = getEntityByRepository;
exports.loadRepositoriesFromPath = loadRepositoriesFromPath;
const typeorm_1 = require("typeorm");
const constants_1 = require("./constants");
const fast_glob_1 = __importDefault(require("fast-glob"));
function getDefRepositoryToken(repository, dataSource = constants_1.DEFAULT_CONNECTION_NAME) {
    if (!repository) {
        throw new Error('repository is not empty');
    }
    const connectionPrefix = getDataSourcePrefix(dataSource);
    if (repository instanceof Function && repository.prototype instanceof typeorm_1.Repository) {
        if (!connectionPrefix) {
            return repository;
        }
        return `${connectionPrefix}${getToken(repository)}`;
    }
    return `${connectionPrefix}${repository.name}Repository`;
}
function getEntityByRepository(repository) {
    const entity = Reflect.getMetadata(constants_1.ENTITY_METADATA_KEY, repository);
    if (!entity) {
        throw new Error(`Repository: ${repository.name} undetermined entity`);
    }
    return entity;
}
function getToken(repository) {
    return repository.name;
}
function getDataSourcePrefix(dataSource = constants_1.DEFAULT_CONNECTION_NAME) {
    if (dataSource === constants_1.DEFAULT_CONNECTION_NAME) {
        return '';
    }
    if (typeof dataSource === 'string') {
        return dataSource + '_';
    }
    if (dataSource.name === constants_1.DEFAULT_CONNECTION_NAME || !dataSource.name) {
        return '';
    }
    return dataSource.name + '_';
}
async function loadRepositoriesFromPath(pattern) {
    const files = await (0, fast_glob_1.default)(pattern, { absolute: true });
    const repositories = [];
    for (const file of files) {
        const moduleExports = await Promise.resolve(`${file}`).then(s => __importStar(require(s)));
        for (const value of Object.values(moduleExports)) {
            if (typeof value === 'function') {
                repositories.push(value);
            }
        }
    }
    return repositories;
}
//# sourceMappingURL=utils.js.map