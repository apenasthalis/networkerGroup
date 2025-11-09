import { Request, Response } from "express";
declare class intentionController {
    list(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: intentionController;
export default _default;
//# sourceMappingURL=intentionController.d.ts.map