import { ControllerOptions } from '@nestjs/common';
import { MethodGetOptions, MethodOptions } from '../../@types';
export declare function DefController(prefix?: string | string[]): ClassDecorator;
export declare function DefController(options: ControllerOptions): ClassDecorator;
export declare function DefGet(path?: string | string[], options?: MethodGetOptions): MethodDecorator;
export declare function DefPost(path?: string | string[], options?: MethodOptions): MethodDecorator;
export declare function DefPut(path?: string | string[], options?: MethodOptions): MethodDecorator;
export declare function DefPatch(path?: string | string[], options?: MethodOptions): MethodDecorator;
export declare function DefDelete(path?: string | string[], options?: MethodOptions): MethodDecorator;
//# sourceMappingURL=index.d.ts.map