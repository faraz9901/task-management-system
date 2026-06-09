import { BaseController } from '@/common/base.controller';
import { AuthRequired, GetUser } from '@/common/jwt/auth.decorator';
import { ApiRes } from '@/decorators/api-responses.decorator';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { LoginResponse, UserResponse } from './dto/auth.responses';

@Controller('auth')
@ApiTags('Auth')
export class AuthController extends BaseController {
    constructor(private authService: AuthService) {
        super();
    }

    @ApiRes('Login', LoginResponse)
    @Post('login')
    async login(@Body() body: LoginDto) {
        const res = await this.authService.login(body.email, body.password);
        return this.respondOk(res, "Login successful");
    }

    @AuthRequired()
    @ApiRes('Login', UserResponse)
    @Get("me")
    async getMe(@GetUser("id") id: string) {
        const res = await this.authService.getMe(id);
        return this.respondOk(res, "User found");
    }

}