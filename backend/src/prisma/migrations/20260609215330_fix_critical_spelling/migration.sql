/*
  Warnings:

  - The values [CRTICAL] on the enum `TaskPriority` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TaskPriority_new" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');
ALTER TABLE "public"."tasks" ALTER COLUMN "priority" DROP DEFAULT;
ALTER TABLE "tasks" ALTER COLUMN "priority" TYPE "TaskPriority_new" USING ("priority"::text::"TaskPriority_new");
ALTER TYPE "TaskPriority" RENAME TO "TaskPriority_old";
ALTER TYPE "TaskPriority_new" RENAME TO "TaskPriority";
DROP TYPE "public"."TaskPriority_old";
ALTER TABLE "tasks" ALTER COLUMN "priority" SET DEFAULT 'MEDIUM';
COMMIT;
