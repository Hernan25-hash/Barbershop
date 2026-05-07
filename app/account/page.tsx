"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { auth, db } from "@/lib/firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import { Scissors, Calendar, User } from "lucide-react";

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/auth/login");
        return;
      }

      setUser(currentUser);

      try {
        // 🔥 Get user profile from Firestore
        const qProfile = query(
          collection(db, "users"),
          where("uid", "==", currentUser.uid),
        );

        const profileSnap = await getDocs(qProfile);
        const profileData = profileSnap.docs[0]?.data();

        setProfile(profileData);

        // 🔥 Get appointments
        const qAppointments = query(
          collection(db, "appointments"),
          where("user_id", "==", currentUser.uid),
        );

        const apptSnap = await getDocs(qAppointments);

        const appts = apptSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAppointments(appts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/auth/login");
  };

  if (loading) {
    return <p className="p-6">Loading account...</p>;
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Scissors className="h-6 w-6 text-primary" />
            <span className="font-serif text-xl font-semibold">
              Hernan&apos;s Barbershop
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {/* Dashboard Button */}
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>

            {/* Sign Out */}
            <Button onClick={handleLogout} variant="outline">
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold">
              Welcome back, {profile?.full_name || user.email}
            </h1>
            <p className="text-muted-foreground">
              Manage your appointments and account settings
            </p>
          </div>

          {/* Profile */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <User className="h-5 w-5 text-primary" />
                Profile
              </h2>

              <Link href="/account/edit">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </Link>
            </div>

            <div className="space-y-1">
              <p>
                <b>Name:</b> {profile?.full_name}
              </p>
              <p>
                <b>Email:</b> {user.email}
              </p>
              <p>
                <b>Phone:</b> {profile?.phone}
              </p>
            </div>
          </div>

          {/* Appointments */}
          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
              <Calendar className="h-5 w-5 text-primary" />
              My Appointments
            </h2>

            {appointments.length === 0 ? (
              <p className="text-muted-foreground">No appointments yet.</p>
            ) : (
              <div className="space-y-3">
                {appointments.map((a) => (
                  <div
                    key={a.id}
                    className="p-4 border border-border rounded-lg"
                  >
                    <p>
                      <b>Service:</b> {a.service_name}
                    </p>
                    <p>
                      <b>Date:</b> {a.appointment_date}
                    </p>
                    <p>
                      <b>Time:</b> {a.appointment_time}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Book button */}
          <div className="mt-10">
            <Button asChild>
              <Link href="/#book">Book New Appointment</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
