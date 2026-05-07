"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";

import { db } from "@/lib/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

interface CancelAppointmentButtonProps {
  appointmentId: string;
}

export function CancelAppointmentButton({
  appointmentId,
}: CancelAppointmentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleCancel = async () => {
    setIsLoading(true);

    try {
      // FIREBASE UPDATE (replace supabase update)
      const ref = doc(db, "MyBarberShop", appointmentId);

      await updateDoc(ref, {
        status: "cancelled",
      });

      router.refresh();
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
    } finally {
      setIsLoading(false);
      setShowConfirm(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="destructive"
          size="sm"
          onClick={handleCancel}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Yes, Cancel"
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowConfirm(false)}
          disabled={isLoading}
        >
          No
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setShowConfirm(true)}
      className="text-muted-foreground hover:text-destructive"
    >
      <X className="h-4 w-4 mr-1" />
      Cancel
    </Button>
  );
}
