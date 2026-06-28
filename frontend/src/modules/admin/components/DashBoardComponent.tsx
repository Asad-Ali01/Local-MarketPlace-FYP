import { Button } from "@/components/ui/button";
import { useAdminGetStatsApiMutation } from "@/features/admin/adminApi";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function DashboardComponent() {
  const [range, setRange] = useState("7d");
  const [adminGetStats, { data }] = useAdminGetStatsApiMutation();
  useEffect(() => {
    handleRange("7d");
  }, []);
  const handleRange = async (value: string) => {
    try {
      setRange(value);
      await adminGetStats(value);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("Here is results: ", data);
  const apiResponse = data?.data;
  return (
    <div className={`h-300 sm:h-180  lg:h-160 `}>
      <div className="p-6  ">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-sm font-medium text-gray-500">Total Users</h2>
            <p className="text-2xl font-bold text-gray-900">
              {apiResponse?.totalUsers}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-sm font-medium text-gray-500">
              Pending Approvals
            </h2>
            <p className="text-2xl font-bold text-gray-900">
              {apiResponse?.pendingApprovals}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-sm font-medium text-gray-500">
              Approved Users
            </h2>
            <p className="text-2xl font-bold text-gray-900">
              {apiResponse?.approvedUsers}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-sm font-medium text-gray-500">
              Rejected Users
            </h2>
            <p className="text-2xl font-bold text-gray-900">
              {apiResponse?.rejectedUsers}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full   mb-20   p-4 shadow">
        <Button
          className={`${range === "7d" && "bg-blue-900"}`}
          onClick={() => handleRange("7d")}
        >
          7d
        </Button>
        <Button
          className={`${range === "30d" && "bg-blue-900"}`}
          onClick={() => handleRange("30d")}
        >
          30d
        </Button>
        <Button
          className={`${range === "yearly" && "bg-blue-900"}`}
          onClick={() => handleRange("yearly")}
        >
          yearly
        </Button>
        <div className={`w-full mt-10   h-full sm:flex`}>
          <div className={`w-full `}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={apiResponse?.results}>
                {/* Light grid */}
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

                <XAxis dataKey="label" />
                <YAxis />

                <Tooltip />
                <Legend />

                {/* 🔵 Clients */}
                <Line
                  type="monotone"
                  dataKey="clients"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />

                {/* 🟢 Providers */}
                <Line
                  type="monotone"
                  dataKey="providers"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className={`w-full `}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={apiResponse?.results}>
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="clients" fill="#3b82f6" />
                <Bar dataKey="providers" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
