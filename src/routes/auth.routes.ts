import { Router } from "express";
import {
  getRevalidateToken,
  postLogin,
  postRegister,
} from "../controllers/auth.controller";

const router = Router();

router.post("/login", postLogin);
router.post("/register", postRegister);
router.get("/resetPassword");
router.get("/revalidateToken", getRevalidateToken);

export default router;
