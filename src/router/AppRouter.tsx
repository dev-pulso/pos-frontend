import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Layout } from "@/components/layouts/Layout";
import { PrivateRoute } from "@/components/private-route";
import { POSLoading } from "@/components/loading";
import NotFoundPage from "@/components/not-found";

const LoginPage = lazy(() => import("@/app/pages/public/login/Login"));
const RegisterPage = lazy(() => import("@/app/pages/public/register/Register"));
const HomePage = lazy(() => import("@/app/pages/privates/home/HomePage"));
const AdminPage = lazy(() => import("@/app/pages/privates/admin/AdminPage"));

export const AppRouter = () => {
  // const { isAuthenticated } = useAuthStore()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
        </Route>
        <Route
          path="/inicio"
          element={
            <Suspense fallback={<POSLoading />}>
              <PrivateRoute isAuthenticated={true}>
                <Layout />
              </PrivateRoute>
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<POSLoading />}>
                <PrivateRoute isAuthenticated={true}>
                  <HomePage />
                </PrivateRoute>
              </Suspense>
            }
          />
          <Route
            path="/inicio/admin"
            element={
              <Suspense fallback={<POSLoading />}>
                <PrivateRoute isAuthenticated={true}>
                  <AdminPage />
                </PrivateRoute>
              </Suspense>
            }
          />
        </Route>
        <Route path="/" element={<Navigate to="/auth" />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
