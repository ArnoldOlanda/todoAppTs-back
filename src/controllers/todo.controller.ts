import { Request, Response } from "express";
import { TodoService } from "../services/todo.service";
import { UpdateTodoDto } from "../dto/UpdateTodo.dto";
import { CreateTodoDto } from "../dto/CreateTodo.dto";
import { NotFoundError } from "../errors/NotFoundError";

const todoService = new TodoService();

export const getTodos = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const todos = await todoService.listOfTodos(parseInt(id));
        return res.json({ ok: true, todos });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error: "Comunicate with the administrator",
        });
    }
};

export const getTodosToday = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const todos = await todoService.listOfTodosToday(parseInt(id));
        return res.json({ ok: true, todos });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error: "Comunicate with the administrator",
        });
    }
};

export const postTodo = async (req: Request, res: Response) => {
    const { ...data } = req.body as CreateTodoDto;
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
    const { ...data } = req.body as UpdateTodoDto;
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
        const todoCompleted = await todoService.complete(parseInt(id));
        if (todoCompleted) {
            return res.json({
                ok: true,
                message: "Todo completed!",
                todo: todoCompleted,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error: "Contact the administrator",
        });
    }
};

export const putUncompleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const todoCompleted = await todoService.uncomplete(parseInt(id));
        if (todoCompleted) {
            return res.json({
                ok: true,
                message: "Todo uncompleted!",
                todo: todoCompleted,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error: "Contact the administrator",
        });
    }
};

export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const todoDeleted = await todoService.delete(Number(id));
        return res.json(todoDeleted);
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res
                .status(error.codeStatus)
                .json({ name: error.message, message: error.message });
        }
        return res.status(500).json({ msg: "Internal server error" });
    }
};

//TODO: Notificar la tarea a realizar segun el campo date proporcionado
