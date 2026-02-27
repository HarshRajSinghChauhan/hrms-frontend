"use client";

import { useState } from "react";
import { useAddAttendance } from "@/hooks/attendance/api";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function MarkAttendanceDialog() {
    const { mutate: addAttendance, isPending } = useAddAttendance();

    const [form, setForm] = useState({
        employee_id: "",
        date: "",
        status: "Present",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        addAttendance({
            employee_id: form.employee_id,
            date: form.date,
            status: form.status,
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Mark Attendance</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Mark Attendance</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <Input
                        placeholder="Employee ID (e.g. 001)"
                        value={form.employee_id}
                        onChange={(e) => {
                            const value = e.target.value;

                            // Allow only digits (0–9)
                            if (/^\d*$/.test(value)) {
                                setForm({ ...form, employee_id: value });
                            }
                        }}
                        required
                    />

                    <Input
                        type="date"
                        max={new Date().toISOString().split("T")[0]}
                        value={form.date}
                        onChange={(e) =>
                            setForm({ ...form, date: e.target.value })
                        }
                        required
                    />

                    <Select
                        defaultValue="Present"
                        onValueChange={(value) =>
                            setForm({ ...form, status: value })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="Present">Present</SelectItem>
                            <SelectItem value="Absent">Absent</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button type="submit" disabled={isPending}>
                        Save
                    </Button>

                </form>
            </DialogContent>
        </Dialog>
    );
}