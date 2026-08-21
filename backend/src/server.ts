import "dotenv/config"
import { app } from './app';
import { connectToDb } from './config/db';
import http from 'http';
import { initializeWebSocket } from "./websockets/websocket.server";

connectToDb();

const server = http.createServer(app);
initializeWebSocket(server)
server.listen(3000,() => {
    console.log("Server is running on localhost");
})  