import { Router } from "express";
import { check } from "express-validator";
import {
    getTodos,
    getTodosToday,
    postTodo,
    putCompleteTodo,
    putTodo,
    putUncompleteTodo,
} from "../controllers/todo.controller";
import { categoryIdExists, todoIdExists, userIdExists } from "../middlewares";

import { validarCampos } from "../middlewares/validarCampos";
import { validarJWT } from "../middlewares/validarJWT";

const router = Router();

router.get(
    "/:id",
    [
        // validarJWT,
        check("id", "Id is required").not().isEmpty(),
        check("id").custom(userIdExists),
        validarCampos,
    ],
    getTodos
);

router.get(
    "/today/:id",
    [
        // validarJWT,
        check("id", "Id is required").not().isEmpty(),
        check("id").custom(userIdExists),
        validarCampos,
    ],
    getTodosToday
);

router.post(
    "/",
    [
        // validarJWT,
        check("title", "Title is required").not().isEmpty(),
        check("date", "Date is required").not().isEmpty(),
        check("description", "Description is required").not().isEmpty(),
        check("idUser", "User ID must be a number").isNumeric(),
        check("idCategory", "Category ID must be a number").isNumeric(),
        check("idUser").custom(userIdExists),
        check("idCategory").custom(categoryIdExists),
        validarCampos,
    ],
    postTodo
);

router.put(
    "/update/:id",
    [
        validarJWT,
        check("id").isNumeric(),
        check("id").custom(todoIdExists),
        check("title", "Title is required").not().isEmpty(),
        check("date", "Date is required").not().isEmpty(),
        check("description", "Description is required").not().isEmpty(),
        validarCampos,
    ],
    putTodo
);

router.put(
    "/complete/:id",
    [
        //validarJWT,
        check("id").isNumeric(),
        check("id").custom(todoIdExists),
        validarCampos,
    ],
    putCompleteTodo
); //Complete a todo

router.put(
    "/uncomplete/:id",
    [
        //validarJWT,
        check("id").isNumeric(),
        check("id").custom(todoIdExists),
        validarCampos,
    ],
    putUncompleteTodo
); //Complete a todo

export default router;
