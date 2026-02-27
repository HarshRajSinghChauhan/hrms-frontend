"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Employees",
    href: "/employees",
    icon: Users,
  },
  {
    title: "Attendance",
    href: "/attendance",
    icon: CalendarCheck,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-background h-screen p-5 flex flex-col">

      <div className="mb-8">
        <h1 className="text-xl font-bold">
          HRMS Lite
        </h1>
      </div>

      <nav className="space-y-2">
        {navItems.map(({ title, href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition
                ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
            >
              <Icon className="h-5 w-5" />
              {title}
            </Link>
          );
        })}
      </nav>

    </aside>
  );
}