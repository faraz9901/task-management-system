import { ExposeApiProperty } from '@/decorators/expose-api-property.decorator';
import { IsEmail, IsString, registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsStrongPassword(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isStrongPassword',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, _args: ValidationArguments) {
                    if (typeof value !== 'string') return false;

                    // Minimum 8 chars
                    if (value.length < 8) return false;

                    if (value.length > 20) return false;

                    // At least one letter
                    const hasLetter = /[A-Za-z]/.test(value);

                    // At least one number
                    const hasNumber = /[0-9]/.test(value);

                    // At least one special character
                    const hasSpecial = /[!@#$%^&*(),.?":{}|<>_\-\\/[\]\\+=~`]/.test(value);

                    return hasLetter && hasNumber && hasSpecial;
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be at least 8 characters long upto 20 and include at least one letter, one number, and one special character`;
                },
            },
        });
    };
}



export class LoginDto {
    @ExposeApiProperty({ example: 'john@example.com' })
    @IsString({ message: 'Email must be a string' })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;

    @ExposeApiProperty({ example: 'Strong@789' })
    @IsStrongPassword({ message: 'Password must be at least 8 characters long and include at least one letter, one number, and one special character' })
    password: string;
}