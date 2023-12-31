"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarJWT_1 = require("../middlewares/validarJWT");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.post("/login", auth_controller_1.postLogin);
router.post("/register", auth_controller_1.postRegister);
router.get("/reset-password");
router.get("/renew", validarJWT_1.validarJWT, auth_controller_1.getRevalidateToken);
router.put("/notification-token/:id", auth_controller_1.putNotificationToken);
exports.default = router;
