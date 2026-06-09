import { BaseController } from '@/common/base.controller';
import { AuthRequired, GetUser } from '@/common/jwt/auth.decorator';
import { EmptyResponse } from '@/common/swagger';
import { ApiRes } from '@/decorators/api-responses.decorator';
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { UserResponse } from './dto/auth.responses';


const cookieOptions = {
    httpOnly: true
}

@Controller('auth')
@ApiTags('Auth')
export class AuthController extends BaseController {
    constructor(private authService: AuthService) {
        super();
    }

    @ApiRes('Login', EmptyResponse)
    @Post('login')
    async login(
        @Body() body: LoginDto,
        @Res({ passthrough: true }) res: Response
    ) {
        const result = await this.authService.login(body.email, body.password);

        res.cookie('token', result.token, cookieOptions);

        return this.respondOk(null, "Login successful");
    }

    @AuthRequired()
    @ApiRes('Login', UserResponse)
    @Get("me")
    async getMe(@GetUser("id") id: string) {
        const res = await this.authService.getMe(id);
        return this.respondOk(res, "User found");
    }

    @ApiRes('Logout', EmptyResponse)
    @Post('logout')
    async logout(
        @Res({ passthrough: true }) res: Response
    ) {
        res.cookie('token', "", cookieOptions);

        return this.respondOk(null, "Logout successful");
    }

}