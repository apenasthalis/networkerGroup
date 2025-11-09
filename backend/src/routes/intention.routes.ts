import { Router } from "express";
import intentionController from "../controllers/intentionController";

const router = Router();

router.get("/", intentionController.list);
router.get("/:id", intentionController.getById);
router.post("/", intentionController.create);

export default router;
