import { useRole } from "@/features/auth/hooks/useAuth"
import { Role } from "@/features/auth/types/auth.responses"
import { onError } from "@/lib/utils"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { taskApi } from "../api/taskApi"
import type { CreateTaskDto, TaskQueryDto, UpdateTaskDto } from "../types/task.dto"

export const TASK_KEYS = {
    base: ['tasks'],
    all: (query: TaskQueryDto) => ['tasks', query],
    me: (query: TaskQueryDto) => ['tasks', 'me', query],
    one: (id: string) => ['tasks', id],
}



export const useTasks = (query: TaskQueryDto) => {
    const role = useRole()

    return useQuery({
        queryKey: TASK_KEYS.all(query),
        queryFn: () => taskApi.getTasks(query),
        enabled: role === Role.ADMIN
    })
}


export const useTask = (id: string) => {
    return useQuery({
        queryKey: TASK_KEYS.one(id),
        queryFn: () => taskApi.getTask(id),
    })
}


export const useMyTasks = (query: TaskQueryDto) => {
    const role = useRole()

    return useQuery({
        queryKey: TASK_KEYS.me(query),
        queryFn: () => taskApi.getMyTasks(query),
        enabled: role !== Role.ADMIN
    })
}


export const useCreateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateTaskDto) => taskApi.createTask(data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: TASK_KEYS.base });
        },
        onError: onError
    });
}

export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => taskApi.deleteTask(id),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: TASK_KEYS.base });
        },
        onError: onError
    });
}


export const useUpdateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { id: string, task: UpdateTaskDto }) => taskApi.updateTask(data.id, data.task),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: TASK_KEYS.base });
        },
        onError: onError
    });
}
