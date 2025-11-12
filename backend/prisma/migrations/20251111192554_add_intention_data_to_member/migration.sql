/*
  Warnings:

  - Added the required column `business_name` to the `member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "member" ADD COLUMN     "business_name" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT;
