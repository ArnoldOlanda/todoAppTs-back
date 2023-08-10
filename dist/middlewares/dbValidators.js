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
exports.todoIdExists = exports.categoryIdExists = exports.userIdExists = void 0;
const entity_1 = require("../entity");
const userIdExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield entity_1.User.findOneBy({ id });
    if (!user) {
        throw new Error(`The user does not exists`);
    }
});
exports.userIdExists = userIdExists;
const categoryIdExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield entity_1.Category.findOneBy({ id });
    if (!category) {
        throw new Error(`The category does not exists`);
    }
});
exports.categoryIdExists = categoryIdExists;
const todoIdExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield entity_1.Todo.findOneBy({ id });
    if (!todo) {
        throw new Error(`The todo does not exists`);
    }
});
exports.todoIdExists = todoIdExists;
