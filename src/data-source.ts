import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Category } from "./entity/Category";
import { Todo } from "./entity/Todo";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin",
  database: "todos",
  synchronize: true,
  logging: false,
  entities: [User, Category, Todo],
  migrations: [],
  subscribers: [],
});
