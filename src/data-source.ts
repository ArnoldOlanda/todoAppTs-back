import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Category } from "./entity/Category";
import { Todo } from "./entity/Todo";

export const AppDataSource = new DataSource({
    type: "postgres",
    port: parseInt(`${process.env.DB_PORT}`) || 5432,
    username: `${process.env.DB_USER}`,
    host: `${process.env.DB_HOST}`,
    database: `${process.env.DB_NAME}`,
    password: `${process.env.DB_PASSWORD}`,
    synchronize: true,
    logging: false,
    entities: [User, Category, Todo],
    migrations: [],
    subscribers: [],
});
