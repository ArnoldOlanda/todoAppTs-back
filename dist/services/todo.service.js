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
exports.TodoService = void 0;
const entity_1 = require("../entity");
const NotFoundError_1 = require("../errors/NotFoundError");
const sendNotification_1 = require("../helpers/sendNotification");
class TodoService {
    constructor() {
        this.listOfTodos = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const todos = yield entity_1.Todo.find({
                    where: {
                        user: {
                            id,
                        },
                    },
                });
                return todos;
            }
            catch (error) {
                console.log(error);
                throw new Error("No se pudo obtener el listado de tareas");
            }
        });
        this.listOfTodosToday = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const todos = yield entity_1.Todo.createQueryBuilder("t")
                    .innerJoin("t.user", "u")
                    .innerJoinAndSelect("t.category", "c")
                    .where("date_trunc('day', date) = CURRENT_TIMESTAMP::date")
                    .andWhere("u.id= :id", { id })
                    .getMany();
                return todos;
            }
            catch (error) {
                console.log(error);
                throw new Error("No se pudo obtener el listado de tareas");
            }
        });
        this.register = (data) => __awaiter(this, void 0, void 0, function* () {
            const { title, date, idUser, idCategory, withNotification } = data;
            try {
                const user = yield entity_1.User.findOneBy({ id: idUser });
                const category = yield entity_1.Category.findOneBy({ id: idCategory });
                if (!user || !category) {
                    throw new NotFoundError_1.NotFoundError("El usuario no existe o la categoria no es valida");
                }
                const todo = new entity_1.Todo();
                todo.title = title;
                todo.date = date;
                todo.user = user;
                todo.category = category;
                yield todo.save();
                const message = {
                    notification: {
                        body: todo.title,
                        title: "Recordatorio",
                    },
                    data: {
                        todo: todo.title,
                        user: user.name,
                    },
                    apns: {
                        payload: { aps: { "mutable-content": 1 } },
                        // fcm_options: { image: 'image-url' },
                    },
                    token: user.notifToken,
                };
                if (withNotification) {
                    const currentDateInMiliseconds = new Date().getTime();
                    const miliseconds = new Date(date).getTime() - currentDateInMiliseconds;
                    // console.log(miliseconds / 1000);
                    if (miliseconds > 0) {
                        setTimeout(() => {
                            (0, sendNotification_1.sendNotification)(message);
                        }, miliseconds);
                    }
                }
                return todo;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
        this.update = (id, todo) => __awaiter(this, void 0, void 0, function* () {
            const { date, title, idCategory } = todo;
            try {
                const todo = yield entity_1.Todo.findOneBy({ id });
                if (!todo) {
                    throw new NotFoundError_1.NotFoundError("La tarea no existe");
                }
                const category = yield entity_1.Category.findOneBy({ id: idCategory });
                todo.title = title;
                todo.date = date;
                todo.category = category;
                yield todo.save();
                return todo;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
        this.complete = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const todo = yield entity_1.Todo.findOneBy({ id });
                if (!todo) {
                    throw new NotFoundError_1.NotFoundError("La tarea no existe");
                }
                todo.status = "completed";
                yield todo.save();
                return todo;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
        this.uncomplete = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const todo = yield entity_1.Todo.findOneBy({ id });
                if (!todo) {
                    throw new NotFoundError_1.NotFoundError("La tarea no existe");
                }
                todo.status = "pending";
                yield todo.save();
                return todo;
            }
            catch (error) {
                throw error;
            }
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const todo = yield entity_1.Todo.findOneBy({ id });
                if (!todo) {
                    throw new NotFoundError_1.NotFoundError("La tarea no existe");
                }
                const deleted = yield entity_1.Todo.remove(todo);
                return deleted;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.TodoService = TodoService;
