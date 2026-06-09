import type { Role } from "@/features/auth/types/auth.responses";

export interface CreateUserDto {
    email: string;
    name: string;
    password: string;
    role: Role
}

export interface UpdateUserDto {
    email?: string;
    name?: string;
    password?: string;
    role?: Role
}


export interface UserQueryDto {
    search?: string;
    role?: Role
}


