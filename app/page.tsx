import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Gallery } from "@/components/gallery"
import { Team } from "@/components/team"
import { Booking } from "@/components/booking"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Services />
      <About />
      <Gallery />
      <Team />
      <Booking />
      <Contact />
      <Footer />
    </main>
  )
}
