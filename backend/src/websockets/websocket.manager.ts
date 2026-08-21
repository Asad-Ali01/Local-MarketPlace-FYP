import { AuthenticatedWebSocket } from "../types/websocket.types";

const users = new Map<string,Set<AuthenticatedWebSocket>>();
export const  addUser = (
    userId:string,
    socket:AuthenticatedWebSocket
) => {
   let sockets = users.get(userId);
   if(!sockets){
    sockets = new Set();
    users.set(userId,sockets);
   }
   sockets.add(socket);
    // users.set(userId,socket);
}

export const removeUser = (
    userId:string,
    socket:AuthenticatedWebSocket
) => {
    const sockets = users.get(userId);
    if(!sockets){
        return;
    }
    sockets.delete(socket);
    if(sockets.size === 0){
        users.delete(userId);
    }  
    // users.delete(userId);
}

export const getUserSockets = (userId:string) => {
    return users.get(userId);
}