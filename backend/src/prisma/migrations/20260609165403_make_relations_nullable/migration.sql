-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_assignedById_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_assignedToId_fkey";

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "assignedById" DROP NOT NULL,
ALTER COLUMN "assignedToId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_assignedById_fkey" FOREIGN KEY ("assignedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
