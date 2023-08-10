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
exports.putCompleteTodo = exports.putTodo = exports.postTodo = exports.getTodosToday = exports.getTodos = void 0;
const todo_service_1 = require("../services/todo.service");
const todoService = new todo_service_1.TodoService();
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const todos = yield todoService.listOfTodos(parseInt(id));
        return res.json({ ok: true, todos });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            error: "Comunicate with the administrator",
        });
    }
});
exports.getTodos = getTodos;
const getTodosToday = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const todos = yield todoService.listOfTodosToday(parseInt(id));
        return res.json({ ok: true, todos });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            error: "Comunicate with the administrator",
        });
    }
});
exports.getTodosToday = getTodosToday;
const postTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = __rest(req.body, []);
    try {
        const savedTodo = yield todoService.register(data);
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
exports.postTodo = postTodo;
const putTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = __rest(req.body, []);
    try {
        const updatedTodo = yield todoService.update(parseInt(id), data);
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
exports.putTodo = putTodo;
const putCompleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const todoCompleted = yield todoService.complete(parseInt(id));
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
exports.putCompleteTodo = putCompleteTodo;
//TODO: Eliminar todo
//TODO: Notificar la tarea a realizar segun el campo date proporcionado
