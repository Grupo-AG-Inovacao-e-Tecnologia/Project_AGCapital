"use client";

import { NavMain } from "@/components/templates/Sidebar/nav-main";
import { NavSection } from "@/components/templates/Sidebar/nav-section";
import { NavUser } from "@/components/templates/Sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { sidebarItems } from "@/resources/sidebar-items";
import Image from "next/image";

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="w-full px-4 mb-4">
            <Image
              src="/logo.png"
              alt="FranceTech"
              width={400}
              height={200}
              className="w-full object-cover"
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-4">
        <NavMain items={sidebarItems.navMain} />
        {sidebarItems.sections.map((section) => (
          <NavSection
            key={section.name}
            title={section.name}
            items={section.items}
          />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarItems.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
