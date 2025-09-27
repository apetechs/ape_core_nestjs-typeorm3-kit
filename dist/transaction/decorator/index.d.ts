import { Propagation } from 'typeorm-transactional';
export declare function DefTransaction(options?: {
    connectionName?: string | (() => string | undefined);
    propagation?: Propagation;
    isoLevel?: 'READ_UNCOMMITTED' | 'READ_COMMITTED' | 'REPEATABLE_READ' | 'SERIALIZABLE';
}): MethodDecorator;
//# sourceMappingURL=index.d.ts.map