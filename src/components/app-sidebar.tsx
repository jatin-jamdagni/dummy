"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useCurrentUser, useCurrentProfile } from "@/hooks/use-current-user";
import { Frame, LayoutDashboard, LucideIcon, Settings } from "lucide-react";
import { useSession } from "next-auth/react";
import prisma from "@/lib/db";

interface Project {
  name: string;
  url: string;
  icon: LucideIcon;
}

const useSidebarData = () => {
  const currentUser = useCurrentUser();
  const [data, setData] = React.useState<{
    user: { name: string; email: string; avatar: string };
    warehouses: { name: string; location: string }[];
    projects: Project[];
  }>({
    user: { name: "", email: "", avatar: "" },
    warehouses: [],
    projects: [],
  });

  React.useEffect(() => {
    const fetchSidebarData = async () => {
      const session = useSession();
      console.log("this is session", session.data?.user.id);
      try {
        if (!session.data?.user.id) {
          throw new Error("User is not logged in.");
        }
      
        const warehouse = await prisma.user.findUnique({
          where: {
            id: session.data.user.id,
          },
          select: {
            warehouseId: true,
            assignedWarehouse: {
              select: {
                id: true,
                location: true,
              },
            },
          },
        });
      
        return warehouse;
      };
      
        setData({
          user: {
            name: currentUser?.name || "",
            email: currentUser?.email || "",
            avatar: currentUser?.image || "/avatars/shadcn.jpg",
          },
          warehouses: Array.isArray(warehouse?.assignedWarehouse)
            ? warehouse.assignedWarehouse.map((wh) => ({
                name: wh.name,
                location: wh.location,
              }))
            : [],
          projects: [
            {
              name: "Dashboard",
              url: "/dashboard",
              icon: LayoutDashboard,
            },
            {
              name: "Report",
              url: "/user",
              icon: Frame,
            },
            {
              name: "Settings",
              url: "/settings",
              icon: Settings,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      }
    };

    fetchSidebarData();
  }, [currentUser]);

  return data;
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = useSidebarData();
  console.log("this is complete data", data);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.warehouses} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
