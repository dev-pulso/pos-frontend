import { Outlet } from "react-router";
import { Toaster } from "sonner";

export const Layout = () => {
  return (
    <div className="flex w-full h-screen">
      <Outlet />
      <Toaster />
    </div>
  );
};
