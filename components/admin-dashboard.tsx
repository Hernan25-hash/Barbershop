"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignOutButton } from "@/components/sign-out-button";

interface Appointment {
  id: string;
  name: string;
  service: string;
  price: number;
  date: string;
  time: string;
  phone: string;
  status: string;
  user_id: string;
  created_at: string;
}

interface Customer {
  id: string;
  full_name: string;
  phone: string;
  created_at: string;
}

interface AdminDashboardProps {
  user: any;
  profile: any;
  appointments: Appointment[];
  customers: Customer[];
}

export function AdminDashboard({
  user,
  profile,
  appointments,
  customers,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "appointments" | "customers"
  >("overview");

  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [localAppointments] = useState(appointments);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayStr = today.toISOString().split("T")[0];

  const todayAppointments = localAppointments.filter(
    (apt) => apt.date === todayStr,
  );

  const upcomingAppointments = localAppointments.filter((apt) => {
    const aptDate = new Date(apt.date);
    return aptDate >= today;
  });

  const completedAppointments = localAppointments.filter((apt) => {
    const aptDate = new Date(apt.date);
    return aptDate < today;
  });

  const totalRevenue = completedAppointments.reduce(
    (sum, apt) => sum + (Number(apt.price) || 0),
    0,
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-500/20 text-blue-500";
      case "completed":
        return "bg-green-500/20 text-green-500";
      case "cancelled":
        return "bg-red-500/20 text-red-500";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between">
          <Link href="/" className="text-2xl font-serif text-primary">
            Barber Shop Admin
          </Link>
          <SignOutButton />
        </div>
      </header>

      {/* MAIN */}
      <main className="container mx-auto px-4 py-8">
        {/* TABS */}
        <div className="flex gap-4 mb-6 border-b border-border">
          {["overview", "appointments", "customers"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-3 capitalize ${
                activeTab === tab
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-4 bg-card border rounded">
              <Calendar className="text-primary" />
              <p className="text-2xl">{todayAppointments.length}</p>
              <p>Today</p>
            </div>

            <div className="p-4 bg-card border rounded">
              <TrendingUp className="text-green-500" />
              <p className="text-2xl">{upcomingAppointments.length}</p>
              <p>Upcoming</p>
            </div>

            <div className="p-4 bg-card border rounded">
              <Users className="text-blue-500" />
              <p className="text-2xl">{customers.length}</p>
              <p>Customers</p>
            </div>

            <div className="p-4 bg-card border rounded">
              <DollarSign className="text-amber-500" />
              <p className="text-2xl">${totalRevenue}</p>
              <p>Revenue</p>
            </div>
          </div>
        )}

        {/* APPOINTMENTS */}
        {activeTab === "appointments" && (
          <div className="space-y-3 mt-6">
            {localAppointments.length === 0 ? (
              <p className="text-muted-foreground">No appointments</p>
            ) : (
              localAppointments.map((apt) => (
                <div key={apt.id} className="p-4 border rounded bg-card">
                  <p className="font-medium">{apt.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {apt.service} • {apt.date} • {apt.time}
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded ${getStatusColor(apt.status)}`}
                  >
                    {apt.status}
                  </span>
                </div>
              ))
            )}
          </div>
        )}

        {/* CUSTOMERS */}
        {activeTab === "customers" && (
          <div className="space-y-3 mt-6">
            {customers.length === 0 ? (
              <p className="text-muted-foreground">No customers</p>
            ) : (
              customers.map((c) => (
                <div key={c.id} className="p-4 border rounded bg-card">
                  <p>{c.full_name}</p>
                  <p className="text-sm text-muted-foreground">{c.phone}</p>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
