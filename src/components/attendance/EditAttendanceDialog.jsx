"use client";

import { useState } from "react";
import { useUpdateAttendance } from "@/hooks/attendance/api";

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

export default function EditAttendanceDialog({ record, trigger }) {
  const { mutate: updateAttendance, isPending } = useUpdateAttendance();

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    date: record.date,
    status: record.status,
  });

  const handleSubmit = () => {
    updateAttendance(
      {
        id: record.id,
        payload: form,
      },
      {
        onSuccess: () => setOpen(false),
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Attendance</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <Input
            type="date"
            value={form.date}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
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

          <Button onClick={handleSubmit} disabled={isPending}>
            Save Changes
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  );
}