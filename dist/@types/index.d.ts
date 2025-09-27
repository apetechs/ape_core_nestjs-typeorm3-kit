import { HttpStatus, Type } from '@nestjs/common';
export type TRepoClass = {
    getConnectionName: any;
    new (...args: any[]): any;
};
export type TClass = {
    new (...args: any[]): any;
};
export declare class MethodGetOptions {
    summary?: string;
    statusCode?: HttpStatus;
    responseType?: Type<unknown> | Function | [Function] | string;
}
export declare class MethodOptions extends MethodGetOptions {
    bodyType?: Type<unknown> | Function | [Function] | string;
}
//# sourceMappingURL=index.d.ts.map