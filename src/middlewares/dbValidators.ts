import { Category, Todo, User } from "../entity";

export const userIdExists = async (id: number) => {
    const user = await User.findOneBy({ id });

    if (!user) {
        throw new Error(`The user does not exists`);
    }
};

export const categoryIdExists = async (id: number) => {
    const category = await Category.findOneBy({ id });
    if (!category) {
        throw new Error(`The category does not exists`);
    }
};

export const todoIdExists = async (id: number) => {
    const todo = await Todo.findOneBy({ id });
    if (!todo) {
        throw new Error(`The todo does not exists`);
    }
};
