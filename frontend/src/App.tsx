import './App.css'
import AppRoutes from './app/routes'
import AppProvider from './app/provider'
function App() {

  return (
    <AppProvider>
     <AppRoutes/>
    </AppProvider>
  )
}

export default App
