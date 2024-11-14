"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "./icons";
import { useCurrentUser } from "@/hooks/use-current-user";
import { logout } from "@/actions/login";

const navItems = {
  USER: [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Create Request", href: "/create-request" },
    { name: "Reports", href: "/reports" },
  ],
  ADMIN: [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Requests", href: "/admin/requests" },
    { name: "Pickup", href: "/pickup" },
  ],
  SUPERADMIN: [
    { name: "Dashboard", href: "/super-admin/dashboard" },
    { name: "Manage Users", href: "/super-admin/users" },
    { name: "Permissions", href: "/super-admin/permissions" },
  ],
};

export function Navbar() {
  const user = useCurrentUser();
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  const currentNavItems = navItems[user?.role || "USER"];

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-background border-b"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Icons.logo className="h-8 w-auto text-primary" />
              <span className="ml-2 text-xl font-bold text-foreground">
                Logo
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {currentNavItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  isActive={pathname === item.href}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <UserMenu userName={user?.name || "User"} userRole={user?.role} />
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <Button
              variant="ghost"
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <Icons.close className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Icons.menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0 },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="sm:hidden"
      >
        <div className="pt-2 pb-3 space-y-1">
          {currentNavItems.map((item) => (
            <MobileNavLink
              key={item.href}
              href={item.href}
              isActive={pathname === item.href}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </MobileNavLink>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-border">
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <Avatar>
                <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-foreground">
                {user?.name}
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                {user?.email}
              </div>
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <MobileNavLink
              href="/profile"
              onClick={() => setIsOpen(false)}
              isActive={false}
            >
              Profile
            </MobileNavLink>
            <MobileNavLink
              href="/settings"
              onClick={() => setIsOpen(false)}
              isActive={false}
            >
              Settings
            </MobileNavLink>
            <Button
              variant="ghost"
              className="w-full justify-start rounded-none px-4 py-2 text-base"
              onClick={handleLogout}
            >
              Sign out
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}

function NavLink({
  href,
  isActive,
  children,
}: {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium",
        isActive
          ? "border-primary text-foreground"
          : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
      )}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  isActive,
  onClick,
  children,
}: {
  href: string;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "block pl-3 pr-4 py-2 border-l-4 text-base font-medium",
        isActive
          ? "bg-primary-foreground border-primary text-foreground"
          : "border-transparent text-muted-foreground hover:bg-accent hover:border-border hover:text-foreground"
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

function UserMenu({
  userName,
  userRole,
}: {
  userName?: string;
  userRole?: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center text-sm focus:outline-none"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="ml-2 hidden md:block text-foreground">
            {userName}
          </span>
          <Icons.chevronDown className="ml-1 h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <Icons.user className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">
            <Icons.settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        {userRole === "SUPERADMIN" && (
          <DropdownMenuItem asChild>
            <Link href="/super-admin/users">
              <Icons.user className="mr-2 h-4 w-4" />
              <span>Manage Users</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <Icons.logout className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
