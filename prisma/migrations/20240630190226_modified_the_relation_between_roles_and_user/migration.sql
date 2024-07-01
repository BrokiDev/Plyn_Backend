-- DropIndex
DROP INDEX "roles_userId_key";

-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updateAt" TIMESTAMP(3),
ALTER COLUMN "name" SET DEFAULT 'USER';
