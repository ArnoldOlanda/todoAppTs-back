import { Router } from "express";
import { validarJWT } from "../middlewares/validarJWT";
import {
    getRevalidateToken,
    postLogin,
    postRegister,
} from "../controllers/auth.controller";

const router = Router();

router.post("/login", postLogin);
router.post("/register", postRegister);
router.get("/resetPassword");
router.get("/renew", validarJWT, getRevalidateToken);

export default router;
