import MarkAttendanceDialog from "@/app/attendance/MarkAttendanceDialog";
import AttendanceTable from "@/app/attendance/AttendanceTable";

export default function AttendancePage() {
  return (
    <main className="max-w-full border border-gray-200  bg-white rounded-lg shadow-sm p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Attendance
        </h1>

        <MarkAttendanceDialog />
      </div>

      <AttendanceTable />
    </main>
  );
}