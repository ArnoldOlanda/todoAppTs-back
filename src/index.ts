import Server from "./server";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const server = new Server();
  server.listen();
}

main();
