import { Router } from "express";
import { check } from "express-validator";
import { TodoController } from "../controllers/todo.controller";
import { categoryIdExists, todoIdExists, userIdExists } from "../middlewares";

import { validarCampos } from "../middlewares/validarCampos";
import { validarJWT } from "../middlewares/validarJWT";
import { TodoService } from "../services/todo.service";

const router = Router();
const todoController = new TodoController(new TodoService());

router.get(
    "/:id",
    [
        // validarJWT,
        check("id", "Id is required").not().isEmpty(),
        check("id").custom(userIdExists),
        validarCampos,
    ],
    todoController.getTodos
);

router.get(
    "/today/:id",
    [
        // validarJWT,
        check("id", "Id is required").not().isEmpty(),
        check("id").custom(userIdExists),
        validarCampos,
    ],
    todoController.getTodosToday
);

router.post(
    "/",
    [
        // validarJWT,
        check("title", "Title is required").not().isEmpty(),
        check("date", "Date is required").not().isEmpty(),
        check("idUser", "User ID must be a number").isNumeric(),
        check("idCategory", "Category ID must be a number").isNumeric(),
        check("idUser").custom(userIdExists),
        check("idCategory").custom(categoryIdExists),
        validarCampos,
    ],
    todoController.postTodo
);

router.put(
    "/update/:id",
    [
        validarJWT,
        check("id").isNumeric(),
        check("id").custom(todoIdExists),
        check("title", "Title is required").not().isEmpty(),
        check("date", "Date is required").not().isEmpty(),
        validarCampos,
    ],
    todoController.putTodo
);

router.put(
    "/complete/:id",
    [
        //validarJWT,
        check("id").isNumeric(),
        check("id").custom(todoIdExists),
        validarCampos,
    ],
    todoController.putCompleteTodo
); //Complete a todo

router.put(
    "/uncomplete/:id",
    [
        //validarJWT,
        check("id").isNumeric(),
        check("id").custom(todoIdExists),
        validarCampos,
    ],
    todoController.putUncompleteTodo
); //Complete a todo

export default router;
