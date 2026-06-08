import { BaseController } from '@/common/base.controller';
import { ApiRes } from '@/decorators/api-responses.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { LoginResponseDto } from './dto/auth.responses';

@Controller('auth')
@ApiTags('Auth')
export class AuthController extends BaseController {
    constructor(private authService: AuthService) {
        super();
    }

    @ApiRes('Login', LoginResponseDto)
    @Post('login')
    async login(@Body() body: LoginDto) {
        const res = await this.authService.login(body.email, body.password);
        return this.respondOk(res, "Login successful");
    }
}