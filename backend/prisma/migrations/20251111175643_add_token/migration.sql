/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `member` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "intention" ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "member" ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "token" DROP DEFAULT,
ALTER COLUMN "token" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "member_token_key" ON "member"("token");
