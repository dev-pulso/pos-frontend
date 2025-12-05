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
const DashboardPage = lazy(
  () => import("@/app/pages/privates/dashboard/Dashboard")
);
const InventarioPage = lazy(
  () => import("@/app/pages/privates/inventario/Inventario")
);
const CajaPage = lazy(() => import("@/app/pages/privates/caja/Caja"));
const ReportesPage = lazy(
  () => import("@/app/pages/privates/reportes/Reportes")
);
const ProductosPage = lazy(
  () => import("@/app/pages/privates/productos/Productos")
);

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
          element={
            <Suspense fallback={<POSLoading />}>
              <PrivateRoute isAuthenticated={true}>
                <Layout />
              </PrivateRoute>
            </Suspense>
          }
        >
          <Route
            path="/punto-venta"
            element={
              <Suspense fallback={<POSLoading />}>
                <PrivateRoute isAuthenticated={true}>
                  <HomePage />
                </PrivateRoute>
              </Suspense>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<POSLoading />}>
                <PrivateRoute isAuthenticated={true}>
                  <DashboardPage />
                </PrivateRoute>
              </Suspense>
            }
          />
          <Route
            path="/inventario"
            element={
              <Suspense fallback={<POSLoading />}>
                <PrivateRoute isAuthenticated={true}>
                  <InventarioPage />
                </PrivateRoute>
              </Suspense>
            }
          />
          <Route
            path="/caja"
            element={
              <Suspense fallback={<POSLoading />}>
                <PrivateRoute isAuthenticated={true}>
                  <CajaPage />
                </PrivateRoute>
              </Suspense>
            }
          />
          <Route
            path="/reportes"
            element={
              <Suspense fallback={<POSLoading />}>
                <PrivateRoute isAuthenticated={true}>
                  <ReportesPage />
                </PrivateRoute>
              </Suspense>
            }
          />
          <Route
            path="/productos"
            element={
              <Suspense fallback={<POSLoading />}>
                <PrivateRoute isAuthenticated={true}>
                  <ProductosPage />
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
