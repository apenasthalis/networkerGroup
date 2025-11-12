import prisma from '../database/PrismaClient';
import { member } from '@prisma/client';

export async function createMember(
  data: Omit<member, 'id' | 'public_id' | 'created_at' | 'updated_at'>
) {
  return prisma.member.create({ data });
}

export async function getMembers() {
  return prisma.member.findMany();
}

export async function getMemberById(public_id: string) {
  return prisma.member.findUnique({ where: { public_id } });
}

export async function updateMember(public_id: string, data: Partial<member>) {
  return prisma.member.update({
    where: { public_id },
    data,
  });
}

export async function deleteMember(public_id: string) {
  return prisma.member.delete({ where: { public_id } });
}

export async function completeMemberRegistration(token: string, formData: any) {
  console.log("Received token:", token);
  console.log("Received formData:", formData);

  const memberToUpdate = await prisma.member.findUnique({
    where: { token },
  });

  if (!memberToUpdate) {
    throw new Error("Membro não encontrado ou token inválido.");
  }

  try {
    const updatedMember = await prisma.member.update({
      where: { token },
      data: {
        phone: formData.telefone,
        address: formData.endereco,
        city: formData.cidade,
        state: formData.estado,
        zip_code: formData.cep,
        linkedin: formData.linkedin,
        position: formData.cargo,
        birth_date: new Date(formData.dataNascimento),
        cpf: formData.cpf,
        education: formData.formacao,
        experience: formData.experiencia,
      },
    });
    return updatedMember;
  } catch (error: any) {
    console.error("Error updating member in completeMemberRegistration:", error);
    throw new Error(`Falha ao completar o cadastro: ${error.message}`);
  }
}
