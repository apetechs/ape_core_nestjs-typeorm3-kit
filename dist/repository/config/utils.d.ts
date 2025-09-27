import { DataSource, DataSourceOptions } from 'typeorm';
import { Repository } from './types';
export declare function getDefRepositoryToken(repository: Repository, dataSource?: string | DataSource | DataSourceOptions): string | Repository;
export declare function getEntityByRepository(repository: Repository): any;
export declare function loadRepositoriesFromPath(pattern: string): Promise<any[]>;
//# sourceMappingURL=utils.d.ts.map