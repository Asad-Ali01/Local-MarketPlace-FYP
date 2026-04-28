import { Navigate, Outlet } from 'react-router';
import { useAppSelector } from '../hooks/useAppDispatchSelector'
import Navbar from '../components/shared/Navbar';
import Footer from '@/components/shared/Footer';
function MainLayout() {
    const isAuthenticated = useAppSelector(state=> state.auth.isAuthenticated);
// if(!isAuthenticated){
//     return <Navigate to="/login" replace/>;
// }
return(
    <div>
        <header>

        <Navbar/>
        </header>
        <main>

        <Outlet/>
        </main>
        <footer>
            <Footer/>
        </footer>
    </div>
)
}

export default MainLayout