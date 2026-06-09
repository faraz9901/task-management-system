import { onError } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../api/userApi";
import type { CreateUserDto, UpdateUserDto, UserQueryDto } from "../types/user.types";

export const USER_KEYS = {
    all: ['users'],
    list: (query: UserQueryDto) => ['users', 'list', query],
    one: (id: string) => ['users', id],
}


export const useUsers = (query: UserQueryDto) => {
    return useQuery({
        queryKey: USER_KEYS.list(query),
        queryFn: () => userApi.getAllUsers(query),
    })
};


export const useUser = (id: string) => {
    return useQuery({
        queryKey: USER_KEYS.one(id),
        queryFn: () => userApi.getOneUser(id),
    })
};

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateUserDto) => userApi.createUser(data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: USER_KEYS.all });
        },
        onError: onError
    });
}



export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { id: string, user: UpdateUserDto }) => userApi.updateUser(data.id, data.user),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: USER_KEYS.all });
        },
        onError: onError
    });
}

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => userApi.deleteUser(id),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: USER_KEYS.all });
        },
        onError: onError
    });
}