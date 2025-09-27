import { ValidationOptions } from "class-validator";
import { CountryCode } from "libphonenumber-js";
export interface IValidationOptions extends ValidationOptions {
    required?: boolean;
}
export declare function IsPhoneNumber(region: CountryCode, validationOptions?: ValidationOptions): PropertyDecorator;
export declare function IsNumber(validationOptions?: IValidationOptions): PropertyDecorator;
export declare function IsLongerThan(property: string, validationOptions?: ValidationOptions): PropertyDecorator;
//# sourceMappingURL=index.d.ts.map