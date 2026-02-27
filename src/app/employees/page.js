"use client";

import { useState } from "react";
import AddEmployeeDialog from "@/components/employees/AddEmployeeDialog";
import EmployeeTable from "@/components/employees/EmployeeTable";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EmployeesPage() {
  const [inputValue, setInputValue] = useState("");
  const [searchId, setSearchId] = useState("");

  const handleSearch = () => {
    setSearchId(inputValue);
  };

  const handleClear = () => {
    setInputValue("");
    setSearchId("");
  };

  return (
    <main className="max-w-full border border-gray-200  bg-white rounded-lg shadow-sm p-8 space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Employees</h1>
        <AddEmployeeDialog />
      </div>

      {/* Search Section */}
      <div className="flex gap-3">

        <Input
          placeholder="Enter Employee ID (e.g. 001)"
          value={inputValue}
          onChange={(e) =>
            setInputValue(e.target.value.replace(/\D/g, ""))
          }
        />

        <Button onClick={handleSearch}>
          Search
        </Button>

        <Button variant="outline" onClick={handleClear}>
          Clear
        </Button>

      </div>

      <EmployeeTable employeeId={searchId} />

    </main>
  );
}