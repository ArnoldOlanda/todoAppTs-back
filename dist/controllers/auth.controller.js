"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRevalidateToken = exports.postRegister = exports.putNotificationToken = exports.postLogin = void 0;
const generateJWT_1 = require("../helpers/generateJWT");
const user_service_1 = require("../services/user.service");
const ValidationError_1 = require("../errors/ValidationError");
const userService = new user_service_1.UserService();
const postLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, password } = req.body;
    try {
        const { userValid, token } = yield userService.login(user, password);
        return res.json({
            ok: true,
            user: userValid,
            token,
        });
    }
    catch (error) {
        if (error instanceof ValidationError_1.ValidationError) {
            return res.status(error.codeStatus).json({
                ok: false,
                message: error.message,
            });
        }
        return res
            .status(500)
            .json({ ok: false, message: "Hable con el administrador" });
    }
});
exports.postLogin = postLogin;
const putNotificationToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { notificationToken } = req.body;
        const { message } = yield userService.setNotificationToken(+id, notificationToken);
        return res.json({ message });
    }
    catch (error) {
        if (error instanceof ValidationError_1.ValidationError) {
            return res.status(error.codeStatus).json({
                ok: false,
                message: error.message,
            });
        }
        return res
            .status(500)
            .json({ ok: false, message: "Hable con el administrador" });
    }
});
exports.putNotificationToken = putNotificationToken;
const postRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, user, password } = req.body;
    try {
        const { user: newUser, token } = yield userService.register(name, user, password);
        return res.json({
            ok: true,
            user: newUser,
            token,
        });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ ok: false, message: "Hable con el administrador" });
    }
});
exports.postRegister = postRegister;
const getRevalidateToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, user } = req;
    const token = yield (0, generateJWT_1.generateJWT)(id, user);
    res.json({
        ok: true,
        id,
        user,
        token,
    });
});
exports.getRevalidateToken = getRevalidateToken;
