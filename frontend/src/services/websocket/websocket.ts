import type { ClientMessage } from '@/types/websocket.types';
import { refreshAccessToken } from '../authService';

let socket: WebSocket | null = null;
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
type Listener = (message: any) => void;
let listeners = new Set<Listener>();
let intentionalDisconnect = false;
const RECONNECT_DELAY = 2000;
export const connectWebSocket = (): WebSocket => {
  intentionalDisconnect = false;
  if (
    socket &&
    (socket.readyState === WebSocket.OPEN || socket?.readyState === WebSocket.CONNECTING)
  ) {
    console.log('Connecting');
    return socket;
  }
  socket = new WebSocket('ws://localhost:3000');

  socket.onopen = () => {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
    console.log('WebSocket connected');
  };

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log('Websocket received: ', message);
    listeners.forEach((listener) => {
      listener(message);
    });
  };

  socket.onclose = async (event) => {
    console.log('WebSocket disconnected');
    socket = null;
    if (intentionalDisconnect) {
      return;
    }
    if (event.code === 1008) {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        connectWebSocket();
        return;
      }
    }
    reconnectTimer = setTimeout(() => {
      connectWebSocket();
    }, RECONNECT_DELAY);
  };

  socket.onerror = (error) => {
    console.error('WebSocket error: ', error);
  };
  return socket;
};

export const subscribeToWebSocket = (listener: Listener) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

export const sendWebSocketMessage = (message: ClientMessage) => {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    console.log('Websocket is not connected');
    return;
  }
  socket.send(JSON.stringify(message));

  return true;
};

export const disconnectWebSocket = () => {
  if (!socket) {
    return;
  }
  intentionalDisconnect = true;
  socket.close(1000, 'User logged out');
  socket = null;
};
