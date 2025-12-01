import { Navigate } from "react-router";

export const PrivateRoute = ({
  isAuthenticated,
  children,
}: {
  isAuthenticated: boolean;
  children: React.ReactNode;
}) => {
  return isAuthenticated ? children : <Navigate to="/auth" />;
};
