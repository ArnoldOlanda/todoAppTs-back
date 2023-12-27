import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import { AppDataSource } from "./data-source";

import authRoutes from "./routes/auth.routes";
import todosRoutes from "./routes/todos.routes";
import categoriesRoutes from "./routes/category.routes";
import seedRouter from "./seed";
import { Paths } from "./interfaces/paths.interface";

class Server {
    private app: Application;
    private port: string | number;
    private paths: Paths;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 4000;
        this.paths = {
            index: "/api",
            auth: "/api/auth",
            users: "/api/users",
            todos: "/api/todos",
            categories: "/api/categories",
        };

        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB() {
        try {
            await AppDataSource.initialize();
            console.log("Environment: ", process.env.NODE_ENV);
            console.log("Database conected... OK");
        } catch (error) {
            console.log(error);
        }
    }

    middlewares() {
        //Cors
        this.app.use(cors());

        this.app.use(express.json());

        //Public folder
        this.app.use(express.static("public"));

        this.app.use(morgan("dev"));
    }

    routes() {
        this.app.get(this.paths.index, (_req, res) => {
            res.json({ msg: "SERVER ONLINE..." });
        });

        this.app.use("/api", seedRouter);

        this.app.use(this.paths.auth, authRoutes);
        this.app.use(this.paths.todos, todosRoutes);
        this.app.use(this.paths.categories, categoriesRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server on line in the port: ${this.port}`);
            //console.log(process.env);
        });
    }
}

export default Server;
