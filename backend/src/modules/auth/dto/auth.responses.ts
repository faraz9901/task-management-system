import { ExposeApiProperty } from "@/decorators/expose-api-property.decorator";
import { Role, User } from "@prisma/client";
import { IsString } from "class-validator";

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

    @IsString()
    @ExposeApiProperty({ example: 'john@example.com' })
    email: string;

    @ExposeApiProperty({ example: 'admin' })
    role: Role;

    @ExposeApiProperty({ example: 'John Doe' })
    name: string;

    @ExposeApiProperty({ example: '2023-01-01T00:00:00.000Z' })
    createdAt: Date;

    @ExposeApiProperty({ example: '2023-01-01T00:00:00.000Z' })
    updatedAt: Date;
}
