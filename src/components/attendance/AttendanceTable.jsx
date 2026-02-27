"use client";

import { useAttendance } from "@/hooks/attendance/api";
import { Pencil } from "lucide-react";
import EditAttendanceDialog from "@/components/attendance/EditAttendanceDialog";
import { Loader2 } from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function AttendanceTable() {
    const { data, isLoading } = useAttendance();

    if (isLoading) return <div className="flex flex-row text-gray-600 font-semibold "><Loader2 className="animate-spin text-blue-500" /> Loading</div>;
    if (!data?.length) return <p>No records found.</p>;

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Emp ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {data?.map((rec) => (
                    <TableRow key={rec.id}>
                        <TableCell>{rec.employee.employee_id}</TableCell>
                        <TableCell>{rec.employee.full_name}</TableCell>
                        <TableCell>{rec.employee.department}</TableCell>
                        <TableCell>{rec.date}</TableCell>
                        <TableCell>{rec.status}</TableCell>

                        <TableCell className="flex items-center gap-3">

                            {/* EDIT */}
                            <EditAttendanceDialog
                                record={rec}
                                trigger={
                                    <Pencil className="cursor-pointer text-blue-500 hover:scale-110 transition" />
                                }
                            />

                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}