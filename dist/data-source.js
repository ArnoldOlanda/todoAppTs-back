"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
const Category_1 = require("./entity/Category");
const Todo_1 = require("./entity/Todo");
console.log(process.env);
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    port: 5432,
    username: `${process.env.DB_USER}`,
    host: `${process.env.DB_HOST}`,
    database: `${process.env.DB_NAME}`,
    password: `${process.env.DB_PASSWORD}`,
    synchronize: true,
    logging: false,
    entities: [User_1.User, Category_1.Category, Todo_1.Todo],
    migrations: [],
    subscribers: [],
});
