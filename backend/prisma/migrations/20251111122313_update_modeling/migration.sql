/*
  Warnings:

  - The `status` column on the `Indication` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Intention` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "status_intention" AS ENUM ('aceita', 'pendente', 'recusada');

-- CreateEnum
CREATE TYPE "status_indication" AS ENUM ('nova', 'em_andamento', 'fechada');

-- DropForeignKey
ALTER TABLE "Indication" DROP CONSTRAINT "Indication_origin_member_id_fkey";

-- DropForeignKey
ALTER TABLE "Indication" DROP CONSTRAINT "Indication_target_member_id_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_intention_id_fkey";

-- AlterTable
ALTER TABLE "Indication" DROP COLUMN "status",
ADD COLUMN     "status" "status_indication" NOT NULL DEFAULT 'nova';

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "Intention";

-- DropTable
DROP TABLE "Member";

-- DropEnum
DROP TYPE "Status";

-- CreateTable
CREATE TABLE "intention" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "business_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "reason_participation" TEXT NOT NULL,
    "is_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "intention_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "member" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "intention_id" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "phone" TEXT NOT NULL,
    "token" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "member_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "intention_public_id_key" ON "intention"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "member_public_id_key" ON "member"("public_id");

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_intention_id_fkey" FOREIGN KEY ("intention_id") REFERENCES "intention"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Indication" ADD CONSTRAINT "Indication_origin_member_id_fkey" FOREIGN KEY ("origin_member_id") REFERENCES "member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Indication" ADD CONSTRAINT "Indication_target_member_id_fkey" FOREIGN KEY ("target_member_id") REFERENCES "member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
