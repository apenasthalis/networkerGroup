import * as memberController from '../memberController';
import * as memberService from '../../services/memberService';
import { Request, Response } from 'express';

// Mock the memberService
jest.mock('../../services/memberService');

describe('memberController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new member and return 201', async () => {
      const mockMemberData = {
        name: 'Test Member',
        email: 'test@example.com',
        business_name: 'Test Business',
        intention_id: 1,
        token: 'test-token',
      };
      const createdMember = { id: 1, public_id: 'abc', ...mockMemberData };
      mockRequest.body = mockMemberData;
      (memberService.createMember as jest.Mock).mockResolvedValue(createdMember);

      await memberController.create(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(createdMember);
      expect(memberService.createMember).toHaveBeenCalledWith(mockMemberData);
    });

    it('should return 400 if creation fails', async () => {
      const errorMessage = 'Validation failed';
      mockRequest.body = {};
      (memberService.createMember as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await memberController.create(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('getAll', () => {
    it('should return a list of members', async () => {
      const mockMembers = [
        { id: 1, public_id: 'abc', name: 'Member 1' },
        { id: 2, public_id: 'def', name: 'Member 2' },
      ];
      (memberService.getMembers as jest.Mock).mockResolvedValue(mockMembers);

      await memberController.getAll(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith(mockMembers);
      expect(memberService.getMembers).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return a member by publicId', async () => {
      const mockMember = { id: 1, public_id: 'abc', name: 'Member 1' };
      mockRequest.params = { publicId: 'abc' };
      (memberService.getMemberById as jest.Mock).mockResolvedValue(mockMember);

      await memberController.getById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith(mockMember);
      expect(memberService.getMemberById).toHaveBeenCalledWith('abc');
    });

    it('should return 404 if member not found', async () => {
      mockRequest.params = { publicId: 'non-existent' };
      (memberService.getMemberById as jest.Mock).mockResolvedValue(null);

      await memberController.getById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Membro não encontrado' });
    });
  });

  describe('update', () => {
    it('should update a member and return 200', async () => {
      const updatedData = { name: 'Updated Name' };
      const updatedMember = { id: 1, public_id: 'abc', name: 'Updated Name' };
      mockRequest.params = { publicId: 'abc' };
      mockRequest.body = updatedData;
      (memberService.updateMember as jest.Mock).mockResolvedValue(updatedMember);

      await memberController.update(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith(updatedMember);
      expect(memberService.updateMember).toHaveBeenCalledWith('abc', updatedData);
    });

    it('should return 400 if update fails', async () => {
      const errorMessage = 'Update failed';
      mockRequest.params = { publicId: 'abc' };
      mockRequest.body = {};
      (memberService.updateMember as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await memberController.update(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('remove', () => {
    it('should delete a member and return 204', async () => {
      mockRequest.params = { publicId: 'abc' };
      (memberService.deleteMember as jest.Mock).mockResolvedValue(undefined);

      await memberController.remove(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalled();
      expect(memberService.deleteMember).toHaveBeenCalledWith('abc');
    });

    it('should return 400 if deletion fails', async () => {
      const errorMessage = 'Deletion failed';
      mockRequest.params = { publicId: 'abc' };
      (memberService.deleteMember as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await memberController.remove(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('completeRegistration', () => {
    it('should complete member registration and return 200', async () => {
      const mockFormData = {
        token: 'valid-token',
        telefone: '123',
        endereco: 'abc',
      };
      const updatedMember = { id: 1, public_id: 'abc', name: 'Test Member', ...mockFormData };
      mockRequest.body = mockFormData;
      (memberService.completeMemberRegistration as jest.Mock).mockResolvedValue(updatedMember);

      await memberController.completeRegistration(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(updatedMember);
      expect(memberService.completeMemberRegistration).toHaveBeenCalledWith(mockFormData.token, {
        telefone: mockFormData.telefone,
        endereco: mockFormData.endereco,
      });
    });

    it('should return 400 if token is missing', async () => {
      mockRequest.body = {
        telefone: '123',
      };

      await memberController.completeRegistration(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Token é obrigatório para completar o cadastro.' });
    });

    it('should return 400 if registration fails', async () => {
      const errorMessage = 'Registration failed';
      mockRequest.body = {
        token: 'invalid-token',
        telefone: '123',
      };
      (memberService.completeMemberRegistration as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await memberController.completeRegistration(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});