import { ExposeApiProperty, ExposeOptionalApiProperty } from "@/decorators/expose-api-property.decorator";
import { Task } from "@/prisma/generated/client";
import { Optional } from "@nestjs/common";
import { TaskPriority, TaskStatus } from "@prisma/client";
import { IsDateString, IsEnum, IsString } from "class-validator";
import { UserResponse } from "../../auth/dto/auth.responses";


export class TaskResponse implements Task {
    @ExposeApiProperty({ example: 'cd2d2d2d-2d2d-2d2d-2d2d-2d2d2d2d2d2d' })
    @IsString()
    id: string;

    @ExposeApiProperty({ example: 'Task title' })
    @IsString({ message: 'Title is invalid' })
    title: string;

    @ExposeApiProperty({ example: 'Task description' })
    @IsString({ message: 'Description is invalid', })
    description: string;

    @ExposeApiProperty({ example: TaskPriority.LOW, enum: TaskPriority })
    @IsEnum(TaskPriority, { message: 'Priority is invalid' })
    priority: TaskPriority;

    @ExposeApiProperty({ example: TaskStatus.TODO, enum: TaskStatus })
    @IsEnum(TaskStatus, { message: 'Status is invalid' })
    status: TaskStatus;

    @ExposeApiProperty({ example: '2023-01-01T00:00:00.000Z' })
    @Optional()
    @IsDateString()
    dueDate: Date | null

    @ExposeApiProperty({ example: 'cd2d2d2d-2d2d-2d2d-2d2d-2d2d2d2d2d2d' })
    @IsString()
    createdById: string;

    @ExposeApiProperty({ example: 'cd2d2d2d-2d2d-2d2d-2d2d-2d2d2d2d2d2d' })
    @Optional()
    @IsString()
    assignedToId: string | null;


    @ExposeOptionalApiProperty({ type: UserResponse })
    @Optional()
    createdBy?: UserResponse | null

    @ExposeOptionalApiProperty({ type: UserResponse })
    @Optional()
    assignedTo?: UserResponse | null


    @ExposeApiProperty({ example: '2023-01-01T00:00:00.000Z' })
    @IsDateString()
    createdAt: Date;


    @ExposeApiProperty({ example: '2023-01-01T00:00:00.000Z' })
    @IsDateString()
    updatedAt: Date;
}

