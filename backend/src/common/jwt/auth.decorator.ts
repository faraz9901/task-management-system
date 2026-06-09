import { applyDecorators, createParamDecorator, ExecutionContext, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtAuthGuard } from './jwt.guard';


export const AuthRequired = () => applyDecorators(
    UseGuards(JwtAuthGuard),
)


export const GetUser = createParamDecorator(
    (data: keyof User | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user as User;

        // if no key is passed, return full user
        if (!data) {
            return user;
        }

        // return only requested field
        return user?.[data];
    },
);