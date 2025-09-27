"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefEntityRepository = DefEntityRepository;
exports.InjectRepo = InjectRepo;
const common_1 = require("@nestjs/common");
const constants_1 = require("../config/constants");
const utils_1 = require("../config/utils");
function DefEntityRepository(target) {
    return function (constructor) {
        Reflect.defineMetadata(constants_1.ENTITY_METADATA_KEY, target, constructor);
    };
}
function InjectRepo(repository, dataSource = 'default') {
    return (0, common_1.Inject)((0, utils_1.getDefRepositoryToken)(repository, dataSource));
}
//# sourceMappingURL=index.js.map