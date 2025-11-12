import prisma from "../database/PrismaClient";
import { intention } from "@prisma/client";
import { randomBytes } from "crypto";

export async function createIntention(
  data: Omit<intention, "id" | "public_id" | "created_at" | "updated_at">
) {
  return prisma.intention.create({ data });
}

export async function getIntentions() {
  return prisma.intention.findMany({
    orderBy: {
      created_at: 'desc'
    }
  });
}

export async function getIntentionById(public_id: string) {
  return prisma.intention.findUnique({ where: { public_id } });
}

export async function updateIntention(
  public_id: string,
  data: Partial<intention>
) {
  console.log("updateIntention: Received public_id:", public_id);
  console.log("updateIntention: Received data:", data);

  const updatedIntention = await prisma.intention.update({
    where: { public_id },
    data,
  });

  return { intention: updatedIntention };
}

export async function approveIntention(public_id: string) {
  try {
    const intention = await prisma.intention.findUnique({
      where: { public_id },
    });

    if (!intention) {
      throw new Error("Intenção não encontrada");
    }

    if (intention.status === "aceita") {
      throw new Error("Esta intenção já foi aprovada.");
    }

    const existingMember = await prisma.member.findFirst({
      where: { intention_id: intention.id },
    });

    if (existingMember) {
      throw new Error("Já existe um membro para esta intenção.");
    }

    const updatedIntention = await prisma.intention.update({
      where: { public_id },
      data: { status: "aceita", is_confirmed: true },
    });

    const token = randomBytes(20).toString("hex");
    const newMember = await prisma.member.create({
      data: {
        intention_id: updatedIntention.id,
        token: token,
        name: updatedIntention.name,
        email: updatedIntention.email,
        business_name: updatedIntention.business_name,
      },
    });

    return { intention: updatedIntention, member: newMember };
  } catch (error) {
    console.error("Error in approveIntention:", error);
    throw error;
  }
}

export async function refuseIntention(public_id: string) {
  const intention = await prisma.intention.findUnique({
    where: { public_id },
  });

  if (!intention) {
    throw new Error("Intenção não encontrada");
  }

  const updatedIntention = await prisma.intention.update({
    where: { public_id },
    data: { status: "recusada" },
  });

  return { intention: updatedIntention };
}

export async function deleteIntention(public_id: string) {
  return prisma.intention.delete({ where: { public_id } });
}
