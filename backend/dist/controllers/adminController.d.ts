import { Request, Response } from 'express';
export declare function create(req: Request, res: Response): Promise<void>;
export declare function getAll(req: Request, res: Response): Promise<void>;
export declare function getById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function update(req: Request, res: Response): Promise<void>;
export declare function remove(req: Request, res: Response): Promise<void>;
//# sourceMappingURL=adminController.d.ts.map