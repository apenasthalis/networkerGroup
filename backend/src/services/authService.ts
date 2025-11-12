import prisma from "../database/PrismaClient";

export async function validateMemberToken(token: string) {
  const member = await prisma.member.findUnique({
    where: { token },
  });

  if (!member) {
    throw new Error("Token inválido ou não encontrado.");
  }

  return { memberId: member.id, name: member.name, email: member.email };
}
