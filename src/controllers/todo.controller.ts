import { Request, Response } from "express";
import { TodoService } from "../services/todo.service";
import { TodoEntity } from "../types";

const todoService = new TodoService();

export const getTodos = async (_req: Request, res: Response) => {
    try {
        const todos = await todoService.listOfTodos();
        return res.json(todos);
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error: "Comunicate with the administrator",
        });
    }
};

export const postTodo = async (req: Request, res: Response) => {
    const { ...data } = req.body as TodoEntity;
    try {
        const savedTodo = await todoService.register(data);

        return res.json(savedTodo);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error: "Comunicate with the administrator",
        });
    }
};

export const putTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ...data } = req.body as Omit<TodoEntity, "idUser" | "idCategory">;
    try {
        const updatedTodo = await todoService.update(parseInt(id), data);
        return res.json({
            ok: true,
            todo: updatedTodo,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error: "Comunicate with the administrator",
        });
    }
};

export const putCompleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const ok = await todoService.complete(parseInt(id));
        if (ok) {
            return res.json({
                ok: true,
                message: "Todo completed!",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error: "Comunicate with the administrator",
        });
    }
};

//TODO: Eliminar todo
//TODO: Notificar la tarea a realizar segun el campo date proporcionado
