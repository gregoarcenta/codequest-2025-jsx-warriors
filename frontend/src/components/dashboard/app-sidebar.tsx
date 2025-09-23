"use client";

import {
  LayoutDashboard,
  Users,
  Folder,
  FileText,
  User,
  Settings,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavUser } from "@/components/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/stores/auth-store";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthStore();

  const data = {
    user: {
      name: user?.fullName || "Admin",
      email: user?.email || "admin@example.com",
      avatar: user?.avatarUrl || "/default_user.jpg",
    },
    teams: [
      {
        name: "DevTalles Blog",
        logo: LayoutDashboard,
        plan: "Admin Panel",
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        isActive: true,
      },
      {
        title: "Gestión",
        url: "#",
        icon: Settings,
        items: [
          {
            title: "Usuarios",
            url: "/dashboard/usuarios",
            icon: Users,
          },
          {
            title: "Categorías",
            url: "/dashboard/categorias",
            icon: Folder,
          },
          {
            title: "Artículos",
            url: "/dashboard/articulos",
            icon: FileText,
          },
        ],
      },
      {
        title: "Mi Perfil",
        url: "/dashboard/mi-perfil",
        icon: User,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
