import * as indicationService from '../indicationService';
import prisma from '../../database/PrismaClient';
import { Indication, status_indication } from '@prisma/client';

// Mock the PrismaClient
jest.mock('../../database/PrismaClient', () => ({
  indication: { // Corrected casing here
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('indicationService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createIndication', () => {
    it('should create a new indication', async () => {
      const mockIndicationData: Omit<Indication, 'id' | 'public_id'> = {
        origin_member_id: 1,
        target_member_id: 2,
        description: 'Test Description',
        status: status_indication.nova,
        created_at: new Date(),
        updated_at: new Date(),
      };
      const createdIndication = { id: 1, public_id: 'abc', ...mockIndicationData };
      (prisma.indication.create as jest.Mock).mockResolvedValue(createdIndication); // Corrected casing here

      const result = await indicationService.createIndication(mockIndicationData);

      expect(prisma.indication.create).toHaveBeenCalledWith({ data: mockIndicationData }); // Corrected casing here
      expect(result).toEqual(createdIndication);
    });
  });

  describe('getIndications', () => {
    it('should return a list of indications', async () => {
      const mockIndications = [
        { id: 1, public_id: 'abc', origin_member_id: 1, target_member_id: 2, description: 'Desc 1', status: status_indication.nova, created_at: new Date(), updated_at: new Date() },
        { id: 2, public_id: 'def', origin_member_id: 3, target_member_id: 4, description: 'Desc 2', status: status_indication.fechada, created_at: new Date(), updated_at: new Date() },
      ];
      (prisma.indication.findMany as jest.Mock).mockResolvedValue(mockIndications); // Corrected casing here

      const result = await indicationService.getIndications();

      expect(prisma.indication.findMany).toHaveBeenCalledWith(); // Corrected casing here
      expect(result).toEqual(mockIndications);
    });
  });

  describe('getIndicationById', () => {
    it('should return an indication by public_id', async () => {
      const mockIndication = { id: 1, public_id: 'abc', origin_member_id: 1, target_member_id: 2, description: 'Desc 1', status: status_indication.nova, created_at: new Date(), updated_at: new Date() };
      (prisma.indication.findUnique as jest.Mock).mockResolvedValue(mockIndication); // Corrected casing here

      const result = await indicationService.getIndicationById('abc');

      expect(prisma.indication.findUnique).toHaveBeenCalledWith({ where: { public_id: 'abc' } }); // Corrected casing here
      expect(result).toEqual(mockIndication);
    });

    it('should return null if indication not found', async () => {
      (prisma.indication.findUnique as jest.Mock).mockResolvedValue(null); // Corrected casing here

      const result = await indicationService.getIndicationById('non-existent');

      expect(result).toBeNull();
    });
  });

  describe('updateIndication', () => {
    it('should update an indication', async () => {
      const updatedData = { description: 'Updated Description' };
      const updatedIndication = { id: 1, public_id: 'abc', origin_member_id: 1, target_member_id: 2, description: 'Updated Description', status: status_indication.nova, created_at: new Date(), updated_at: new Date() };
      (prisma.indication.update as jest.Mock).mockResolvedValue(updatedIndication); // Corrected casing here

      const result = await indicationService.updateIndication('abc', updatedData);

      expect(prisma.indication.update).toHaveBeenCalledWith({ // Corrected casing here
        where: { public_id: 'abc' },
        data: updatedData,
      });
      expect(result).toEqual(updatedIndication);
    });
  });

  describe('deleteIndication', () => {
    it('should delete an indication', async () => {
      const deletedIndication = { id: 1, public_id: 'abc', origin_member_id: 1, target_member_id: 2, description: 'Desc 1', status: status_indication.nova, created_at: new Date(), updated_at: new Date() };
      (prisma.indication.delete as jest.Mock).mockResolvedValue(deletedIndication); // Corrected casing here

      const result = await indicationService.deleteIndication('abc');

      expect(prisma.indication.delete).toHaveBeenCalledWith({ where: { public_id: 'abc' } }); // Corrected casing here
      expect(result).toEqual(deletedIndication);
    });
  });
});
