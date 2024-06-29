/*
  Warnings:

  - You are about to drop the column `expireAt` on the `user_tokens` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_tokens" DROP COLUMN "expireAt",
ADD COLUMN     "expiredAt" TIMESTAMP(3);
