import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt/jwt.guard';


export const AuthRequired = () => applyDecorators(
    UseGuards(JwtAuthGuard),
)