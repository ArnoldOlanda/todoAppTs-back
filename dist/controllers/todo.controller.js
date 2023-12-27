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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const NotFoundError_1 = require("../errors/NotFoundError");
class TodoController {
    constructor(todoService) {
        this.todoService = todoService;
        this.getTodos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const todos = yield this.todoService.listOfTodos(parseInt(id));
                return res.json({ ok: true, todos });
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    error: "Comunicate with the administrator",
                });
            }
        });
        this.getTodosToday = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const todos = yield this.todoService.listOfTodosToday(parseInt(id));
                return res.json({ ok: true, todos });
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    error: "Comunicate with the administrator",
                });
            }
        });
        this.postTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = __rest(req.body, []);
            try {
                const savedTodo = yield this.todoService.register(data);
                return res.json(savedTodo);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    ok: false,
                    error: "Comunicate with the administrator",
                });
            }
        });
        this.putTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = __rest(req.body, []);
            try {
                const updatedTodo = yield this.todoService.update(parseInt(id), data);
                return res.json({
                    ok: true,
                    todo: updatedTodo,
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    ok: false,
                    error: "Comunicate with the administrator",
                });
            }
        });
        this.putCompleteTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const todoCompleted = yield this.todoService.complete(parseInt(id));
                if (todoCompleted) {
                    return res.json({
                        ok: true,
                        message: "Todo completed!",
                        todo: todoCompleted,
                    });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    ok: false,
                    error: "Contact the administrator",
                });
            }
        });
        this.putUncompleteTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const todoCompleted = yield this.todoService.uncomplete(parseInt(id));
                if (todoCompleted) {
                    return res.json({
                        ok: true,
                        message: "Todo uncompleted!",
                        todo: todoCompleted,
                    });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    ok: false,
                    error: "Contact the administrator",
                });
            }
        });
        this.deleteTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const todoDeleted = yield this.todoService.delete(Number(id));
                return res.json(todoDeleted);
            }
            catch (error) {
                if (error instanceof NotFoundError_1.NotFoundError) {
                    return res
                        .status(error.codeStatus)
                        .json({ name: error.message, message: error.message });
                }
                return res.status(500).json({ msg: "Internal server error" });
            }
        });
    }
}
exports.TodoController = TodoController;
//TODO: Notificar la tarea a realizar segun el campo date proporcionado
