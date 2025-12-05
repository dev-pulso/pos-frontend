"use client";

import * as React from "react";
import {
  ArrowLeftRightIcon,
  BarChart3,
  DollarSign,
  LayoutDashboardIcon,
  LifeBuoy,
  Package,
  Send,
  Settings,
  ShoppingCart,
  Vegan,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Rols } from "@/app/interface/productos.interface";
import { Link } from "react-router";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
      isActive: true,
      allowedRoles: [Rols.ADMIN, Rols.SUPER_ADMIN],
    },
    {
      title: "Punto de venta",
      url: "/punto-venta",
      icon: ShoppingCart,
      isActive: false,
      allowedRoles: [Rols.ADMIN, Rols.SUPER_ADMIN, Rols.CASHIER],
    },
    {
      title: "Productos",
      url: "/productos",
      icon: Package,
      isActive: false,
      allowedRoles: [Rols.ADMIN, Rols.SUPER_ADMIN],
    },
    {
      title: "Inventario",
      url: "/inventario",
      icon: ArrowLeftRightIcon,
      isActive: false,
      allowedRoles: [Rols.ADMIN, Rols.SUPER_ADMIN],
    },
    {
      title: "Caja",
      url: "/caja",
      icon: DollarSign,
      isActive: false,
      allowedRoles: [Rols.ADMIN, Rols.SUPER_ADMIN],
    },
    {
      title: "Reportes",
      url: "/reportes",
      icon: BarChart3,
      isActive: false,
      allowedRoles: [Rols.ADMIN, Rols.SUPER_ADMIN],
    },
    {
      title: "Configuración",
      url: "#",
      icon: Settings,
      isActive: false,
      allowedRoles: [Rols.ADMIN, Rols.SUPER_ADMIN],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/punto-venta">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Vegan className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Tienda Oriental</span>
                  <span className="truncate text-xs">Sistema POS</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
