"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import {
  Calendar,
  User,
  CheckCircle2,
  Phone,
  Loader2,
  AlertCircle,
  LogIn,
} from "lucide-react";

import { app } from "@/lib/firebase/firebase";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BookingSuccess } from "@/components/BookingSuccess";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
const services = [
  { id: "haircut", name: "Classic Haircut", price: "₱35", duration: "45 min" },
  { id: "beard", name: "Beard Trim & Shape", price: "₱25", duration: "30 min" },
  { id: "full", name: "The Full Service", price: "₱75", duration: "90 min" },
  { id: "shave", name: "Hot Towel Shave", price: "₱40", duration: "45 min" },
];

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
];

export function Booking() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const router = useRouter();
  const db = getFirestore(app);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (!firebaseUser) {
        setIsLoading(false);
        return;
      }

      if (firebaseUser.displayName) {
        setName(firebaseUser.displayName);
      }

      if (!firebaseUser?.uid) {
        setIsLoading(false);
        return;
      }

      const q = query(
        collection(db, "users"),
        where("uid", "==", firebaseUser.uid),
      );

      const snap = await getDocs(q);

      if (!snap.empty) {
        const data = snap.docs[0].data();
        setPhone((data.phone || "").replace("+63", ""));
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!selectedDate) {
        setBookedSlots([]);
        return;
      }

      try {
        const q = query(
          collection(db, "appointments"),
          where("appointment_date", "==", selectedDate),
          where("status", "==", "confirmed"),
        );

        const querySnapshot = await getDocs(q);

        const slots = querySnapshot.docs.map(
          (doc) => doc.data().appointment_time,
        );

        setBookedSlots(slots);
      } catch (error) {
        console.error("Error fetching booked slots:", error);
      }
    };

    fetchBookedSlots();
  }, [selectedDate]); // ✅ ONLY this

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    setError(null);

    const service = services.find((s) => s.id === selectedService);
    if (!service) {
      setError("Please select a service");
      setIsSubmitting(false);
      return;
    }

    try {
      await addDoc(collection(db, "appointments"), {
        service: selectedService,
        service_name: service.name,
        service_price: service.price,
        appointment_date: selectedDate,
        appointment_time: selectedTime,
        customer_name: name,
        customer_phone: phone,
        user_id: user.uid,
        status: "confirmed",
        created_at: new Date(),
      });

      setSubmitted(true);
    } catch (err) {
      console.error("Booking error:", err);
      setError("Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setSelectedService(null);
    setSelectedDate("");
    setSelectedTime(null);
    setPhone("");
    setError(null);
  };

  const selectedServiceDetails = services.find((s) => s.id === selectedService);

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  if (isLoading) {
    return (
      <section id="book" className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
            <p className="text-muted-foreground mt-4">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  if (submitted) {
    return (
      <BookingSuccess
        name={name}
        serviceName={selectedServiceDetails?.name}
        date={new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        time={selectedTime}
        price={selectedServiceDetails?.price}
        resetForm={resetForm}
      />
    );
  }

  return (
    <section id="book" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
            Reserve Your Spot
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-balance">
            Book an Appointment
          </h2>
          <p className="text-muted-foreground mt-4">
            {user && (
              <p className="text-muted-foreground mt-4">
                Signed in as {user.email}
              </p>
            )}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          {error && (
            <div className="mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3 text-destructive">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Step 1: Select Service */}
          <div className="mb-12">
            <h3 className="flex items-center gap-3 text-lg font-medium mb-6">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm">
                1
              </span>
              Select a Service
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {services.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setSelectedService(service.id)}
                  className={`text-left p-4 rounded-lg border transition-all ${
                    selectedService === service.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium">{service.name}</span>
                    <span className="text-primary font-semibold">
                      {service.price}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {service.duration}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Select Date */}
          <div className="mb-12">
            <h3 className="flex items-center gap-3 text-lg font-medium mb-6">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm">
                2
              </span>
              Choose a Date
            </h3>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedTime(null); // Reset time when date changes
                }}
                min={today}
                className="w-full pl-12 pr-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          {/* Step 3: Select Time */}
          <div className="mb-12">
            <h3 className="flex items-center gap-3 text-lg font-medium mb-6">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm">
                3
              </span>
              Pick a Time
              {selectedDate && bookedSlots.length > 0 && (
                <span className="text-xs text-muted-foreground font-normal">
                  (Unavailable times are grayed out)
                </span>
              )}
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {timeSlots.map((time) => {
                const isBooked = bookedSlots.includes(time);
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => !isBooked && setSelectedTime(time)}
                    disabled={isBooked}
                    className={`py-2 px-3 rounded-lg text-sm border transition-all ${
                      isBooked
                        ? "border-border bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                        : selectedTime === time
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary/50"
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Your Details */}
          <div className="mb-12">
            <h3 className="flex items-center gap-3 text-lg font-medium mb-6">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm">
                4
              </span>
              Your Details
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />

                <div className="flex items-center w-full pl-12 pr-4 py-3 bg-input border border-border rounded-lg focus-within:ring-2 focus-within:ring-primary">
                  {/* country code fixed */}
                  <span className="text-muted-foreground mr-2">+63</span>

                  <input
                    type="tel"
                    placeholder="9123456789"
                    value={phone}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, "");

                      // remove leading 0 if user types 09...
                      if (value.startsWith("0")) {
                        value = value.slice(1);
                      }

                      // limit to 10 digits (PH mobile)
                      setPhone(value.slice(0, 10));
                    }}
                    className="flex-1 bg-transparent outline-none"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            className="w-full uppercase tracking-widest text-xs"
            disabled={
              isSubmitting ||
              !selectedService ||
              !selectedDate ||
              !selectedTime ||
              !name ||
              !phone
            }
            onClick={(e) => {
              if (!user) {
                e.preventDefault();
                router.push("/auth/login");
                return;
              }
            }}
          >
            {!user ? (
              <span className="flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Sign in required
              </span>
            ) : isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Booking...
              </>
            ) : (
              "Confirm Booking"
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}
