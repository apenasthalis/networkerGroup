import * as indicationController from '../indicationController';
import * as indicationService from '../../services/indicationService';
import { Request, Response } from 'express';

// Mock the indicationService
jest.mock('../../services/indicationService');

describe('indicationController', () => {
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
    it('should create a new indication and return 201', async () => {
      const mockIndicationData = {
        origin_member_id: 1,
        target_member_id: 2,
        description: 'Test Description',
      };
      const createdIndication = { id: 1, public_id: 'abc', ...mockIndicationData };
      mockRequest.body = mockIndicationData;
      (indicationService.createIndication as jest.Mock).mockResolvedValue(createdIndication);

      await indicationController.create(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(createdIndication);
      expect(indicationService.createIndication).toHaveBeenCalledWith(mockIndicationData);
    });

    it('should return 400 if creation fails', async () => {
      const errorMessage = 'Validation failed';
      mockRequest.body = {};
      (indicationService.createIndication as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await indicationController.create(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('getAll', () => {
    it('should return a list of indications', async () => {
      const mockIndications = [
        { id: 1, public_id: 'abc', description: 'Indication 1' },
        { id: 2, public_id: 'def', description: 'Indication 2' },
      ];
      (indicationService.getIndications as jest.Mock).mockResolvedValue(mockIndications);

      await indicationController.getAll(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith(mockIndications);
      expect(indicationService.getIndications).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return an indication by publicId', async () => {
      const mockIndication = { id: 1, public_id: 'abc', description: 'Indication 1' };
      mockRequest.params = { publicId: 'abc' };
      (indicationService.getIndicationById as jest.Mock).mockResolvedValue(mockIndication);

      await indicationController.getById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith(mockIndication);
      expect(indicationService.getIndicationById).toHaveBeenCalledWith('abc');
    });

    it('should return 404 if indication not found', async () => {
      mockRequest.params = { publicId: 'non-existent' };
      (indicationService.getIndicationById as jest.Mock).mockResolvedValue(null);

      await indicationController.getById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Indicação não encontrada' });
    });
  });

  describe('update', () => {
    it('should update an indication and return 200', async () => {
      const updatedData = { description: 'Updated Description' };
      const updatedIndication = { id: 1, public_id: 'abc', description: 'Updated Description' };
      mockRequest.params = { publicId: 'abc' };
      mockRequest.body = updatedData;
      (indicationService.updateIndication as jest.Mock).mockResolvedValue(updatedIndication);

      await indicationController.update(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith(updatedIndication);
      expect(indicationService.updateIndication).toHaveBeenCalledWith('abc', updatedData);
    });

    it('should return 400 if update fails', async () => {
      const errorMessage = 'Update failed';
      mockRequest.params = { publicId: 'abc' };
      mockRequest.body = {};
      (indicationService.updateIndication as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await indicationController.update(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('remove', () => {
    it('should delete an indication and return 204', async () => {
      mockRequest.params = { publicId: 'abc' };
      (indicationService.deleteIndication as jest.Mock).mockResolvedValue(undefined);

      await indicationController.remove(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalled();
      expect(indicationService.deleteIndication).toHaveBeenCalledWith('abc');
    });

    it('should return 400 if deletion fails', async () => {
      const errorMessage = 'Deletion failed';
      mockRequest.params = { publicId: 'abc' };
      (indicationService.deleteIndication as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await indicationController.remove(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
