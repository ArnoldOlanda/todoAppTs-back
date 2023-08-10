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
exports.UserService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const entity_1 = require("../entity");
const ValidationError_1 = require("../errors/ValidationError");
const generateJWT_1 = require("../helpers/generateJWT");
class UserService {
    login(user, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userValid = yield entity_1.User.findOneBy({ user });
            if (!userValid) {
                throw new ValidationError_1.ValidationError("the user doesn´t exists", 404);
            }
            const passwordvalid = bcryptjs_1.default.compareSync(password, userValid.password);
            if (!passwordvalid) {
                throw new ValidationError_1.ValidationError("the password is incorrect for this user", 401);
            }
            const token = yield (0, generateJWT_1.generateJWT)(userValid.id.toString(), userValid.user);
            return { token, userValid };
        });
    }
    register(name, user, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = bcryptjs_1.default.genSaltSync(10);
                const encryptedPassword = bcryptjs_1.default.hashSync(password, salt);
                const newUser = new entity_1.User();
                newUser.name = name;
                newUser.user = user;
                newUser.password = encryptedPassword;
                yield newUser.save();
                const token = yield (0, generateJWT_1.generateJWT)(newUser.id.toString(), newUser.user);
                return { user: newUser, token };
            }
            catch (error) {
                throw error;
            }
        });
    }
    searchById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield entity_1.User.findOneBy({ id: parseInt(id) });
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.UserService = UserService;
