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
class TodoService {
    listOfTodos(id) {
        return __awaiter(this, void 0, void 0, function* () {
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
            }
        });
    }
    listOfTodosToday(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todos = yield entity_1.Todo.createQueryBuilder("t")
                    .innerJoin("user", "u", "t.user=u.id")
                    .where("date_trunc('day', date) = CURRENT_TIMESTAMP::date")
                    .andWhere("u.id= :id", { id })
                    .getMany();
                return todos;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, date, idUser, idCategory } = data;
            try {
                const user = yield entity_1.User.findOneBy({ id: idUser });
                const category = yield entity_1.Category.findOneBy({ id: idCategory });
                if (user && category) {
                    const todo = new entity_1.Todo();
                    todo.title = title;
                    todo.description = description;
                    todo.date = date;
                    todo.user = user;
                    todo.category = category;
                    const savedTodo = yield todo.save();
                    return savedTodo;
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    update(id, todo) {
        return __awaiter(this, void 0, void 0, function* () {
            const { date, description, title } = todo;
            try {
                const todo = yield entity_1.Todo.findOneBy({ id });
                if (todo) {
                    todo.title = title;
                    todo.description = description;
                    todo.date = date;
                    const updatedTodo = yield todo.save();
                    return updatedTodo;
                }
                return null;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    complete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todo = yield entity_1.Todo.findOneBy({ id });
                if (todo) {
                    todo.status = "completed";
                    yield todo.save();
                    return todo;
                }
                return null;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
}
exports.TodoService = TodoService;
