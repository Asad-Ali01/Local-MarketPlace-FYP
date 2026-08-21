let socket:WebSocket | null = null;
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
type Listener = (message:any) => void;
let listeners = new Set<Listener>();
const RECONNECT_DELAY = 2000;
export const connectWebSocket = (): WebSocket => {

    if(socket &&
        (socket.readyState === WebSocket.OPEN ||
        socket?.readyState === WebSocket.CONNECTING)
    ){
        return socket;
    }
    socket = new WebSocket("ws://localhost:3000");

    socket.onopen = () => {
        if(reconnectTimer){
            clearTimeout(reconnectTimer);
            reconnectTimer = null;
        }
        console.log("WebSocket connected");
    }

    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        listeners.forEach((listener) => {
            listener(message);
        })
    }

    socket.onclose = () => {
        console.log("WebSocket disconnected");
        socket = null;

        reconnectTimer = setTimeout(() => {
            connectWebSocket();
        },RECONNECT_DELAY)
    }

    socket.onerror = (error) => {
        console.error("WebSocket error: ",error)
    }
    return socket;
}

export const subscribeToWebSocket = (
    listener:Listener
) => {
    listeners.add(listener)

    return () => {
        listeners.delete(listener)
    }
}