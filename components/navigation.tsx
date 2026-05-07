"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { Menu, X, Scissors, User, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

import { auth } from "@/lib/firebase/firebase";

import {
  onAuthStateChanged,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Gallery" },
  { href: "#team", label: "Barbers" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Scissors className="h-6 w-6 text-primary" />

            <span className="font-serif text-lg lg:text-xl font-semibold tracking-wide">
              Hernan&apos;s Barbershop
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center gap-4">
            {!loading && (
              <>
                {user ? (
                  <>
                    <Button asChild variant="ghost" size="sm" className="gap-2">
                      <Link href="/account">
                        <User className="h-4 w-4" />
                        {user.displayName || "Account"}
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLogout}
                      className="gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="ghost" size="sm">
                      <Link href="/auth/login">Sign In</Link>
                    </Button>

                    <Button asChild variant="outline" size="sm">
                      <Link href="/auth/sign-up">Sign Up</Link>
                    </Button>
                  </>
                )}
              </>
            )}

            <Button asChild className="uppercase tracking-widest text-xs">
              <Link href="#book">Book Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-border py-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary py-2"
                >
                  {link.label}
                </Link>
              ))}

              <div className="border-t border-border pt-4 flex flex-col gap-3">
                {!loading && (
                  <>
                    {user ? (
                      <>
                        <Button
                          asChild
                          variant="outline"
                          className="w-full gap-2"
                        >
                          <Link
                            href="/account"
                            onClick={() => setIsOpen(false)}
                          >
                            <User className="h-4 w-4" />
                            {user.displayName || "My Account"}
                          </Link>
                        </Button>

                        <Button
                          variant="outline"
                          className="w-full gap-2"
                          onClick={handleLogout}
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </Button>
                      </>
                    ) : (
                      <div className="flex gap-3">
                        <Button asChild variant="outline" className="flex-1">
                          <Link
                            href="/auth/login"
                            onClick={() => setIsOpen(false)}
                          >
                            Sign In
                          </Link>
                        </Button>

                        <Button asChild className="flex-1">
                          <Link
                            href="/auth/sign-up"
                            onClick={() => setIsOpen(false)}
                          >
                            Sign Up
                          </Link>
                        </Button>
                      </div>
                    )}
                  </>
                )}

                <Button asChild className="uppercase tracking-widest text-xs">
                  <Link href="#book" onClick={() => setIsOpen(false)}>
                    Book Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
