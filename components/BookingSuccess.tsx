"use client";

import Link from "next/link";
import { CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface Props {
  name: string;
  serviceName?: string;
  date?: string;
  time?: string | null;
  price?: string;
  resetForm: () => void;
}

export function BookingSuccess({
  name,
  serviceName,
  date,
  time,
  price,
  resetForm,
}: Props) {
  // prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      {/* MODAL CARD */}
      <div className="relative w-full max-w-2xl rounded-xl bg-card border border-border shadow-xl p-6 md:p-8 text-center animate-in fade-in zoom-in">
        {/* CLOSE BUTTON */}
        <button
          onClick={resetForm}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-muted transition"
        >
          <X className="h-5 w-5" />
        </button>

        <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />

        <h2 className="font-serif text-2xl md:text-3xl font-medium mb-2">
          Booking Confirmed!
        </h2>

        <p className="text-muted-foreground mb-6">
          Thank you for booking with us, {name}!
        </p>

        {/* DETAILS CARD */}
        <div className="bg-background border border-border rounded-lg p-5 mb-6 text-left">
          <h3 className="font-medium mb-4 text-center">Appointment Details</h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service:</span>
              <span className="font-medium">{serviceName}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span className="font-medium">{date}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Time:</span>
              <span className="font-medium">{time}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Price:</span>
              <span className="font-medium text-primary">{price}</span>
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto">
              View My Appointments
            </Button>
          </Link>

          <Button
            onClick={resetForm}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            Book Another
          </Button>
        </div>
      </div>
    </div>
  );
}
