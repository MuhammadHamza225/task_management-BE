import express from "express";
import { createTask, updateTask, getTask} from "../models/taskModel.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createTask)
router.get("/", protect, getTask)
router.patch("/:id", protect, updateTask)

export default router;