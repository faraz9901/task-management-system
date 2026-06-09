import { BaseController } from '@/common/base.controller';
import { AuthRequired } from '@/common/jwt/auth.decorator';
import { Roles } from '@/common/roles/role.decorator';
import { EmptyResponse } from '@/common/swagger';
import { ApiRes } from '@/decorators/api-responses.decorator';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserResponse } from '../auth/dto/auth.responses';
import { CreateUserDto, UpdateUserDto, UserQueryDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('User')
@AuthRequired()
export class UserController extends BaseController {

    constructor(private readonly userService: UserService) {
        super();
    }

    @ApiRes('Create user', UserResponse, HttpStatus.CREATED)
    @Roles('ADMIN')
    @Post()
    async createUser(@Body() dto: CreateUserDto) {
        const user = await this.userService.createUser(dto);
        return this.respondCreated(user, 'User Created Successfully');
    }

    @ApiRes('Get all users', UserResponse, HttpStatus.OK, { isArray: true })
    @Get()
    async getAllUsers(@Query() query: UserQueryDto) {
        const users = await this.userService.getAllUsers(query);
        return this.respondOk(users, 'Users Retrieved Successfully');
    }

    @Get(':id')
    async getUser(@Param('id') id: string) {
        const user = await this.userService.getUser(id);
        return this.respondOk(user, 'User Retrieved Successfully');
    }

    @ApiRes('Update user', UserResponse, HttpStatus.OK)
    @Roles('ADMIN')
    @Put(':id')
    async updateUser(@Body() dto: UpdateUserDto, @Param('id') id: string) {
        const user = await this.userService.updateUser(id, dto);
        return this.respondOk(user, 'User Updated Successfully');
    }


    @ApiRes('Delete user', EmptyResponse, HttpStatus.OK)
    @Roles('ADMIN')
    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        await this.userService.deleteUser(id);
        return this.respondOk(null, 'User Deleted Successfully');
    }

}
