"use client";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import AdminGuard from "@/components/dashboard/admin-guard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background">
            <div className="flex items-center gap-2 px-4 flex-1">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-foreground">
                  DevTalles Blog - Panel Administrativo
                </span>
              </div>
            </div>
            <div className="px-4">
              <ThemeToggle />
            </div>
          </header>
          <div className="flex flex-1 flex-col p-6 bg-background">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AdminGuard>
  );
}
