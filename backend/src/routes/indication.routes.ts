import { Router } from "express";
import * as indicationController from '../controllers/indicationController';

const router = Router();

router.get("/", indicationController.getAll);
router.get("/:publicId", indicationController.getById);
router.post("/", indicationController.create);
router.put("/:publicId", indicationController.update);
router.delete("/:publicId", indicationController.remove);

export default router;
