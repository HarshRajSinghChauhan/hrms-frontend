"use client";

import { useState, useEffect } from "react";
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

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    employee_id: "",
    date: "",
    status: "Present",
  });

  // ✅ Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setForm({
        employee_id: "",
        date: "",
        status: "Present",
      });
    }
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();

    addAttendance(form, {
      onSuccess: () => {
        setOpen(false); // 🔥 Close modal after success
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            onChange={(e) =>
              setForm({
                ...form,
                employee_id: e.target.value.replace(/\D/g, ""),
              })
            }
            inputMode="numeric"
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
            value={form.status}
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
            {isPending ? "Saving..." : "Save"}
          </Button>

        </form>
      </DialogContent>
    </Dialog>
  );
}