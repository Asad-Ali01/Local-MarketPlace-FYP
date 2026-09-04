import './App.css'
import AppRoutes from './app/routes'
import AppProvider from './app/provider'
import ScrollToTop from './components/shared/ScrollToTop'
import { useEffect } from 'react'
import { connectWebSocket, disconnectWebSocket, subscribeToWebSocket } from './services/websocket/websocket'
import { useAppDispatch, useAppSelector } from './hooks/useAppDispatchSelector'
import { setOnlineUsers, userOffline, userOnline } from './features/chat/chatSlice'
function App() {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  useEffect(() => {
    let unsubscribe : null | ReturnType<typeof subscribeToWebSocket> = null;
    if(isAuthenticated){
        unsubscribe = subscribeToWebSocket((incoming) => {
        switch (incoming.type) {
          case "INITIAL_PRESENCE":
            console.log("INTIAL PRESENCE: ",incoming.payload.userIds);
            dispatch(setOnlineUsers(incoming.payload.userIds));
            break;

          case "USER_ONLINE":
            console.log("USERONLINE: ",incoming.payload.userId);
            dispatch(userOnline(incoming.payload.userId));
            break;

          case "USER_OFFLINE":
            console.log("USEROFFLINE: ",incoming.payload.userId);

            dispatch(userOffline(incoming.payload.userId));
            break;
        }
      });

      connectWebSocket();
    }
  return () => {
    disconnectWebSocket();
    unsubscribe?.();
  }    
  },[isAuthenticated])
  return (
    <>
     <AppRoutes/>
     <ScrollToTop/>
    </>
  )
}

export default App
