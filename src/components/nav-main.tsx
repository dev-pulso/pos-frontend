import { type LucideIcon } from "lucide-react";

import { Collapsible } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/auth.store";
import type { Rols } from "@/app/interface/user.interface";
import { Link } from "react-router";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    allowedRoles?: Rols[];
    // items?: {
    //   title: string;
    //   url: string;
    // }[];
  }[];
}) {
  const { hasRole, user } = useAuthStore();

  const filteredItems = items.filter((item) => {
    if (!item.allowedRoles || item.allowedRoles.length === 0) return true;

    if (!user) return false;

    return hasRole(item.allowedRoles);
  });

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Administración del sistema</SidebarGroupLabel>
      <SidebarMenu>
        {filteredItems.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link to={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
              {/*  */}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
