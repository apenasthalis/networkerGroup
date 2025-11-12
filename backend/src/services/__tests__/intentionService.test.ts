import * as intentionService from '../intentionService';
import prisma from '../../database/PrismaClient';
import { randomBytes } from 'crypto';
import { intention, status_intention } from '@prisma/client'; // Import intention and status_intention

// Mock the PrismaClient
jest.mock('../../database/PrismaClient', () => ({
  intention: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  member: {
    findFirst: jest.fn(),
    create: jest.fn(),
  },
}));

// Mock randomBytes to return a predictable value for testing
jest.mock('crypto', () => ({
  randomBytes: jest.fn(() => ({
    toString: jest.fn(() => 'mocked-token'),
  })),
}));

describe('intentionService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createIntention', () => {
    it('should create a new intention', async () => {
      const mockIntentionData: Omit<intention, "id" | "public_id" | "created_at" | "updated_at"> = {
        name: 'Test Name',
        email: 'test@example.com',
        business_name: 'Test Business',
        reason_participation: 'Test Reason',
        status: status_intention.pendente, // Use the enum
        is_confirmed: false,
      };
      const createdIntention = { id: 1, public_id: 'abc', created_at: new Date(), updated_at: new Date(), ...mockIntentionData };
      (prisma.intention.create as jest.Mock).mockResolvedValue(createdIntention);

      const result = await intentionService.createIntention(mockIntentionData);

      expect(prisma.intention.create).toHaveBeenCalledWith({ data: mockIntentionData });
      expect(result).toEqual(createdIntention);
    });
  });

  describe('getIntentions', () => {
    it('should return a list of intentions', async () => {
      const mockIntentions = [
        { id: 1, public_id: 'abc', name: 'Intention 1', email: 'a@a.com', business_name: 'B1', reason_participation: 'R1', status: status_intention.pendente, is_confirmed: false, created_at: new Date(), updated_at: new Date() },
        { id: 2, public_id: 'def', name: 'Intention 2', email: 'b@b.com', business_name: 'B2', reason_participation: 'R2', status: status_intention.aceita, is_confirmed: true, created_at: new Date(), updated_at: new Date() },
      ];
      (prisma.intention.findMany as jest.Mock).mockResolvedValue(mockIntentions);

      const result = await intentionService.getIntentions();

      expect(prisma.intention.findMany).toHaveBeenCalledWith({
        orderBy: {
          created_at: 'desc'
        }
      });
      expect(result).toEqual(mockIntentions);
    });
  });

  describe('getIntentionById', () => {
    it('should return an intention by public_id', async () => {
      const mockIntention = { id: 1, public_id: 'abc', name: 'Intention 1', email: 'a@a.com', business_name: 'B1', reason_participation: 'R1', status: status_intention.pendente, is_confirmed: false, created_at: new Date(), updated_at: new Date() };
      (prisma.intention.findUnique as jest.Mock).mockResolvedValue(mockIntention);

      const result = await intentionService.getIntentionById('abc');

      expect(prisma.intention.findUnique).toHaveBeenCalledWith({ where: { public_id: 'abc' } });
      expect(result).toEqual(mockIntention);
    });

    it('should return null if intention not found', async () => {
      (prisma.intention.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await intentionService.getIntentionById('non-existent');

      expect(result).toBeNull();
    });
  });

  describe('updateIntention', () => {
    it('should update an intention', async () => {
      const updatedData = { name: 'Updated Name' };
      const updatedIntention = { id: 1, public_id: 'abc', name: 'Updated Name', email: 'a@a.com', business_name: 'B1', reason_participation: 'R1', status: status_intention.pendente, is_confirmed: false, created_at: new Date(), updated_at: new Date() };
      (prisma.intention.update as jest.Mock).mockResolvedValue(updatedIntention);

      const result = await intentionService.updateIntention('abc', updatedData);

      expect(prisma.intention.update).toHaveBeenCalledWith({
        where: { public_id: 'abc' },
        data: updatedData,
      });
      expect(result).toEqual({ intention: updatedIntention });
    });
  });

  describe('approveIntention', () => {
    const mockIntention = { id: 1, public_id: 'abc', name: 'Test Name', email: 'test@example.com', business_name: 'Test Business', reason_participation: 'Test Reason', status: status_intention.pendente, is_confirmed: false, created_at: new Date(), updated_at: new Date() };
    const updatedIntention = { ...mockIntention, status: status_intention.aceita, is_confirmed: true };
    const newMember = { id: 1, intention_id: 1, token: 'mocked-token', name: 'Test Name', email: 'test@example.com', business_name: 'Test Business' };

    it('should approve an intention and create a member', async () => {
      (prisma.intention.findUnique as jest.Mock).mockResolvedValue(mockIntention);
      (prisma.member.findFirst as jest.Mock).mockResolvedValue(null);
      (prisma.intention.update as jest.Mock).mockResolvedValue(updatedIntention);
      (prisma.member.create as jest.Mock).mockResolvedValue(newMember);

      const result = await intentionService.approveIntention('abc');

      expect(prisma.intention.findUnique).toHaveBeenCalledWith({ where: { public_id: 'abc' } });
      expect(prisma.member.findFirst).toHaveBeenCalledWith({ where: { intention_id: mockIntention.id } });
      expect(prisma.intention.update).toHaveBeenCalledWith({
        where: { public_id: 'abc' },
        data: { status: status_intention.aceita, is_confirmed: true },
      });
      expect(randomBytes).toHaveBeenCalledWith(20);
      expect(prisma.member.create).toHaveBeenCalledWith({
        data: {
          intention_id: updatedIntention.id,
          token: 'mocked-token',
          name: updatedIntention.name,
          email: updatedIntention.email,
          business_name: updatedIntention.business_name,
        },
      });
      expect(result).toEqual({ intention: updatedIntention, member: newMember });
    });

    it('should throw an error if intention not found', async () => {
      (prisma.intention.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(intentionService.approveIntention('non-existent')).rejects.toThrow(
        'Intenção não encontrada'
      );
    });

    it('should throw an error if intention is already approved', async () => {
      (prisma.intention.findUnique as jest.Mock).mockResolvedValue({ ...mockIntention, status: status_intention.aceita });

      await expect(intentionService.approveIntention('abc')).rejects.toThrow(
        'Esta intenção já foi aprovada.'
      );
    });

    it('should throw an error if member already exists for this intention', async () => {
      (prisma.intention.findUnique as jest.Mock).mockResolvedValue(mockIntention);
      (prisma.member.findFirst as jest.Mock).mockResolvedValue({ id: 1, intention_id: mockIntention.id });

      await expect(intentionService.approveIntention('abc')).rejects.toThrow(
        'Já existe um membro para esta intenção.'
      );
    });
  });

  describe('refuseIntention', () => {
    const mockIntention = { id: 1, public_id: 'abc', name: 'Test Name', email: 'test@example.com', business_name: 'Test Business', reason_participation: 'Test Reason', status: status_intention.pendente, is_confirmed: false, created_at: new Date(), updated_at: new Date() };
    const refusedIntention = { ...mockIntention, status: status_intention.recusada };

    it('should refuse an intention', async () => {
      (prisma.intention.findUnique as jest.Mock).mockResolvedValue(mockIntention);
      (prisma.intention.update as jest.Mock).mockResolvedValue(refusedIntention);

      const result = await intentionService.refuseIntention('abc');

      expect(prisma.intention.findUnique).toHaveBeenCalledWith({ where: { public_id: 'abc' } });
      expect(prisma.intention.update).toHaveBeenCalledWith({
        where: { public_id: 'abc' },
        data: { status: status_intention.recusada },
      });
      expect(result).toEqual({ intention: refusedIntention });
    });

    it('should throw an error if intention not found', async () => {
      (prisma.intention.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(intentionService.refuseIntention('non-existent')).rejects.toThrow(
        'Intenção não encontrada'
      );
    });
  });

  describe('deleteIntention', () => {
    it('should delete an intention', async () => {
      const deletedIntention = { id: 1, public_id: 'abc', name: 'Test Name', email: 'test@example.com', business_name: 'Test Business', reason_participation: 'Test Reason', status: status_intention.pendente, is_confirmed: false, created_at: new Date(), updated_at: new Date() };
      (prisma.intention.delete as jest.Mock).mockResolvedValue(deletedIntention);

      const result = await intentionService.deleteIntention('abc');

      expect(prisma.intention.delete).toHaveBeenCalledWith({ where: { public_id: 'abc' } });
      expect(result).toEqual(deletedIntention);
    });
  });
});
