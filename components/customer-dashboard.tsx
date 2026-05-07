"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/components/sign-out-button";

import { db } from "@/lib/firebase/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

interface Appointment {
  id: string;
  service_name: string;
  appointment_date: string;
  appointment_time: string;
  customer_phone?: string;
  service_price: string;
  status: string;
}

interface CustomerDashboardProps {
  user: any;
  profile: any;
}

export function CustomerDashboard({ user }: CustomerDashboardProps) {
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.uid) return;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setProfile(snap.data());
      }
    };

    fetchProfile();
  }, [user?.uid]);

  // 🔥 FETCH APPOINTMENTS
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user?.uid) return;

      const q = query(
        collection(db, "appointments"),
        where("user_id", "==", user.uid),
        orderBy("created_at", "desc"),
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Appointment[];

      setAppointments(data);
    };

    fetchAppointments();
  }, [user?.uid]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingAppointments = appointments.filter((apt) => {
    const aptDate = new Date(apt.appointment_date);
    return aptDate >= today && apt.status !== "cancelled";
  });

  const pastAppointments = appointments.filter((apt) => {
    const aptDate = new Date(apt.appointment_date);
    return aptDate < today || apt.status === "cancelled";
  });

  // 🔥 CANCEL
  const handleCancel = async (id: string) => {
    if (!confirm("Cancel this appointment?")) return;

    setCancellingId(id);

    try {
      await updateDoc(doc(db, "appointments", id), {
        status: "cancelled",
      });

      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === id ? { ...apt, status: "cancelled" } : apt,
        ),
      );
    } catch (err) {
      console.error(err);
    } finally {
      setCancellingId(null);
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-serif text-primary">
            Hernan's Barber Shop
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-muted-foreground hidden md:block">
              {user?.email}
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="container mx-auto px-4 py-8">
        {/* WELCOME */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif">
            Welcome back{" "}
            <span className="text-primary">
              {profile?.full_name || user?.email}
            </span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* APPOINTMENTS */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-serif mb-4">Upcoming Appointments</h2>

              {upcomingAppointments.length === 0 ? (
                <p className="text-muted-foreground">No appointments yet</p>
              ) : (
                upcomingAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="flex justify-between p-4 bg-background border border-border rounded-lg mb-3"
                  >
                    {/* LEFT */}
                    <div>
                      <p className="font-medium">{apt.service_name}</p>

                      <p className="text-sm text-muted-foreground">
                        {formatDate(apt.appointment_date)} -{" "}
                        {apt.appointment_time}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {apt.customer_phone}
                      </p>

                      {/* STATUS BADGE (FIXED HERE) */}
                      <span
                        className={`text-xs px-2 py-1 rounded inline-block mt-2 ${
                          apt.status === "confirmed"
                            ? "bg-green-500/10 text-green-500"
                            : apt.status === "cancelled"
                              ? "bg-red-500/10 text-red-500"
                              : "bg-yellow-500/10 text-yellow-500"
                        }`}
                      >
                        {apt.status}
                      </span>
                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-primary font-semibold">
                        {apt.service_price}
                      </span>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCancel(apt.id)}
                        disabled={cancellingId === apt.id}
                        className="text-red-500"
                      >
                        <X className="w-4 h-4 mr-1" />
                        {cancellingId === apt.id ? "..." : "Cancel"}
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* PROFILE */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-serif mb-4">Profile</h2>

            <div className="space-y-2 text-sm">
              <p>
                <span className="text-muted-foreground">Name:</span>{" "}
                {profile?.full_name}
              </p>
              <p>
                <span className="text-muted-foreground">Email:</span>{" "}
                {user?.email}
              </p>
              <p>
                <span className="text-muted-foreground">Phone:</span>{" "}
                {profile?.phone || "Not set"}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
