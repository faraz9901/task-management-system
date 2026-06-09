
export const TaskPriority = {
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH',
    CRTICAL: 'CRTICAL'
} as const

export type TaskPriority = typeof TaskPriority[keyof typeof TaskPriority]

export const TaskStatus = {
    TODO: 'TODO',
    IN_PROGRESS: 'IN_PROGRESS',
    DONE: 'DONE'
} as const

export type TaskStatus = typeof TaskStatus[keyof typeof TaskStatus]


export interface CreateTaskDto {
    title: string;
    description: string;
    dueDate: Date | null
    priority: TaskPriority;
    status: TaskStatus;
    assignedToId: string | null;
}

export interface UpdateTaskDto {
    title?: string;
    description?: string;
    dueDate?: Date
    priority?: TaskPriority;
    status?: TaskStatus;
    assignedToId: string | null;
}