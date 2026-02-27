"use client";

import { useEmployees, useDeleteEmployee } from "@/hooks/employees/api";
import { Trash2 } from "lucide-react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { Loader2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function EmployeeTable({ employeeId }) {
  const { data, isLoading } = useEmployees(employeeId);
  const { mutate: deleteEmployee } = useDeleteEmployee();

  if (isLoading) return <div className="flex flex-row text-gray-600 font-semibold "><Loader2 className="animate-spin text-blue-500" /> Loading</div>;

  if (!data?.length) return <p>No employees found.</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Emp ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((emp) => (
          <TableRow key={emp.id}>
            <TableCell>{emp.employee_id}</TableCell>
            <TableCell>{emp.full_name}</TableCell>
            <TableCell>{emp.email}</TableCell>
            <TableCell>{emp.department}</TableCell>

            <TableCell>
              <ConfirmDialog
                title="Delete Employee?"
                description="This will permanently remove the employee."
                onConfirm={() => deleteEmployee(emp.id)}
                trigger={
                  <Trash2 className="cursor-pointer text-red-500 hover:scale-110 transition" />
                }
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}