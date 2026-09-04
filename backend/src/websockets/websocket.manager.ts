import { Conversation } from "../models/conversation.model";
import { AuthenticatedWebSocket } from "../types/websocket.types";

const users = new Map<string, Set<AuthenticatedWebSocket>>();
export const addUser = (userId: string, socket: AuthenticatedWebSocket) => {
  let sockets = users.get(userId);

  const wasOffline = !sockets;
  if (!sockets) {
    sockets = new Set();
    // making set of sockets
    users.set(userId, sockets);
  }
  //    Adding socket to that sockets Set
  sockets.add(socket);
  return wasOffline;
};

export const removeUser = (userId: string, socket: AuthenticatedWebSocket) => {
  const sockets = users.get(userId);
  if (!sockets) {
    return;
  }
  sockets.delete(socket);
  if (sockets.size === 0) {
    users.delete(userId);
    return true;
  }
  return false;
  // users.delete(userId);
};

export const getUserSockets = (userId: string) => {
  return users.get(userId);
};

export const notifyUserPresence = async (
  userId: string,
  type: "USER_ONLINE" | "USER_OFFLINE",
) => {
  const conversations = await Conversation.find({
    "members.user": userId,
  }).lean();
  console.log("Here is userID: ", userId);
  for (const conversation of conversations) {
    const otherUserId = conversation.members.find(
      (member) => member.user.toString() !== userId,
    );
    if(otherUserId){

      console.log("Here is otherUserId: ", otherUserId.user);
      console.log("Here is otherUserIds: ", otherUserId.user._id);
    }
    if (!otherUserId) {
      continue;
    }
    console.log("String: ", otherUserId.user._id.toString());
    const otherUserSockets = getUserSockets(otherUserId.user.toString());

    if (!otherUserSockets || otherUserSockets.size === 0) {
      console.log("No active socket for peer");
      continue;
    }
    otherUserSockets?.forEach((otherSocket) => {
      console.log("HEre is type: ", type);
      if (otherSocket && otherSocket.readyState === WebSocket.OPEN) {
        otherSocket.send(
          JSON.stringify({
            type,
            payload: {
              userId: userId,
            },
          }),
        );
      }
    });
  }
};

export const sendInitialPresence = async (userId:string,socket:AuthenticatedWebSocket) => {
  // First find all conversations related to current connected user
  const conversations = await Conversation.find({"members.user":userId}).lean();
  // Set to store already login users id realted to login user
  const onlineUserIds = new Set<string>();

  for(const conversation of conversations){
    for(const member of conversation.members){
      const memberId = member.user.toString();
      // If the memberId is equal to current connected user then skip becuase we want the perosn who is talking to it 
      if(memberId === userId)  continue;

      const sockets = getUserSockets(memberId);
      if(sockets && sockets.size > 0){
        onlineUserIds.add(memberId);
      }
    }
  } 
  console.log("Online suer ids ",onlineUserIds);
  socket.send(
    JSON.stringify({
      type:"INITIAL_PRESENCE",
      payload:{
        userIds:[...onlineUserIds]
      }
    })
  )
}