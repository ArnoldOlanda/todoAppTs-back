import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import { AppDataSource } from "./data-source";

import authRoutes from "./routes/auth.routes";
import todosRoutes from "./routes/todos.routes";
import categoriesRoutes from "./routes/category.routes";

interface Paths {
  index: string;
  todos: string;
  users: string;
  categories: string;
  auth: string;
}

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

    this.app.use(this.paths.auth, authRoutes);
    this.app.use(this.paths.todos, todosRoutes);
    this.app.use(this.paths.categories, categoriesRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server on line in the port: ${this.port}`);
    });
  }
}

export default Server;