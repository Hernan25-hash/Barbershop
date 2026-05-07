"use client";

import { useEffect, useState } from "react";
import { MapPin, Phone, Clock, Mail } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    label: "Location",
    value: "Sabang Naic, Cavite, Philippines",
    subtext: "City, Naic 4110",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+63 9168447505",
    subtext: "Call or text for appointments",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon-Fri: 9AM - 7PM",
    subtext: "Sat-Sun: Closed",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hernanirefugio@gmail.com",
    subtext: "We reply within 24 hours",
  },
];

export function Contact() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="contact" className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
            Get In Touch
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-balance">
            Visit Us
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="grid sm:grid-cols-2 gap-6">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="p-6 bg-background rounded-lg border border-border"
              >
                <item.icon className="h-6 w-6 text-primary mb-4" />
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  {item.label}
                </p>
                <p className="font-medium mb-1">{item.value}</p>
                <p className="text-sm text-muted-foreground">{item.subtext}</p>
              </div>
            ))}
          </div>

          {/* Map */}
          <div className="relative aspect-square lg:aspect-auto rounded-lg overflow-hidden bg-secondary">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61860.7469071418!2d120.75594792008839!3d14.294186955918237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd874a2aafba97%3A0x251c623f50e7145e!2sNaic%2C%20Cavite%2C%20Philippines!5e0!3m2!1sen!2sus!4v1778129022832!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              title="Naic, Cavite Location"
              className="absolute inset-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
