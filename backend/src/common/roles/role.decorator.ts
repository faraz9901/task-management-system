import { Role } from '@/prisma/generated/enums';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { RolesGuard } from './role.guard';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: Role[]) => applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(JwtAuthGuard, RolesGuard),
)