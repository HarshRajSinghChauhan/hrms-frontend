"use client";

import Link from "next/link";
import { Users, CalendarCheck, LayoutDashboard } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="max-w-full p-8 border border-gray-200  bg-white rounded-lg shadow-sm space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <LayoutDashboard className="h-7 w-7" />
          HRMS Dashboard
        </h1>

        <p className="text-muted-foreground mt-2">
          Manage employees and track attendance efficiently.
        </p>
      </div>

      {/* Navigation Cards */}
      <div className="grid gap-6 md:grid-cols-2">

        {/* Employees */}
        <Link href="/employees" className="group">
          <Card className="transition hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center gap-4">
              <Users className="h-8 w-8 text-primary" />

              <div>
                <CardTitle>Employees</CardTitle>
                <CardDescription>
                  Add, view and manage employee records
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-sm font-medium text-primary group-hover:underline">
                Go to Employees →
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Attendance */}
        <Link href="/attendance" className="group">
          <Card className="transition hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center gap-4">
              <CalendarCheck className="h-8 w-8 text-primary" />

              <div>
                <CardTitle>Attendance</CardTitle>
                <CardDescription>
                  Mark and review daily attendance
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-sm font-medium text-primary group-hover:underline">
                Go to Attendance →
              </p>
            </CardContent>
          </Card>
        </Link>

      </div>

    </main>
  );
}