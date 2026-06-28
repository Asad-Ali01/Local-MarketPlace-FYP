import { Provider } from "react-redux";
import { store,persistor } from "./store";
import {BrowserRouter} from 'react-router';
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";


function AppProvider({children} : {children: React.ReactNode}) {
  return (
    <Provider store={store}>
        <PersistGate persistor={persistor}>
        <BrowserRouter>
        <Toaster position="top-right" />
        {children}
        </BrowserRouter>
        </PersistGate>
    </Provider>
  )
}

export default AppProvider