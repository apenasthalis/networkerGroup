import { Router } from "express";
import * as memberController from '../controllers/memberController';

const router = Router();

router.get("/", memberController.getAll);
router.get("/:publicId", memberController.getById);
router.post("/", memberController.create);
router.put("/:publicId", memberController.update);
router.put("/complete-registration", memberController.completeRegistration);
router.delete("/:publicId", memberController.remove);

export default router;
