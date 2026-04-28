import { Route, Routes } from 'react-router'
import { lazy,Suspense } from 'react'
const HomePage = lazy(() => import('../modules/home/pages/HomePage'))
const MainLayout = lazy(() => import('../layouts/MainLayout'))
const AboutPage = lazy(() => import('../modules/about/pages/AboutPage'))
import {Spin} from 'antd';
import RegisterPage from '../modules/auth/pages/RegisterPage';
import { GlobalLoader } from '@/components/shared/GlobalLoader';
import LoginPage from '@/modules/auth/pages/LoginPage';
import ContactPage from '@/modules/contact/pages/ContactPage'
import AdminLoginPage from '@/modules/admin/pages/AdminLoginPage'
import UnAuthorizedPage from '@/components/shared/UnAuthorizedPage'
import AdminDashboardPage from '@/modules/admin/pages/AdminDashboardPage'
import AdminUserManagementPage from '@/modules/admin/pages/AdminUserManagementPage'
import AdminUserEditPage from '@/modules/admin/pages/AdminUserEditPage'
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
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/contact-us' element={<ContactPage/>}/>
        <Route path='/about-us' element={<AboutPage/>}/>
        <Route path='/admin' element={<AdminLoginPage/>}/>
        <Route path='/unauthorized' element={<UnAuthorizedPage/>}/>
        <Route path='/dashboard' element={<AdminDashboardPage/>}/>
        <Route path='/user-management' element={<AdminUserManagementPage/>}/>
        <Route path='/admin-edit-user/:userId' element={<AdminUserEditPage/>}/>

        </Route>
    </Routes>
    </Suspense>
    </>
  )
}

export default AppRoutes