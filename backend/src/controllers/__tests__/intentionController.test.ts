import * as intentionController from '../intentionController';
import * as intentionService from '../../services/intentionService';
import { Request, Response } from 'express';

// Mock the intentionService
jest.mock('../../services/intentionService');

describe('intentionController', () => {
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
    it('should create a new intention and return 201', async () => {
      const mockIntentionData = {
        name: 'Test Intention',
        email: 'test@example.com',
        business_name: 'Test Business',
        reason_participation: 'Test Reason',
      };
      const createdIntention = { id: 1, public_id: 'abc', ...mockIntentionData };
      mockRequest.body = mockIntentionData;
      (intentionService.createIntention as jest.Mock).mockResolvedValue(createdIntention);

      await intentionController.create(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(createdIntention);
      expect(intentionService.createIntention).toHaveBeenCalledWith(mockIntentionData);
    });

    it('should return 400 if creation fails', async () => {
      const errorMessage = 'Validation failed';
      mockRequest.body = {};
      (intentionService.createIntention as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await intentionController.create(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('getAll', () => {
    it('should return a list of intentions', async () => {
      const mockIntentions = [
        { id: 1, public_id: 'abc', name: 'Intention 1' },
        { id: 2, public_id: 'def', name: 'Intention 2' },
      ];
      (intentionService.getIntentions as jest.Mock).mockResolvedValue(mockIntentions);

      await intentionController.getAll(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith(mockIntentions);
      expect(intentionService.getIntentions).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return an intention by publicId', async () => {
      const mockIntention = { id: 1, public_id: 'abc', name: 'Intention 1' };
      mockRequest.params = { publicId: 'abc' };
      (intentionService.getIntentionById as jest.Mock).mockResolvedValue(mockIntention);

      await intentionController.getById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith(mockIntention);
      expect(intentionService.getIntentionById).toHaveBeenCalledWith('abc');
    });

    it('should return 404 if intention not found', async () => {
      mockRequest.params = { publicId: 'non-existent' };
      (intentionService.getIntentionById as jest.Mock).mockResolvedValue(null);

      await intentionController.getById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Intenção não encontrada' });
    });
  });

  describe('update', () => {
    it('should update an intention and return 200', async () => {
      const updatedData = { name: 'Updated Name' };
      const updatedIntention = { id: 1, public_id: 'abc', name: 'Updated Name' };
      mockRequest.params = { publicId: 'abc' };
      mockRequest.body = updatedData;
      (intentionService.updateIntention as jest.Mock).mockResolvedValue({ intention: updatedIntention });

      await intentionController.update(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith({ intention: updatedIntention });
      expect(intentionService.updateIntention).toHaveBeenCalledWith('abc', updatedData);
    });

    it('should return 400 if update fails', async () => {
      const errorMessage = 'Update failed';
      mockRequest.params = { publicId: 'abc' };
      mockRequest.body = {};
      (intentionService.updateIntention as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await intentionController.update(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('approve', () => {
    it('should approve an intention and return 200', async () => {
      const mockResult = { intention: { id: 1, status: 'aceita' }, member: { id: 1, name: 'New Member' } };
      mockRequest.params = { publicId: 'abc' };
      (intentionService.approveIntention as jest.Mock).mockResolvedValue(mockResult);

      await intentionController.approve(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
      expect(intentionService.approveIntention).toHaveBeenCalledWith('abc');
    });

    it('should return 400 if approval fails', async () => {
      const errorMessage = 'Approval failed';
      mockRequest.params = { publicId: 'abc' };
      (intentionService.approveIntention as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await intentionController.approve(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('refuse', () => {
    it('should refuse an intention and return 200', async () => {
      const mockResult = { intention: { id: 1, status: 'recusada' } };
      mockRequest.params = { publicId: 'abc' };
      (intentionService.refuseIntention as jest.Mock).mockResolvedValue(mockResult);

      await intentionController.refuse(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
      expect(intentionService.refuseIntention).toHaveBeenCalledWith('abc');
    });

    it('should return 400 if refusal fails', async () => {
      const errorMessage = 'Refusal failed';
      mockRequest.params = { publicId: 'abc' };
      (intentionService.refuseIntention as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await intentionController.refuse(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('remove', () => {
    it('should delete an intention and return 204', async () => {
      mockRequest.params = { publicId: 'abc' };
      (intentionService.deleteIntention as jest.Mock).mockResolvedValue(undefined);

      await intentionController.remove(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalled();
      expect(intentionService.deleteIntention).toHaveBeenCalledWith('abc');
    });

    it('should return 400 if deletion fails', async () => {
      const errorMessage = 'Deletion failed';
      mockRequest.params = { publicId: 'abc' };
      (intentionService.deleteIntention as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await intentionController.remove(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
