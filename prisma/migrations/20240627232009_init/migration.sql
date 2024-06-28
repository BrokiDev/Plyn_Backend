-- DropForeignKey
ALTER TABLE "roles" DROP CONSTRAINT "roles_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_passwords" DROP CONSTRAINT "user_passwords_userId_fkey";

-- AlterTable
ALTER TABLE "roles" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "user_passwords" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "companyName" TEXT;

-- AddForeignKey
ALTER TABLE "user_passwords" ADD CONSTRAINT "user_passwords_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
