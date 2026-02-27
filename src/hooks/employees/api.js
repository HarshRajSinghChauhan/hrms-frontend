import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";

// Fetch Employees
export const useEmployees = (employeeId) => {
  return useQuery({
    queryKey: ["employees", employeeId],
    queryFn: async () => {
      const url = employeeId
        ? `employees/?employee_id=${employeeId}`
        : "employees/";

      const { data } = await axiosInstance.get(url);
      return data;
    },
  });
};

// Add Employee
export const useAddEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newEmployee) => {
            const { data } = await axiosInstance.post(
                "employees/",
                newEmployee
            );
            return data;
        },
        onSuccess: () => {
            toast.success("Employee added successfully");
            queryClient.invalidateQueries(["employees"]);
        },
        onError: (error) => {
            toast.error(
                error?.response?.data?.detail ||
                "Failed to add employee."
            );
        }
    });
};

// Delete Employee
export const useDeleteEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            await axiosInstance.delete(`employees/${id}/`);
        },
        onSuccess: () => {
            toast.success("Employee deleted successfully");
            queryClient.invalidateQueries(["employees"]);
        },
        onError: () => { 
            toast.error("Failed to delete employee");
        }
    });
};

// Fetch employee by employee_id
export const useEmployeeByCode = (employeeId) => {
  return useQuery({
    queryKey: ["employee", employeeId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `employees/?employee_id=${employeeId}`
      );
      return data?.[0] || null; 
    },
    enabled: !!employeeId, 
  });
};