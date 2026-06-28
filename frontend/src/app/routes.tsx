import { Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
const HomePage = lazy(() => import("../modules/home/pages/HomePage"));
const MainLayout = lazy(() => import("../layouts/MainLayout"));
const AboutPage = lazy(() => import("../modules/about/pages/AboutPage"));
import { Spin } from "antd";
import RegisterPage from "../modules/auth/pages/RegisterPage";
import { GlobalLoader } from "@/components/shared/GlobalLoader";
import LoginPage from "@/modules/auth/pages/LoginPage";
import ContactPage from "@/modules/contact/pages/ContactPage";
import AdminLoginPage from "@/modules/admin/pages/AdminLoginPage";
import UnAuthorizedPage from "@/components/shared/UnAuthorizedPage";
import AdminDashboardPage from "@/modules/admin/pages/AdminDashboardPage";
import AdminUserManagementPage from "@/modules/admin/pages/AdminUserManagementPage";
import AdminUserEditPage from "@/modules/admin/pages/AdminUserEditPage";
import AdminLayout from "@/layouts/AdminLayout";
import ProviderGigPage from "@/modules/provider/pages/ProviderGigPage";
import ClientPostPage from "@/modules/client/pages/ClientPostPage";
import PageNotFound from "@/components/shared/PageNotFound";
import ForgertPasswordPage from "@/modules/ForgetPassword.tsx/pages/OtpResetPasswordPage";
import OtpSend from "@/modules/ForgetPassword.tsx/components/OtpSend";
import OtpVerify from "@/modules/ForgetPassword.tsx/components/OtpVerify";
import OtpResetPassword from "@/modules/ForgetPassword.tsx/components/OtpResetPassword";
import OtpSendPage from "@/modules/ForgetPassword.tsx/pages/OtpSendPage";
import OtpVerifyPage from "@/modules/ForgetPassword.tsx/pages/OtpVerifyPage";
import OtpResetPasswordPage from "@/modules/ForgetPassword.tsx/pages/OtpResetPasswordPage";
import ProviderLayout from "@/layouts/ProviderLayout";
import ProviderLandingPage from "@/modules/provider/pages/ProviderLandingPage";
import ProviderDashboardPage from "@/modules/provider/pages/ProviderDashboardPage";
import CategoryManagement from "@/modules/admin/pages/CategoryManagement";
function AppRoutes() {
  return (
    <>
      <GlobalLoader />
      <Suspense
        fallback={
          <div className="h-screen grid place-items-center">
            <Spin size="large" />
          </div>
        }
      >
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="contact-us" element={<ContactPage />} />
            <Route path="about-us" element={<AboutPage />} />
            <Route path="unauthorized" element={<UnAuthorizedPage />} />
            <Route path="forgot-password" element={<OtpSendPage />} />
            <Route path="otp/send" element={<OtpSendPage />} />
            <Route path="otp/verify" element={<OtpVerifyPage />} />
            <Route
              path="otp/reset-password"
              element={<OtpResetPasswordPage />}
            />
          </Route>

          {/* ADMIN ROUTES */}
          <Route path="admin/login" element={<AdminLoginPage />} />
          {/* Admin protected routes */}
          <Route path="admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route
              path="user-management"
              element={<AdminUserManagementPage />}
            />
            <Route path="edit-user/:userId" element={<AdminUserEditPage />} />
            <Route path="categories" element={<CategoryManagement />} />
          </Route>
          {/* Provider  */}
          <Route path="provider" element={<ProviderLayout />}>
            <Route index element={<ProviderLandingPage />} />
            <Route path="dashboard" element={<ProviderDashboardPage />} />
          </Route>
          <Route path="provider-gig" element={<ProviderGigPage />} />
          <Route path="client-post" element={<ClientPostPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default AppRoutes;
