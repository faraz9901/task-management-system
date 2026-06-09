import { useRole } from "@/features/auth/hooks/useAuth"
import { Role } from "@/features/auth/types/auth.responses"
import { onError } from "@/lib/utils"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { taskApi } from "../api/taskApi"
import type { CreateTaskDto, UpdateTaskDto } from "../types/task.dto"

export const TASK_KEYS = {
    all: ['tasks'],
    me: ['tasks', 'me'],
    one: (id: string) => [...TASK_KEYS.all, id],
}



export const useTasks = () => {

    const role = useRole()


    return useQuery({
        queryKey: TASK_KEYS.all,
        queryFn: () => taskApi.getTasks(),
        enabled: role === Role.ADMIN
    })
}


export const useTask = (id: string) => {
    return useQuery({
        queryKey: TASK_KEYS.one(id),
        queryFn: () => taskApi.getTask(id),
    })
}


export const useMyTasks = () => {
    const role = useRole()

    return useQuery({
        queryKey: TASK_KEYS.me,
        queryFn: () => taskApi.getMyTasks(),
        enabled: role !== Role.ADMIN
    })
}


export const useCreateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateTaskDto) => taskApi.createTask(data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: TASK_KEYS.all });
        },
        onError: onError
    });
}

export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => taskApi.deleteTask(id),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: TASK_KEYS.all });
        },
        onError: onError
    });
}


export const useUpdateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { id: string, task: UpdateTaskDto }) => taskApi.updateTask(data.id, data.task),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: TASK_KEYS.all });
        },
        onError: onError
    });
}
