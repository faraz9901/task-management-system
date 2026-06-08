import { configService } from "@/config/config.service";
import { prisma } from "@/utils/prismaClient";
import * as argon2 from "argon2";



async function seedAdmin() {


    const adminName = configService.getValue("ADMIN_NAME", false);
    const adminEmail = configService.getValue("ADMIN_EMAIL", false);
    const adminPassword = configService.getValue("ADMIN_PASSWORD", false);


    if (!adminEmail || !adminPassword) {
        throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env to seed admin");
    }


    const existingUser = await prisma.user.findUnique({
        where: {
            email: adminEmail,
        }
    });


    const hashPassword = await argon2.hash(adminPassword);

    if (existingUser) {
        console.log("Admin already exists");
        console.log("Updating password");
        existingUser.passwordHash = hashPassword;

        await prisma.user.update({
            where: {
                email: adminEmail,
            },
            data: {
                passwordHash: hashPassword,
                name: adminName
            }
        });


        console.log("Password updated");
        return;
    }

    await prisma.user.create({
        data: {
            name: adminName,
            email: adminEmail,
            passwordHash: hashPassword,
            role: "ADMIN",
        }
    });

    console.log("Admin created");

    await prisma.$disconnect();
}


seedAdmin();