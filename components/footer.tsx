import Link from "next/link";
import { Scissors, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <Scissors className="h-5 w-5 text-primary" />
            <span className="font-serif text-lg">
              Hernan&apos;s Barber Shop
            </span>
          </div>

          {/* Links */}
          <div className="flex justify-center gap-8">
            <Link
              href="#services"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Services
            </Link>
            <Link
              href="#about"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="#book"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Book
            </Link>
            <Link
              href="#contact"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Social */}
          <div className="flex justify-center md:justify-end gap-4">
            <a
              href="#"
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Follow us on Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Hernan&apos;s Barbershop. All rights
            reserved.
          </p>
        </div>
      </div>
      {/* Developer */}
      <div className="mt-10 pt-8 border-t border-border flex flex-col items-center text-center gap-3">
        <img
          src="/hernan.jpg"
          alt="Developer"
          className="w-20 h-20 rounded-full object-cover border border-border"
        />

        <div>
          <p className="text-sm text-muted-foreground">Developed by</p>
          <p className="font-medium text-primary">Hernani B Refugio Jr</p>
        </div>
      </div>
    </footer>
  );
}
