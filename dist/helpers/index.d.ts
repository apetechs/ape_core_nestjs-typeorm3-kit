import { INestApplication } from "@nestjs/common";
import { OpenAPIObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
export declare const configSwaggerDocument: (app: INestApplication, document: OpenAPIObject, swaggerPath?: string) => void;
import { Type } from "@nestjs/common";
export declare const lazyLoadClasses: (baseDir: string, suffixes: string[], additionalClasses?: Type<any>[]) => Type<any>[];
//# sourceMappingURL=index.d.ts.map