import { EntityManager, EntityTarget, FindOneOptions, ObjectLiteral, QueryRunner, Repository as TypeOrmRepository } from "typeorm";
export interface Repository extends Function {
    new (target: EntityTarget<any>, manager: EntityManager, queryRunner?: QueryRunner): TypeOrmRepository<ObjectLiteral>;
}
export declare class RepositoryWrapper<Entity> extends TypeOrmRepository<Entity> {
    findOne(options?: FindOneOptions<Entity>): Promise<Entity | null>;
}
//# sourceMappingURL=types.d.ts.map