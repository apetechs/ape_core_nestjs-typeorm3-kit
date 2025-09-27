import { ModuleMetadata } from '@nestjs/common/interfaces';
export interface IChildModuleMetadata extends ModuleMetadata {
    prefix?: string;
}
export declare function ChildModule(childMetadata?: IChildModuleMetadata): ClassDecorator;
//# sourceMappingURL=index.d.ts.map