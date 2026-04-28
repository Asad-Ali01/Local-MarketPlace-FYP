import './App.css'
import AppRoutes from './app/routes'
import AppProvider from './app/provider'
import ScrollToTop from './components/shared/ScrollToTop'
function App() {

  return (
    <AppProvider>
     <AppRoutes/>
     <ScrollToTop/>
    </AppProvider>
  )
}

export default App
