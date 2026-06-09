import { BaseService } from '@/common/base.service';
import { HTTPEXCEPTION } from '@/common/errors';
import { hashPassword } from '@/utils/password';
import { prisma } from '@/utils/prismaClient';
import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserQueryDto } from './dto/user.dto';

@Injectable()
export class UserService extends BaseService {

    async getAllUsers(query: UserQueryDto) {
        const { search, role } = query;

        return prisma.user.findMany({
            where: {
                ...(role && { role }),
                ...(search && {
                    OR: [
                        { email: { contains: search, mode: 'insensitive' } },
                        { name: { contains: search, mode: 'insensitive' } },
                    ],
                }),
            },
        });
    }


    async getUser(userId: string) {
        return await prisma.user.findUnique({ where: { id: userId } });
    }


    async createUser(dto: CreateUserDto) {

        const existingUser = await prisma.user.findUnique({ where: { email: dto.email } });

        if (existingUser) {
            throw HTTPEXCEPTION.CONFLICT('User already exists');
        }

        const hashedPassword = await hashPassword(dto.password);

        const user = await prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                passwordHash: hashedPassword,
                role: dto.role
            }
        });

        return user;
    }


    async updateUser(id: string, dto: UpdateUserDto) {
        const existingUser = await prisma.user.findUnique({ where: { id } });

        if (!existingUser) {
            throw HTTPEXCEPTION.NOT_FOUND('User not found');
        }


        if (dto.email) {
            const existingEmail = await prisma.user.findUnique({ where: { email: dto.email } });

            if (existingEmail) {
                throw HTTPEXCEPTION.CONFLICT('Email already exists');
            }

            existingUser.email = dto.email;
        }

        if (dto.password) {
            const hashedPassword = await hashPassword(dto.password);
            existingUser.passwordHash = hashedPassword;
        }

        if (dto.name) {
            existingUser.name = dto.name;
        }

        if (dto.role) {
            existingUser.role = dto.role;
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: existingUser,
        });

        return updatedUser;
    }


    async deleteUser(id: string) {
        return await prisma.user.delete({ where: { id } });
    }
}
