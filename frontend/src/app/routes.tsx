import { Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
const HomePage = lazy(() => import("../pages/home/HomePage"));
const MainLayout = lazy(() => import("../layouts/MainLayout"));
const AboutPage = lazy(() => import("../pages/about/AboutPage"));
import { Spin } from "antd";
import RegisterPage from "../pages/auth/RegisterPage";
import { GlobalLoader } from "@/components/shared/GlobalLoader";
import LoginPage from "@/pages/auth/LoginPage";
import ContactPage from "@/pages/contact/ContactPage";
import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import UnAuthorizedPage from "@/components/shared/UnAuthorizedPage";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import AdminUserManagementPage from "@/pages/admin/AdminUserManagementPage";
import AdminUserEditPage from "@/pages/admin/AdminUserEditPage";
import AdminLayout from "@/layouts/AdminLayout";
import ProviderGigPage from "@/pages/gig/ProviderGigPage";
import PageNotFound from "@/components/shared/PageNotFound";
import OtpSendPage from "@/pages/otp/OtpSendPage";
import OtpVerifyPage from "@/pages/otp/OtpVerifyPage";
import OtpResetPasswordPage from "@/pages/otp/OtpResetPasswordPage";
import ProviderLayout from "@/layouts/ProviderLayout";
import ProviderLandingPage from "@/pages/gig/ProviderLandingPage";
import ProviderDashboardPage from "@/pages/gig/ProviderDashboardPage";
import CategoryManagement from "@/pages/admin/CategoryManagement";
import ProviderListing from "@/components/giglisting/ProvoiderListing";
import ProviderListingPage from "@/pages/providerlisting/providerListingPage";
import GetMyAllGigs from "@/components/gig/GetMyAllGigs";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import ViewGigDetailsById from "@/components/gig/ViewGigDetailsById";
import GigDetailsViewPage from "@/pages/gig/GigDetailsViewPage";
import ClientLayout from "@/layouts/ClientLayout";
import ClientDashboard from "@/components/client/ClientDashboard";
import LoginReminder from "@/components/shared/LoginReminder";
import GigListings from "@/components/giglisting/ProvoiderListing";
import HomeCategory from "@/components/home/HomeCategory";
import ChatPage from "@/pages/chat/ChatPage";
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
            <Route path="gig/details/:gigId" element={<GigDetailsViewPage />} />
            <Route
              path="otp/reset-password"
              element={<OtpResetPasswordPage />}
            />
            <Route
              path="giglistings/:slug"
              element={
                <ErrorBoundary
                  fallback={<div className="h-80">Provider Listing failed</div>}
                >
                  <ProviderListingPage />{" "}
                </ErrorBoundary>
              }
            />
            <Route path="login/reminder" element={<LoginReminder />} />
          </Route>

          {/* ADMIN ROUTES */}
          {/* Admin protected routes */}
          <Route path="admin" element={<AdminLayout />}>
            <Route path="login" element={<AdminLoginPage />} />
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
            <Route path="create-gig" element={<ProviderGigPage />} />
            <Route path="gigs" element={<GetMyAllGigs />} />
            <Route path="gig/details/:gigId" element={<GigDetailsViewPage />} />
            <Route
              path="messages/:conversationId?"
              element={
                <ErrorBoundary
                  fallback={<div className="h-80">Chat loading failed</div>}
                >
                  <ChatPage />
                </ErrorBoundary>
              }
            />
          </Route>

          {/* CLient */}
          <Route path="client" element={<ClientLayout />}>
            <Route index element={<ClientDashboard />} />
            <Route path="messages">
              <Route
                index
                element={
                  <ErrorBoundary
                    fallback={<div className="h-80">Chat loading failed</div>}
                  >
                    <ChatPage />
                  </ErrorBoundary>
                }
              />

              <Route
                path="new"
                element={
                  <ErrorBoundary
                    fallback={<div className="h-80">Chat loading failed</div>}
                  >
                    <ChatPage />
                  </ErrorBoundary>
                }
              />

              <Route
                path=":conversationId"
                element={
                  <ErrorBoundary
                    fallback={<div className="h-80">Chat loading failed</div>}
                  >
                    <ChatPage />
                  </ErrorBoundary>
                }
              />
            </Route>
            <Route
              path="categories"
              element={<HomeCategory isClientLogin={true} />}
            />
            <Route
              path="giglistings/:slug"
              element={
                <ErrorBoundary
                  fallback={<div className="h-80">Provider Listing failed</div>}
                >
                  <GigListings />{" "}
                </ErrorBoundary>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default AppRoutes;
