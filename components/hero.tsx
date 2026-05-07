import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-barbershop.jpg"
          alt="Premium barbershop interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            Est. 2015 • Premium Grooming
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium leading-tight mb-6 text-balance animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            Where Tradition Meets Modern Style
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto text-pretty animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            Experience precision grooming and timeless style in an atmosphere crafted for the modern gentleman.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <Button asChild size="lg" className="uppercase tracking-widest text-xs">
              <Link href="#book">
                Book Appointment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="uppercase tracking-widest text-xs">
              <Link href="#services">View Services</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  )
}
