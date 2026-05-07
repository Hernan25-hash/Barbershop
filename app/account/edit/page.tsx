"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { auth, db } from "@/lib/firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { Loader2, ArrowLeft, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EditAccountPage() {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        router.push("/auth/login");
        return;
      }

      setUser(u);

      const ref = doc(db, "users", u.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        setName(data.full_name || "");
        setPhone((data.phone || "").replace("+63", ""));
      }

      setLoading(false);
    });

    return () => unsub();
  }, [router]);

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);

    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          full_name: name,
          phone: `+63${phone}`,
          updated_at: new Date().toISOString(),
        },
        { merge: true },
      );

      alert("Profile updated!");
      router.push("/account");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/auth/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-6 w-6" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER FIXED */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Back button */}
          <Link href="/account">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>
      </header>

      {/* CONTENT */}
      <div className="max-w-xl mx-auto p-6 space-y-4">
        <h1 className="text-xl font-bold">Edit Profile</h1>

        {/* Name */}
        <div>
          <label className="text-sm">Name</label>
          <input
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm">Phone</label>

          <div className="flex items-center gap-2">
            <span className="text-gray-500">+63</span>
            <input
              className="w-full border p-2 rounded"
              value={phone}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "");
                if (value.startsWith("0")) value = value.slice(1);
                setPhone(value.slice(0, 10));
              }}
              placeholder="9123456789"
            />
          </div>
        </div>

        {/* Save */}
        <Button onClick={handleSave} disabled={saving} className="w-full">
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
