import { auth, sessionToGetUser } from "@/lib/auth";
import { AppSidebar } from "@/components/templates/Sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function LayoutContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = sessionToGetUser(session);

  return (
    <SidebarProvider>
      <AppSidebar user={user} variant="inset" />
      <SidebarInset>
        <div className="flex flex-col flex-1">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
