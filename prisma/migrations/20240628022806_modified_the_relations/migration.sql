/*
  Warnings:

  - You are about to drop the column `passwordId` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_passwords" ALTER COLUMN "updateAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "passwordId",
ALTER COLUMN "updateAt" DROP DEFAULT;
