import { useCurrentProfile, useCurrentUser } from "@/hooks/use-current-user";
import { Frame, LayoutDashboard, Settings } from "lucide-react";

export const SidebarData = async () => {
  const user = useCurrentUser();
  const warehouse = await useCurrentProfile();
  const data = {
    user: {
      name: user?.name || "",
      email: user?.email || "",
      avatar: user?.image || "/avatars/shadcn.jpg",
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
  };

  return data;
};
