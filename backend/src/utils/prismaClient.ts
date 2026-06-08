import { configService } from "@/config/config.service";
import { PrismaClient } from "@/prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: configService.getValue("DB_URL") });

export const prisma = new PrismaClient({ adapter });