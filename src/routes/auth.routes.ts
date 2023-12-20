import { Router } from "express";
import { validarJWT } from "../middlewares/validarJWT";
import {
    getRevalidateToken,
    postLogin,
    postRegister,
    putNotificationToken,
} from "../controllers/auth.controller";

const router = Router();

router.post("/login", postLogin);
router.post("/register", postRegister);
router.get("/reset-password");
router.get("/renew", validarJWT, getRevalidateToken);
router.put("/notification-token/:id", putNotificationToken);

export default router;
