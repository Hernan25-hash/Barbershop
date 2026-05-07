import Image from "next/image"
import { Instagram } from "lucide-react"

const barbers = [
  {
    name: "Marcus Johnson",
    role: "Master Barber & Owner",
    specialty: "Fades & Precision Cuts",
    image: "/images/barber-at-work.jpg",
    instagram: "#",
  },
  {
    name: "David Chen",
    role: "Senior Barber",
    specialty: "Classic Cuts & Hot Shaves",
    image: "/images/haircut-detail.jpg",
    instagram: "#",
  },
  {
    name: "James Wilson",
    role: "Barber",
    specialty: "Modern Styles & Beard Design",
    image: "/images/beard-trim.jpg",
    instagram: "#",
  },
]

export function Team() {
  return (
    <section id="team" className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
            The Team
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-balance">
            Meet Our Barbers
          </h2>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {barbers.map((barber, index) => (
            <div key={index} className="group">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-6">
                <Image
                  src={barber.image}
                  alt={barber.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <a
                  href={barber.instagram}
                  className="absolute bottom-4 right-4 p-2 bg-background/80 rounded-full text-foreground hover:text-primary hover:bg-background transition-colors"
                  aria-label={`Follow ${barber.name} on Instagram`}
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
              <h3 className="font-serif text-xl font-medium mb-1">{barber.name}</h3>
              <p className="text-primary text-sm uppercase tracking-wider mb-2">
                {barber.role}
              </p>
              <p className="text-muted-foreground text-sm">
                Specialty: {barber.specialty}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
