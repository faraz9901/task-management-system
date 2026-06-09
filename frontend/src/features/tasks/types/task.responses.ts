import type { User } from "@/features/auth/types/auth.responses";
import type { TaskPriority, TaskStatus } from "./task.dto";

export interface TaskResponse {
    id: string;
    title: string;
    description: string;
    priority: TaskPriority;
    status: TaskStatus
    dueDate: Date | null
    createdById: string;
    assignedToId: string | null;
    createdBy?: User | null
    assignedTo?: User | null
    createdAt: Date;
    updatedAt: Date;
}

