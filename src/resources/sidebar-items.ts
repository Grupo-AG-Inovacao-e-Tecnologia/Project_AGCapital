import { paths } from "@/lib/paths";
import {
  IconDashboard,
  IconMessage,
  IconReport,
  IconUsers,
  IconUserPlus,
} from "@tabler/icons-react";

export type SidebarSection = {
  name: string;
  items: {
    name: string;
    url: string;
    icon: React.ElementType;
  }[];
};

export type SidebarUser = {
  name: string;
  email: string;
  avatar: string;
};

export const sidebarItems = {
  navMain: [
    {
      name: "Dashboard",
      url: paths.home,
      icon: IconDashboard,
    },
    {
      name: "Enrollment Leads",
      url: paths.enrollmentLeads,
      icon: IconUserPlus,
    },
    {
      name: "Relatórios",
      url: paths.reports,
      icon: IconReport,
    },
    {
      name: "Chat",
      url: paths.chat,
      icon: IconMessage,
    },
    {
      name: "Funcionários",
      url: paths.employees,
      icon: IconUsers,
    },
  ],
  sections: [] as SidebarSection[],
};
