import { initializeTransactionalContext } from 'typeorm-transactional';
export function setupTransactionContext() {
  initializeTransactionalContext();
}
