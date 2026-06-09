import { HTTPEXCEPTION } from '@/common/errors';
import { configService } from '@/config/config.service';
import { prisma } from '@/utils/prismaClient';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface DecodedToken {
    sub: string;
    email: string;
    role: string;
}


const cookieExtractor = (req: Request): string | null => {
    if (req?.cookies?.token) {
        return req.cookies.token;
    }
    return null;
};


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                cookieExtractor,
            ]),
            secretOrKey: configService.getValue('JWT_SECRET'),
        });
    }
    async validate(payload: DecodedToken) {


        const user = await prisma.user.findUnique({ where: { id: payload.sub } });

        if (!user) {
            throw HTTPEXCEPTION.UNAUTHORIZED('Session Expired! Please login again.');
        }


        return {
            ...user,
            id: user.id,
            email: user.email,
            role: user.role,
        };
    }
}