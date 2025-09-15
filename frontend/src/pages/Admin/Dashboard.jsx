// frontend/src/pages/Admin/Dashboard.jsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, ShoppingBag, UserCheck, Leaf, Store } from "lucide-react";

const stats = [
  { title: "Total Farmers", value: 150, icon: Users, color: "bg-green-100 text-green-600" },
  { title: "Total Buyers", value: 300, icon: ShoppingBag, color: "bg-blue-100 text-blue-600" },
  { title: "Total Agents", value: 50, icon: UserCheck, color: "bg-yellow-100 text-yellow-600" },
  { title: "Active Listings", value: 75, icon: Store, color: "bg-pink-100 text-pink-600" },
  { title: "Total Crops", value: 25, icon: Leaf, color: "bg-purple-100 text-purple-600" },
];

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="shadow-md rounded-2xl">
            <CardContent className="flex flex-col items-center justify-center p-4">
              <div className={`p-3 rounded-full mb-3 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-semibold">{stat.value}</h2>
              <p className="text-gray-500">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
