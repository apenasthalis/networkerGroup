import prisma from '../database/PrismaClient';
import { Member } from '@prisma/client';

export async function createMember(
  data: Omit<Member, 'id' | 'public_id' | 'created_at' | 'updated_at'>
) {
  return prisma.member.create({ data });
}

export async function getMembers() {
  return prisma.member.findMany();
}

export async function getMemberById(public_id: string) {
  return prisma.member.findUnique({ where: { public_id } });
}

export async function updateMember(public_id: string, data: Partial<Member>) {
  return prisma.member.update({
    where: { public_id },
    data,
  });
}

export async function deleteMember(public_id: string) {
  return prisma.member.delete({ where: { public_id } });
}
