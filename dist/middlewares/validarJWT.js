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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = require("../services/user.service");
const userService = new user_service_1.UserService();
const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header("access-token");
    if (!token) {
        return res.status(401).json({
            msg: "Se necesita enviar el token de autenticacion",
        });
    }
    try {
        const { id } = jsonwebtoken_1.default.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = yield userService.searchById(id);
        //Validar que el usuario exista en la base de datos
        if (!usuario) {
            return res.status(401).json({
                msg: "Token no valido",
            });
        }
        req.id = usuario.id.toString();
        req.user = usuario.user;
        next();
        return;
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: "Token invalido",
        });
    }
});
exports.validarJWT = validarJWT;
