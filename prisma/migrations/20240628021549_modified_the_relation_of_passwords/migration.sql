-- DropIndex
DROP INDEX "user_passwords_userId_key";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "passwordId" TEXT;
