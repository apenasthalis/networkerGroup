import { Router } from "express";
import * as adminController from '../controllers/adminController';

const router = Router();

router.get("/", adminController.getAll);
router.get("/:publicId", adminController.getById);
router.post("/", adminController.create);
router.put("/:publicId", adminController.update);
router.delete("/:publicId", adminController.remove);

export default router;
