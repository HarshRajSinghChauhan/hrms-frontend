import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";

// Get all attendance records
export const useAttendance = () =>
    useQuery({
        queryKey: ["attendance"],
        queryFn: async () => {
            const { data } = await axiosInstance.get("attendance/");
            return data;
        },
    });

// Add attendancea
export const useAddAttendance = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload) => {
            const { data } = await axiosInstance.post("attendance/", payload);
            return data;
        },
        onSuccess: () => {
            toast.success("Attendance marked successfully");
            queryClient.invalidateQueries(["attendance"]);
        },
        onError: (error) => {
            toast.error(
                error?.response?.data?.detail ||
                "Failed to mark attendance."
            );
        },
    });
};

// Update attendance
export const useUpdateAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }) => {
      const { data } = await axiosInstance.patch(
        `attendance/${id}/`,
        payload
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Attendance updated");
      queryClient.invalidateQueries(["attendance"]);
    },
    onError: () => {
      toast.error("Update failed ");
    },
  });
};