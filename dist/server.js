"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const data_source_1 = require("./data-source");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const todos_routes_1 = __importDefault(require("./routes/todos.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const seed_1 = __importDefault(require("./seed"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
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
    conectarDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield data_source_1.AppDataSource.initialize();
                console.log("Environment: ", process.env.NODE_ENV);
                console.log("Database conected... OK");
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    middlewares() {
        //Cors
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        //Public folder
        this.app.use(express_1.default.static("public"));
        this.app.use((0, morgan_1.default)("dev"));
    }
    routes() {
        this.app.get(this.paths.index, (_req, res) => {
            res.json({ msg: "SERVER ONLINE..." });
        });
        this.app.use("/api", seed_1.default);
        this.app.use(this.paths.auth, auth_routes_1.default);
        this.app.use(this.paths.todos, todos_routes_1.default);
        this.app.use(this.paths.categories, category_routes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server on line in the port: ${this.port}`);
            //console.log(process.env);
        });
    }
}
exports.default = Server;
