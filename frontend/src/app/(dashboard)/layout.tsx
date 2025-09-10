import { AppSidebar } from "@/components/dashboard/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded bg-[#1D1238] flex items-center justify-center">
                <span className="text-white font-bold text-xs">DT</span>
              </div>
              <span className="font-semibold">
                DevTalles Blog - Panel Administrativo
              </span>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col p-6 bg-gray-50/50">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
