import { Category, Todo, User } from "../entity";
import { TodoEntity } from "../types";
export class TodoService {
    async listOfTodos(): Promise<Todo[] | undefined> {
        try {
            const todos = await Todo.find();
            return todos;
        } catch (error) {
            console.log(error);
        }
    }

    async register(data: TodoEntity): Promise<Todo | undefined> {
        const { title, description, date, idUser, idCategory } = data;

        try {
            const user = await User.findOneBy({ id: idUser });
            const category = await Category.findOneBy({ id: idCategory });

            if (user && category) {
                const todo = new Todo();
                todo.title = title;
                todo.description = description;
                todo.date = date;
                todo.user = user;
                todo.category = category;
                const savedTodo = await todo.save();
                return savedTodo;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async update(
        id: number,
        todo: Omit<TodoEntity, "idUser" | "idCategory">
    ): Promise<Todo | null> {
        const { date, description, title } = todo;
        try {
            const todo = await Todo.findOneBy({ id });
            if (todo) {
                todo.title = title;
                todo.description = description;
                todo.date = date;

                const updatedTodo = await todo.save();
                return updatedTodo;
            }
            return null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async complete(id: number) {
        try {
            const todo = await Todo.findOneBy({ id });

            if (todo) {
                todo.status = "completed";
                await todo.save();
                return true;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
