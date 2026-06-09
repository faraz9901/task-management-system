import { BaseController } from '@/common/base.controller';
import { AuthRequired, GetUser } from '@/common/jwt/auth.decorator';
import { Roles } from '@/common/roles/role.decorator';
import { EmptyResponse } from '@/common/swagger';
import { ApiRes } from '@/decorators/api-responses.decorator';
import { User } from '@/prisma/generated/client';
import { Role } from '@/prisma/generated/enums';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTaskDto, TaskQueryDto, UpdateTaskDto } from './dto/task.dto';
import { TaskResponse } from './dto/task.responses';
import { TasksService } from './tasks.service';

@Controller('tasks')
@AuthRequired()
@ApiTags('Tasks')
export class TasksController extends BaseController {

    constructor(private readonly tasksService: TasksService) {
        super();
    }

    @ApiRes('Get task', TaskResponse, HttpStatus.OK, { isArray: true })
    @Roles(Role.ADMIN)
    @Get()
    async getAllTasks(@Query() query: TaskQueryDto) {
        const tasks = await this.tasksService.getAllTasks(query);
        return this.respondOk(tasks, 'Tasks Fetched Successfully');
    }

    @ApiRes('Get user tasks', TaskResponse, HttpStatus.OK, { isArray: true })
    @Get('me')
    async getUserTasks(@GetUser('id') userId: string, @Query() query: TaskQueryDto) {
        const tasks = await this.tasksService.getUserTasks(userId, query);
        return this.respondOk(tasks, 'Tasks Fetched Successfully');
    }

    @ApiRes('Create task', TaskResponse, HttpStatus.CREATED)
    @Roles(Role.ADMIN, Role.MANAGER)
    @Post()
    async createTask(@Body() dto: CreateTaskDto, @GetUser('id') userId: string) {
        const task = await this.tasksService.createTask(dto, userId);
        return this.respondCreated(task, 'Task Created Successfully');
    }


    @ApiRes('Update task', TaskResponse, HttpStatus.OK)
    @Put(':id')
    async updateTask(@Body() dto: UpdateTaskDto, @Param('id') id: string, @GetUser() user: User) {
        const task = await this.tasksService.updateTask(id, dto, user);
        return this.respondOk(task, 'Task Updated Successfully');
    }

    @ApiRes('Delete task', EmptyResponse, HttpStatus.OK)
    @Roles(Role.ADMIN, Role.MANAGER)
    @Delete(':id')
    async deleteTask(@Param('id') id: string, @GetUser() user: User) {
        await this.tasksService.deleteTask(id, user);
        return this.respondOk(null, 'Task Deleted Successfully');
    }


    @ApiRes('Get task', TaskResponse, HttpStatus.OK)
    @Get(':id')
    async getTask(@Param('id') id: string, @GetUser() user: User) {
        const task = await this.tasksService.getTask(id, user);
        return this.respondOk(task, 'Task Fetched Successfully');
    }
}
