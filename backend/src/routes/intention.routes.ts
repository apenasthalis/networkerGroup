import { Router } from "express";
import * as intentionController from '../controllers/intentionController';

const router = Router();

router.get("/", intentionController.getAll);
router.get("/:publicId", intentionController.getById);
router.post("/", intentionController.create);
router.put("/:publicId", intentionController.update);
router.delete("/:publicId", intentionController.remove);

export default router;
