import { CreateTodoDto } from "../dto/CreateTodo.dto";
import { UpdateTodoDto } from "../dto/UpdateTodo.dto";
import { Category, Todo, User } from "../entity";
import { NotFoundError } from "../errors/NotFoundError";
export class TodoService {
    public listOfTodos = async (id: number): Promise<Todo[] | undefined> => {
        try {
            const todos = await Todo.find({
                where: {
                    user: {
                        id,
                    },
                },
            });
            return todos;
        } catch (error) {
            console.log(error);
            throw new Error("No se pudo obtener el listado de tareas");
        }
    };

    public listOfTodosToday = async (id: number): Promise<Todo[]> => {
        try {
            const todos = await Todo.createQueryBuilder("t")
                .innerJoin("t.user", "u")
                .innerJoinAndSelect("t.category", "c")
                .where("date_trunc('day', date) = CURRENT_TIMESTAMP::date")
                .andWhere("u.id= :id", { id })
                .getMany();

            return todos;
        } catch (error) {
            console.log(error);
            throw new Error("No se pudo obtener el listado de tareas");
        }
    };

    public register = async (data: CreateTodoDto): Promise<Todo> => {
        const { title, date, idUser, idCategory } = data;

        try {
            const user = await User.findOneBy({ id: idUser });
            const category = await Category.findOneBy({ id: idCategory });

            if (!user || !category) {
                throw new NotFoundError(
                    "El usuario no existe o la categoria no es valida"
                );
            }

            const todo = new Todo();
            todo.title = title;
            todo.date = date;
            todo.user = user;
            todo.category = category;

            await todo.save();

            return todo;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    public update = async (id: number, todo: UpdateTodoDto): Promise<Todo> => {
        const { date, title, idCategory } = todo;
        try {
            const todo = await Todo.findOneBy({ id });
            if (!todo) {
                throw new NotFoundError("La tarea no existe");
            }
            const category = await Category.findOneBy({ id: idCategory });

            todo.title = title;
            todo.date = date;
            todo.category = category!;

            await todo.save();
            return todo;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    public complete = async (id: number): Promise<Todo> => {
        try {
            const todo = await Todo.findOneBy({ id });

            if (!todo) {
                throw new NotFoundError("La tarea no existe");
            }

            todo.status = "completed";
            await todo.save();
            return todo;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    public uncomplete = async (id: number): Promise<Todo> => {
        try {
            const todo = await Todo.findOneBy({ id });

            if (!todo) {
                throw new NotFoundError("La tarea no existe");
            }

            todo.status = "pending";
            await todo.save();
            return todo;
        } catch (error) {
            throw error;
        }
    };

    public delete = async (id: number): Promise<any> => {
        try {
            const todo = await Todo.findOneBy({ id });

            if (!todo) {
                throw new NotFoundError("La tarea no existe");
            }
            const deleted = await Todo.remove(todo);
            return deleted;
        } catch (error) {
            throw error;
        }
    };
}
