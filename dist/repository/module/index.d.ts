import { DynamicModule, ModuleMetadata, Type } from "@nestjs/common";
import type { DataSource, DataSourceOptions } from "typeorm";
import type { Repository } from "../config/types";
export interface DefRepositoryModuleOptions {
    globPattern: string;
    dataSource?: string | DataSource | DataSourceOptions;
}
export interface DefRepositoryOptionsFactory {
    createDefRepositoryOptions(): Promise<DefRepositoryModuleOptions> | DefRepositoryModuleOptions;
}
export interface DefRepositoryModuleAsyncOptions extends Pick<ModuleMetadata, "imports"> {
    useFactory?: (...args: any[]) => Promise<DefRepositoryModuleOptions> | DefRepositoryModuleOptions;
    useClass?: Type<DefRepositoryOptionsFactory>;
    useExisting?: Type<DefRepositoryOptionsFactory>;
    inject?: any[];
}
export declare class DefRepositoryModule {
    static forFeature(repositories: Repository[], dataSource?: string | DataSource | DataSourceOptions): DynamicModule;
    static forRoot(options: DefRepositoryModuleOptions): Promise<DynamicModule>;
    static forRootAsync(options: DefRepositoryModuleAsyncOptions): Promise<DynamicModule>;
    private static createAsyncProviders;
    private static resolveOptions;
    private static loadRepositories;
}
//# sourceMappingURL=index.d.ts.map