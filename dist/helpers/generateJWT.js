"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT = (id, user) => {
    return new Promise((resolve, reject) => {
        const payload = { id, user };
        jsonwebtoken_1.default.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: "4h",
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject("No se pudo generar el token");
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.generateJWT = generateJWT;
