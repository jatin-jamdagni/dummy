"use client";

import React from "react";
import { usePathname } from "next/navigation";
import DynamicBreadcrumb from "./dyamic-breadcrumb";
import { Gamepad2, Book, CuboidIcon as CubeIcon } from "lucide-react";

interface CustomRoute {
  icon: React.ReactNode;
  label: string;
}

const customRoutes: Record<string, CustomRoute> = {
  "/playground": {
    icon: <Gamepad2 className="h-4 w-4" />,
    label: "Playground",
  },
  "/models": { icon: <CubeIcon className="h-4 w-4" />, label: "Models" },
  "/documentation": { icon: <Book className="h-4 w-4" />, label: "Docs" },
};

const CustomBreadcrumb: React.FC = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const customizedPathnames = pathSegments.map((segment, index) => {
    const currentPath = `/${pathSegments.slice(0, index + 1).join("/")}`;
    return customRoutes[currentPath] || { icon: null, label: segment };
  });

  return (
    <DynamicBreadcrumb
      containerClasses="py-4 px-6"
      activeClasses="font-bold text-blue-600"
      capitalizeLinks={true}
      customItems={customizedPathnames.map((segment, index) => ({
        href: `/${pathSegments.slice(0, index + 1).join("/")}`,
        icon: segment.icon,
        label: segment.label,
      }))}
    />
  );
};

export default CustomBreadcrumb;
