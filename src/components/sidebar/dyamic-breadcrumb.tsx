"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface CustomBreadcrumbItem {
  href: string;
  icon?: React.ReactNode;
  label: string;
}

interface BreadcrumbProps {
  homeElement?: React.ReactNode;
  separator?: React.ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
  customItems?: CustomBreadcrumbItem[];
}

const DynamicBreadcrumb: React.FC<BreadcrumbProps> = ({
  homeElement,
  separator,
  containerClasses,
  listClasses,
  activeClasses,
  capitalizeLinks = false,
  customItems,
}) => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  const renderBreadcrumbItems = () => {
    if (customItems) {
      return customItems.map((item, index) => (
        <React.Fragment key={index}>
          <BreadcrumbItem>
            {index === customItems.length - 1 ? (
              <BreadcrumbPage className={activeClasses}>
                {item.icon}
                <span>{item.label}</span>
              </BreadcrumbPage>
            ) : (
              <BreadcrumbLink href={item.href} className={activeClasses}>
                {item.icon}
                <span>{item.label}</span>
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
          {index < customItems.length - 1 && (
            <BreadcrumbSeparator>
              {separator || <ChevronRight className="h-4 w-4" />}
            </BreadcrumbSeparator>
          )}
        </React.Fragment>
      ));
    }

    return pathNames.map((link, index) => {
      let href = `/${pathNames.slice(0, index + 1).join("/")}`;
      let itemClasses = index === pathNames.length - 1 ? activeClasses : "";
      let itemContent = capitalizeLinks
        ? link[0].toUpperCase() + link.slice(1)
        : link;

      return (
        <React.Fragment key={index}>
          <BreadcrumbItem>
            {index === pathNames.length - 1 ? (
              <BreadcrumbPage className={itemClasses}>
                {itemContent}
              </BreadcrumbPage>
            ) : (
              <BreadcrumbLink href={href} className={itemClasses}>
                {itemContent}
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
          {index < pathNames.length - 1 && (
            <BreadcrumbSeparator>
              {separator || <ChevronRight className="h-4 w-4" />}
            </BreadcrumbSeparator>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <Breadcrumb className={containerClasses}>
      <BreadcrumbList className={listClasses}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            {homeElement || <Home className="h-4 w-4" />}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          {separator || <ChevronRight className="h-4 w-4" />}
        </BreadcrumbSeparator>
        {renderBreadcrumbItems()}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
