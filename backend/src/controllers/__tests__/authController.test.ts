import * as authController from '../authController';
import * as authService from '../../services/authService';
import { Request, Response } from 'express';

// Mock the authService
jest.mock('../../services/authService');

describe('authController', () => {
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

  describe('validateToken', () => {
    it('should validate a token and return 200 with member info', async () => {
      const mockToken = 'valid-token';
      const mockMemberInfo = { memberId: 1, name: 'Test Member', email: 'test@example.com' };
      mockRequest.body = { token: mockToken };
      (authService.validateMemberToken as jest.Mock).mockResolvedValue(mockMemberInfo);

      await authController.validateToken(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Token validado com sucesso.', member: mockMemberInfo });
      expect(authService.validateMemberToken).toHaveBeenCalledWith(mockToken);
    });

    it('should return 400 if token is missing', async () => {
      mockRequest.body = {};

      await authController.validateToken(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Token é obrigatório.' });
    });

    it('should return 401 if token validation fails', async () => {
      const errorMessage = 'Token inválido ou não encontrado.';
      mockRequest.body = { token: 'invalid-token' };
      (authService.validateMemberToken as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await authController.validateToken(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
