import type { DataSource, DataSourceOptions, EntityTarget, ObjectLiteral } from 'typeorm';
import { Repository } from '../config/types';
export declare function DefEntityRepository(target: EntityTarget<ObjectLiteral>): (constructor: {
    new (...args: any[]): any;
}) => void;
export declare function InjectRepo(repository: Repository, dataSource?: string | DataSource | DataSourceOptions): PropertyDecorator & ParameterDecorator;
//# sourceMappingURL=index.d.ts.map