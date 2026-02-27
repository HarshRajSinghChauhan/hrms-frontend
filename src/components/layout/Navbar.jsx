"use client";

import { usePathname } from "next/navigation";

const titles = {
  "/": "Dashboard",
  "/employees": "Employees",
  "/attendance": "Attendance",
};

export default function Navbar() {
  const pathname = usePathname();
  const title = titles[pathname] || "HRMS";

  return (
    <header className="h-16 border-b bg-background flex items-center justify-between px-6 sticky top-0 z-50">
      
      {/* Page Title */}
      <h2 className="text-lg font-semibold">
        {title}
      </h2>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        <div className="text-sm text-muted-foreground">
          Admin
        </div>

      </div>
    </header>
  );
}