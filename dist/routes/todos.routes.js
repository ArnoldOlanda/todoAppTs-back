"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const todo_controller_1 = require("../controllers/todo.controller");
const middlewares_1 = require("../middlewares");
const validarCampos_1 = require("../middlewares/validarCampos");
const validarJWT_1 = require("../middlewares/validarJWT");
const todo_service_1 = require("../services/todo.service");
const router = (0, express_1.Router)();
const todoController = new todo_controller_1.TodoController(new todo_service_1.TodoService());
router.get("/:id", [
    // validarJWT,
    (0, express_validator_1.check)("id", "Id is required").not().isEmpty(),
    (0, express_validator_1.check)("id").custom(middlewares_1.userIdExists),
    validarCampos_1.validarCampos,
], todoController.getTodos);
router.get("/today/:id", [
    // validarJWT,
    (0, express_validator_1.check)("id", "Id is required").not().isEmpty(),
    (0, express_validator_1.check)("id").custom(middlewares_1.userIdExists),
    validarCampos_1.validarCampos,
], todoController.getTodosToday);
router.post("/", [
    // validarJWT,
    (0, express_validator_1.check)("title", "Title is required").not().isEmpty(),
    (0, express_validator_1.check)("date", "Date is required").not().isEmpty(),
    (0, express_validator_1.check)("idUser", "User ID must be a number").isNumeric(),
    (0, express_validator_1.check)("idCategory", "Category ID must be a number").isNumeric(),
    (0, express_validator_1.check)("idUser").custom(middlewares_1.userIdExists),
    (0, express_validator_1.check)("idCategory").custom(middlewares_1.categoryIdExists),
    validarCampos_1.validarCampos,
], todoController.postTodo);
router.put("/update/:id", [
    validarJWT_1.validarJWT,
    (0, express_validator_1.check)("id").isNumeric(),
    (0, express_validator_1.check)("id").custom(middlewares_1.todoIdExists),
    (0, express_validator_1.check)("title", "Title is required").not().isEmpty(),
    (0, express_validator_1.check)("date", "Date is required").not().isEmpty(),
    validarCampos_1.validarCampos,
], todoController.putTodo);
router.put("/complete/:id", [
    //validarJWT,
    (0, express_validator_1.check)("id").isNumeric(),
    (0, express_validator_1.check)("id").custom(middlewares_1.todoIdExists),
    validarCampos_1.validarCampos,
], todoController.putCompleteTodo); //Complete a todo
router.put("/uncomplete/:id", [
    //validarJWT,
    (0, express_validator_1.check)("id").isNumeric(),
    (0, express_validator_1.check)("id").custom(middlewares_1.todoIdExists),
    validarCampos_1.validarCampos,
], todoController.putUncompleteTodo); //Complete a todo
exports.default = router;
