-- CreateEnum
CREATE TYPE "Status" AS ENUM ('nova', 'em_andamento', 'fechada');

-- CreateTable
CREATE TABLE "Intention" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "business_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "reason_participation" TEXT NOT NULL,
    "is_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Intention_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "intention_id" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "phone" TEXT NOT NULL,
    "token" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Indication" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "origin_member_id" INTEGER NOT NULL,
    "target_member_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Indication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Intention_public_id_key" ON "Intention"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "Member_public_id_key" ON "Member"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_public_id_key" ON "Admin"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Indication_public_id_key" ON "Indication"("public_id");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_intention_id_fkey" FOREIGN KEY ("intention_id") REFERENCES "Intention"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Indication" ADD CONSTRAINT "Indication_origin_member_id_fkey" FOREIGN KEY ("origin_member_id") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Indication" ADD CONSTRAINT "Indication_target_member_id_fkey" FOREIGN KEY ("target_member_id") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
