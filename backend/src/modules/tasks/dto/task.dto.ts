import { ExposeApiProperty, ExposeOptionalApiProperty } from "@/decorators/expose-api-property.decorator";
import { Optional } from "@/decorators/optional.decorator";
import { Task } from "@/prisma/generated/client";
import { TaskPriority, TaskStatus } from "@/prisma/generated/enums";
import { IsDateString, IsEnum, IsString, Length } from "class-validator";



// Helps us catch errors if we add new fields
interface CreateTask extends Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'createdById'> { }


export class CreateTaskDto implements CreateTask {
    @ExposeApiProperty({ example: 'Task title' })
    @IsString({ message: 'Title is invalid' })
    @Length(3, 50, { message: 'Title must be between 3 and 50 characters' })
    title: string;

    @ExposeApiProperty({ example: 'Task description' })
    @IsString({ message: 'Description is invalid', })
    @Length(3, 255, { message: 'Description must be between 3 and 255 characters' })
    description: string;

    @ExposeOptionalApiProperty({ example: '2023-01-01T00:00:00.000Z' })
    @Optional()
    @IsDateString({}, { message: 'Due date is invalid' })
    dueDate: Date | null

    @ExposeApiProperty({ example: TaskPriority.LOW, enum: TaskPriority })
    @IsEnum(TaskPriority, { message: 'Priority is invalid' })
    priority: TaskPriority;

    @ExposeApiProperty({ example: TaskStatus.TODO, enum: TaskStatus })
    @IsEnum(TaskStatus, { message: 'Status is invalid' })
    status: TaskStatus;

    @ExposeApiProperty({ example: 'cd2d2d2d-2d2d-2d2d-2d2d-2d2d2d2d2d2d' })
    @Optional()
    @IsString({ message: 'Assigned to is invalid' })
    assignedToId: string | null;
}

export class UpdateTaskDto implements Partial<CreateTask> {
    @ExposeOptionalApiProperty({ example: 'Task title', })
    @Optional()
    @IsString({ message: 'Title is invalid' })
    @Length(3, 50, { message: 'Title must be between 3 and 50 characters' })
    title?: string;

    @ExposeOptionalApiProperty({ example: 'Task description' })
    @Optional()
    @IsString({ message: 'Description is invalid', })
    @Length(3, 255, { message: 'Description must be between 3 and 255 characters' })
    description?: string;

    @ExposeOptionalApiProperty({ example: '2023-01-01T00:00:00.000Z' })
    @Optional()
    @IsDateString({}, { message: 'Due date is invalid' })
    dueDate?: Date

    @ExposeOptionalApiProperty({ example: TaskPriority.LOW, enum: TaskPriority })
    @Optional()
    @IsEnum(TaskPriority, { message: 'Priority is invalid' })
    priority?: TaskPriority;

    @ExposeOptionalApiProperty({ example: TaskStatus.TODO, enum: TaskStatus })
    @Optional()
    @IsEnum(TaskStatus, { message: 'Status is invalid' })
    status?: TaskStatus;

    @ExposeApiProperty({ example: 'cd2d2d2d-2d2d-2d2d-2d2d-2d2d2d2d2d2d', description: "Sending null or undefined will remove the assigned to" })
    @Optional()
    @IsString({ message: 'Assigned to is invalid' })
    assignedToId: string | null;
}