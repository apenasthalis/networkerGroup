import * as memberService from '../memberService';
import prisma from '../../database/PrismaClient';
import { member } from '@prisma/client';

// Mock the PrismaClient
jest.mock('../../database/PrismaClient', () => ({
  member: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('memberService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createMember', () => {
    it('should create a new member', async () => {
      const mockMemberData: Omit<member, 'id' | 'public_id' | 'created_at' | 'updated_at'> = {
        name: 'Test Member',
        email: 'test@example.com',
        business_name: 'Test Business',
        intention_id: 1,
        token: 'test-token',
        is_active: false,
        phone: null,
        address: null,
        city: null,
        state: null,
        zip_code: null,
        linkedin: null,
        position: null,
        birth_date: null,
        cpf: null,
        education: null,
        experience: null,
      };
      const createdMember = { id: 1, public_id: 'abc', created_at: new Date(), updated_at: new Date(), ...mockMemberData };
      (prisma.member.create as jest.Mock).mockResolvedValue(createdMember);

      const result = await memberService.createMember(mockMemberData);

      expect(prisma.member.create).toHaveBeenCalledWith({ data: mockMemberData });
      expect(result).toEqual(createdMember);
    });
  });

  describe('getMembers', () => {
    it('should return a list of members', async () => {
      const mockMembers = [
        { id: 1, public_id: 'abc', name: 'Member 1', email: 'a@a.com', business_name: 'B1', intention_id: 1, is_active: false, token: 't1', created_at: new Date(), updated_at: new Date() },
        { id: 2, public_id: 'def', name: 'Member 2', email: 'b@b.com', business_name: 'B2', intention_id: 2, is_active: false, token: 't2', created_at: new Date(), updated_at: new Date() },
      ];
      (prisma.member.findMany as jest.Mock).mockResolvedValue(mockMembers);

      const result = await memberService.getMembers();

      expect(prisma.member.findMany).toHaveBeenCalledWith();
      expect(result).toEqual(mockMembers);
    });
  });

  describe('getMemberById', () => {
    it('should return a member by public_id', async () => {
      const mockMember = { id: 1, public_id: 'abc', name: 'Member 1', email: 'a@a.com', business_name: 'B1', intention_id: 1, is_active: false, token: 't1', created_at: new Date(), updated_at: new Date() };
      (prisma.member.findUnique as jest.Mock).mockResolvedValue(mockMember);

      const result = await memberService.getMemberById('abc');

      expect(prisma.member.findUnique).toHaveBeenCalledWith({ where: { public_id: 'abc' } });
      expect(result).toEqual(mockMember);
    });

    it('should return null if member not found', async () => {
      (prisma.member.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await memberService.getMemberById('non-existent');

      expect(result).toBeNull();
    });
  });

  describe('updateMember', () => {
    it('should update a member', async () => {
      const updatedData = { name: 'Updated Name' };
      const updatedMember = { id: 1, public_id: 'abc', name: 'Updated Name', email: 'a@a.com', business_name: 'B1', intention_id: 1, is_active: false, token: 't1', created_at: new Date(), updated_at: new Date() };
      (prisma.member.update as jest.Mock).mockResolvedValue(updatedMember);

      const result = await memberService.updateMember('abc', updatedData);

      expect(prisma.member.update).toHaveBeenCalledWith({
        where: { public_id: 'abc' },
        data: updatedData,
      });
      expect(result).toEqual(updatedMember);
    });
  });

  describe('deleteMember', () => {
    it('should delete a member', async () => {
      const deletedMember = { id: 1, public_id: 'abc', name: 'Member 1', email: 'a@a.com', business_name: 'B1', intention_id: 1, is_active: false, token: 't1', created_at: new Date(), updated_at: new Date() };
      (prisma.member.delete as jest.Mock).mockResolvedValue(deletedMember);

      const result = await memberService.deleteMember('abc');

      expect(prisma.member.delete).toHaveBeenCalledWith({ where: { public_id: 'abc' } });
      expect(result).toEqual(deletedMember);
    });
  });

  describe('completeMemberRegistration', () => {
    const mockToken = 'valid-token';
    const mockFormData = {
      telefone: '123456789',
      endereco: 'Rua Teste, 123',
      cidade: 'Cidade Teste',
      estado: 'TS',
      cep: '12345-678',
      linkedin: 'linkedin.com/test',
      cargo: 'Tester',
      dataNascimento: '1990-01-01',
      cpf: '111.222.333-44',
      formacao: 'Superior Completo',
      experiencia: '5 anos',
    };
    const existingMember = {
      id: 1, public_id: 'abc', name: 'Test Member', email: 'test@example.com', business_name: 'Test Business', intention_id: 1, is_active: false, token: mockToken, created_at: new Date(), updated_at: new Date(),
      phone: null, address: null, city: null, state: null, zip_code: null, linkedin: null, position: null, birth_date: null, cpf: null, education: null, experience: null,
    };
    const updatedMember = {
      ...existingMember,
      phone: mockFormData.telefone,
      address: mockFormData.endereco,
      city: mockFormData.cidade,
      state: mockFormData.estado,
      zip_code: mockFormData.cep,
      linkedin: mockFormData.linkedin,
      position: mockFormData.cargo,
      birth_date: new Date(mockFormData.dataNascimento),
      cpf: mockFormData.cpf,
      education: mockFormData.formacao,
      experience: mockFormData.experiencia,
    };

    it('should complete member registration with provided data', async () => {
      (prisma.member.findUnique as jest.Mock).mockResolvedValue(existingMember);
      (prisma.member.update as jest.Mock).mockResolvedValue(updatedMember);

      const result = await memberService.completeMemberRegistration(mockToken, mockFormData);

      expect(prisma.member.findUnique).toHaveBeenCalledWith({ where: { token: mockToken } });
      expect(prisma.member.update).toHaveBeenCalledWith({
        where: { token: mockToken },
        data: {
          phone: mockFormData.telefone,
          address: mockFormData.endereco,
          city: mockFormData.cidade,
          state: mockFormData.estado,
          zip_code: mockFormData.cep,
          linkedin: mockFormData.linkedin,
          position: mockFormData.cargo,
          birth_date: new Date(mockFormData.dataNascimento),
          cpf: mockFormData.cpf,
          education: mockFormData.formacao,
          experience: mockFormData.experiencia,
        },
      });
      expect(result).toEqual(updatedMember);
    });

    it('should throw an error if member not found for the token', async () => {
      (prisma.member.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(memberService.completeMemberRegistration('invalid-token', mockFormData)).rejects.toThrow(
        'Membro não encontrado ou token inválido.'
      );
    });
  });
});
