import express from "express";
import { getAllUsersBy } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/", protect, getAllUsersBy)


export default router;