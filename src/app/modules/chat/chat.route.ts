import { Router } from "express";
import { chatController } from "./chat.controller";

const router = Router();

router.post("/ask", chatController);

export const chatRoutes = router;
