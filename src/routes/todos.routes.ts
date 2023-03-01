import { Router } from "express";
import { check } from "express-validator";
import {
    getTodos,
    postTodo,
    putCompleteTodo,
    putTodo,
} from "../controllers/todo.controller";
import { categoryIdExists, todoIdExists, userIdExists } from "../middlewares";

import { validarCampos } from "../middlewares/validarCampos";
import { validarJWT } from "../middlewares/validarJWT";

const router = Router();

router.get("/", validarJWT, getTodos);

router.post(
    "/",
    [
        validarJWT,
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
        validarJWT,
        check("id").isNumeric(),
        check("id").custom(todoIdExists),
        validarCampos,
    ],
    putCompleteTodo
); //Complete a todo

export default router;
