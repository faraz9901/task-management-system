import { ExposeApiProperty } from "@/decorators/expose-api-property.decorator";
import { Optional } from "@/decorators/optional.decorator";
import { IsStrongPassword } from "@/modules/auth/dto/auth.dto";
import { Role } from "@prisma/client";
import { IsEmail, IsEnum, IsString, Length } from "class-validator";

export class CreateUserDto {
    @ExposeApiProperty({ example: 'john@example.com' })
    @IsString({ message: 'Email is invalid' })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;

    @ExposeApiProperty({ example: 'John Doe' })
    @IsString({ message: 'Name is invalid' })
    @Length(3, 50, { message: 'Name must be between 3 and 50 characters' })
    name: string;

    @ExposeApiProperty({ example: 'Strong@789' })
    @IsStrongPassword({ message: 'Password must be at least 8 characters long and include at least one letter, one number, and one special character' })
    password: string;


    @ExposeApiProperty({ example: Role.ADMIN, enum: Role })
    @IsEnum(Role, { message: 'Role is invalid' })
    role: Role
}

export class UpdateUserDto {
    @ExposeApiProperty({ example: 'john@example.com', required: false })
    @Optional()
    @IsString({ message: 'Email is invalid' })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email?: string;

    @ExposeApiProperty({ example: 'John Doe', required: false })
    @Optional()
    @IsString({ message: 'Name is invalid' })
    @Length(3, 50, { message: 'Name must be between 3 and 50 characters' })
    name?: string;

    @ExposeApiProperty({ example: 'Strong@789', required: false })
    @Optional()
    @IsStrongPassword({ message: 'Password must be at least 8 characters long and include at least one letter, one number, and one special character' })
    password?: string;


    @ExposeApiProperty({ example: Role.ADMIN, enum: Role, required: false })
    @Optional()
    @IsEnum(Role, { message: 'Role is invalid' })
    role?: Role
}


export class UserQueryDto {

    @ExposeApiProperty({ example: 'john', description: 'Search by name or email ' })
    @Optional()
    @IsString()
    search?: string;


    @ExposeApiProperty({ example: Role.ADMIN, enum: Role })
    @Optional()
    @IsEnum(Role, { message: 'Role is invalid' })
    role?: Role
}


