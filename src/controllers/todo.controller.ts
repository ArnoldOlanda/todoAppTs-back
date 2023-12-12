import { Request, Response } from "express";
import { TodoService } from "../services/todo.service";
import { UpdateTodoDto } from "../dto/UpdateTodo.dto";
import { CreateTodoDto } from "../dto/CreateTodo.dto";
import { NotFoundError } from "../errors/NotFoundError";

export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    public getTodos = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const todos = await this.todoService.listOfTodos(parseInt(id));
            return res.json({ ok: true, todos });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                error: "Comunicate with the administrator",
            });
        }
    };

    public getTodosToday = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const todos = await this.todoService.listOfTodosToday(parseInt(id));
            return res.json({ ok: true, todos });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                error: "Comunicate with the administrator",
            });
        }
    };

    public postTodo = async (req: Request, res: Response) => {
        const { ...data } = req.body as CreateTodoDto;
        try {
            const savedTodo = await this.todoService.register(data);

            return res.json(savedTodo);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                error: "Comunicate with the administrator",
            });
        }
    };

    public putTodo = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { ...data } = req.body as UpdateTodoDto;
        try {
            const updatedTodo = await this.todoService.update(
                parseInt(id),
                data
            );
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

    public putCompleteTodo = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const todoCompleted = await this.todoService.complete(parseInt(id));
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

    public putUncompleteTodo = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const todoCompleted = await this.todoService.uncomplete(
                parseInt(id)
            );
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

    public deleteTodo = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const todoDeleted = await this.todoService.delete(Number(id));
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
}

//TODO: Notificar la tarea a realizar segun el campo date proporcionado
