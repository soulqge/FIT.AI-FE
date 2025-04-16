"use client";

import { cn } from "@/lib/utils";
import { Home, PieChart, Settings, Utensils } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    path: "/dashboard",
    label: "Home",
    icon: Home,
  },
  {
    path: "/dashboard/food-log",
    label: "Food Log",
    icon: Utensils,
  },
  {
    path: "/dashboard/progress",
    label: "Progress",
    icon: PieChart,
  },
  {
    path: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
  },
];

export function BottomNavigation() {
  const pathname = usePathname();

  // Don't show navigation on auth pages
  if (
    pathname === "/" ||
    pathname === "/signup" ||
    pathname === "/signin" ||
    pathname === "/profile-setup"
  ) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background z-50">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full text-xs transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
