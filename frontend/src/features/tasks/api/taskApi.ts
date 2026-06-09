import { api } from "@/lib/api"
import { ENDPOINTS } from "@/lib/ENDPOINTS"
import type { CreateTaskDto, TaskQueryDto, UpdateTaskDto } from "../types/task.dto"
import { type TaskResponse } from "../types/task.responses"

export const taskApi = {

    getTasks(query: TaskQueryDto) {
        return api.get<TaskResponse[]>(ENDPOINTS.TASK.GET_ALL, { params: query })
    },

    getMyTasks(query: TaskQueryDto) {
        return api.get<TaskResponse[]>(ENDPOINTS.TASK.GET_MY_TASKS, { params: query })
    },

    getTask(id: string) {
        return api.get<TaskResponse>(ENDPOINTS.TASK.GET_ONE(id))
    },

    createTask(data: CreateTaskDto) {
        return api.post(ENDPOINTS.TASK.CREATE, data)
    },

    updateTask(id: string, data: UpdateTaskDto) {
        return api.put(ENDPOINTS.TASK.UPDATE(id), data)
    },

    deleteTask(id: string) {
        return api.delete(ENDPOINTS.TASK.DELETE(id))
    },
}