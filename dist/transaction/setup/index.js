"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTransactionalDataSource = void 0;
exports.setupTransactionContext = setupTransactionContext;
const typeorm_transactional_1 = require("typeorm-transactional");
Object.defineProperty(exports, "addTransactionalDataSource", { enumerable: true, get: function () { return typeorm_transactional_1.addTransactionalDataSource; } });
function setupTransactionContext() {
    (0, typeorm_transactional_1.initializeTransactionalContext)();
}
//# sourceMappingURL=index.js.map