import { Route, Routes } from 'react-router'
import { lazy,Suspense } from 'react'
const HomePage = lazy(() => import('../modules/home/pages/HomePage'))
const MainLayout = lazy(() => import('../layouts/MainLayout'))
import {Spin} from 'antd';
import RegisterPage from '../modules/auth/pages/RegisterPage';
import { GlobalLoader } from '@/components/shared/GlobalLoader';
import LoginPage from '@/modules/auth/pages/LoginPage';
function AppRoutes() {

  return (
    <>
    
    <GlobalLoader/>
    <Suspense fallback={
      <div className='h-screen grid place-items-center'>
                <Spin size='large'/>
        </div>
    }>
        
    <Routes>
        <Route element={<MainLayout/>}>

        <Route path='/' element={<HomePage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>

        </Route>
    </Routes>
    </Suspense>
    </>
  )
}

export default AppRoutes