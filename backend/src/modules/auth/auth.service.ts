import { BaseService } from '@/common/base.service';
import { HTTPEXCEPTION } from '@/common/errors';
import { prisma } from '@/utils/prismaClient';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from "argon2";
import { LoginResponseDto } from './dto/auth.responses';


@Injectable()
export class AuthService extends BaseService {
    constructor(private jwtService: JwtService) {
        super();
    }

    async login(email: string, password: string): Promise<LoginResponseDto> {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw HTTPEXCEPTION.UNAUTHORIZED('Invalid credentials');
        }

        const isMatch = await argon2.verify(user.passwordHash, password);

        if (!isMatch) {
            throw HTTPEXCEPTION.UNAUTHORIZED('Invalid credentials');
        }

        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };

        const token = this.jwtService.sign(payload);

        this.logger.info(`User ${user.email} logged in`, { email: user.email, token });


        return {
            token,
        };
    }
}