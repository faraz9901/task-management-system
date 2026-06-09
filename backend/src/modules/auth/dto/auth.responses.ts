import { ExposeApiProperty } from "@/decorators/expose-api-property.decorator";
import { Role, User } from "@/prisma/generated/client";
import { IsDate, IsEmail, IsEnum, IsString } from "class-validator";

export class LoginResponse {
    @IsString()
    @ExposeApiProperty({ example: 'example-token' })
    token: string;
}

interface UserResponseDto extends Omit<User, 'passwordHash'> { }

export class UserResponse implements UserResponseDto {
    @IsString()
    @ExposeApiProperty({ example: 'cd2d2d2d-2d2d-2d2d-2d2d-2d2d2d2d2d2d' })
    id: string;

    @ExposeApiProperty({ example: 'john@example.com' })
    @IsEmail()
    email: string;

    @ExposeApiProperty({ example: 'admin' })
    @IsEnum(Role, { message: 'Role is invalid' })
    role: Role;

    @ExposeApiProperty({ example: 'John Doe' })
    @IsString({ message: 'Name is invalid' })
    name: string;

    @ExposeApiProperty({ example: '2023-01-01T00:00:00.000Z' })
    @IsDate()
    createdAt: Date;

    @ExposeApiProperty({ example: '2023-01-01T00:00:00.000Z' })
    @IsDate()
    updatedAt: Date;
}
