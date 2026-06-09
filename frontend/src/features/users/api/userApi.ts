import { type User } from "@/features/auth/types/auth.responses";
import { api } from "@/lib/api";
import { ENDPOINTS } from "@/lib/ENDPOINTS";
import type { CreateUserDto, UpdateUserDto, UserQueryDto } from "../types/user.types";

export const userApi = {
    getAllUsers: (query: UserQueryDto) => {
        return api.get<User[]>(ENDPOINTS.USER.GET_ALL, { params: query })
    },

    getOneUser: (id: string) => {
        return api.get<User>(ENDPOINTS.USER.GET_ONE(id))
    },

    createUser: (data: CreateUserDto) => {
        return api.post(ENDPOINTS.USER.CREATE, data)
    },

    updateUser: (id: string, data: UpdateUserDto) => {
        return api.put(ENDPOINTS.USER.UPDATE(id), data)
    },

    deleteUser: (id: string) => {
        return api.delete(ENDPOINTS.USER.DELETE(id))
    },
}