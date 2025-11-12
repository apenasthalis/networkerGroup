import * as authService from '../authService';
import prisma from '../../database/PrismaClient';

// Mock the PrismaClient
jest.mock('../../database/PrismaClient', () => ({
  member: {
    findUnique: jest.fn(),
  },
}));

describe('authService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateMemberToken', () => {
    it('should return member info if token is valid', async () => {
      const mockMember = {
        id: 1,
        token: 'valid-token',
        name: 'Test Member',
        email: 'test@example.com',
      };
      (prisma.member.findUnique as jest.Mock).mockResolvedValue(mockMember);

      const result = await authService.validateMemberToken('valid-token');

      expect(prisma.member.findUnique).toHaveBeenCalledWith({
        where: { token: 'valid-token' },
      });
      expect(result).toEqual({
        memberId: mockMember.id,
        name: mockMember.name,
        email: mockMember.email,
      });
    });

    it('should throw an error if token is invalid or not found', async () => {
      (prisma.member.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(authService.validateMemberToken('invalid-token')).rejects.toThrow(
        'Token inválido ou não encontrado.'
      );
      expect(prisma.member.findUnique).toHaveBeenCalledWith({
        where: { token: 'invalid-token' },
      });
    });
  });
});
