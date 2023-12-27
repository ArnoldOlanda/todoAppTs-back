import * as dotenv from "dotenv";

const pathEnv = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: pathEnv });

import Server from "./server";
import * as admin from "firebase-admin";
import serviceAccount from "./todo-app-rn-a9d9b-firebase-adminsdk-gsj9u-042f956f54.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

async function main() {
    const server = new Server();
    server.listen();
}

main();
