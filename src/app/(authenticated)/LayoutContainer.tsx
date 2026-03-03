import { AppSidebar } from "@/components/templates/Sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function LayoutContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <div className="flex flex-col flex-1">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
