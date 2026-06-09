import { BaseService } from '@/common/base.service';
import { HTTPEXCEPTION } from '@/common/errors';
import { Task, User } from '@/prisma/generated/client';
import { prisma } from '@/utils/prismaClient';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/task.dto';
import { TaskResponse } from './dto/task.responses';

@Injectable()
export class TasksService extends BaseService {
    constructor() {
        super();
    }
    private isUserAllowed(user: User, task: Task) {
        if (user.role === "ADMIN") {
            return true;
        }

        if (user.id !== task.createdById && user.id !== task.assignedToId) {
            return false;
        }

        return true;
    }

    async createTask(dto: CreateTaskDto, userId: string): Promise<TaskResponse> {
        const task = await prisma.task.create({ data: { ...dto, createdById: userId } });
        return task;
    }

    async getTask(id: string, user: User): Promise<TaskResponse> {

        const task = await prisma.task.findUnique({ where: { id }, include: { assignedTo: true, createdBy: true } });

        if (!task) {
            throw HTTPEXCEPTION.NOT_FOUND('Task not found');
        }

        if (!user) {
            throw HTTPEXCEPTION.NOT_FOUND('User not found');
        }

        const isUserAllowedToViewThis = this.isUserAllowed(user, task);


        if (!isUserAllowedToViewThis) {
            throw HTTPEXCEPTION.UNAUTHORIZED('You are not authorized to view this task');
        }


        return task;
    }


    async getAllTasks(): Promise<TaskResponse[]> {

        const tasks = await prisma.task.findMany({
            include: {
                assignedTo: true,
                createdBy: true,
            },
        });

        return tasks;
    }


    async getUserTasks(userId: string): Promise<TaskResponse[]> {
        const tasks = await prisma.task.findMany({
            where: {
                OR: [
                    { createdById: userId },
                    { assignedToId: userId },
                ],
            },
            include: {
                assignedTo: true,
                createdBy: true,
            },
        });

        return tasks;
    }


    async updateTask(id: string, dto: CreateTaskDto, user: User): Promise<TaskResponse> {

        const existingTask = await prisma.task.findUnique({ where: { id } });

        if (!user) {
            throw HTTPEXCEPTION.NOT_FOUND('User not found');
        }

        if (!existingTask) {
            throw HTTPEXCEPTION.NOT_FOUND('Task not found');
        }

        const isUserAllowedToUpdate = this.isUserAllowed(user, existingTask);


        if (!isUserAllowedToUpdate) {
            throw HTTPEXCEPTION.UNAUTHORIZED('You are not authorized to update this task');
        }


        if (user.role === "MANAGER") {
            Object.assign(existingTask, dto);
        } else {
            existingTask.status = dto.status
            existingTask.title = dto.title
            existingTask.description = dto.description
        }

        return await prisma.task.update({ where: { id }, data: existingTask });
    }


    async deleteTask(id: string, user: User) {

        const existingTask = await prisma.task.findUnique({ where: { id } });


        if (!existingTask) {
            throw HTTPEXCEPTION.NOT_FOUND('Task not found');
        }


        if (!user) {
            throw HTTPEXCEPTION.NOT_FOUND('User not found');
        }

        const isUserAdmin = user.role === 'ADMIN';

        if (user.id !== existingTask.createdById && !isUserAdmin) {
            throw HTTPEXCEPTION.UNAUTHORIZED('You are not authorized to delete this task');
        }


        return await prisma.task.delete({ where: { id } });
    }


}
