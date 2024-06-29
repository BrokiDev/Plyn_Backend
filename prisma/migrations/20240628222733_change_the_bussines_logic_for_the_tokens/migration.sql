/*
  Warnings:

  - You are about to drop the column `active` on the `user_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `user_tokens` table. All the data in the column will be lost.
  - Added the required column `expireAt` to the `user_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_tokens" DROP COLUMN "active",
DROP COLUMN "updateAt",
ADD COLUMN     "expireAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "used" BOOLEAN NOT NULL DEFAULT false;
