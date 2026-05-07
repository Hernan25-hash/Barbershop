import Image from "next/image"

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "15K+", label: "Happy Clients" },
  { value: "5", label: "Expert Barbers" },
  { value: "4.9", label: "Average Rating" },
]

export function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
              <Image
                src="/images/barber-at-work.jpg"
                alt="Barber at work"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-primary rounded-lg hidden lg:block" />
          </div>

          {/* Content */}
          <div>
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
              Our Story
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-6 text-balance">
              Crafting Style Since 2015
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The Gentleman&apos;s Cut was born from a passion for the timeless art of barbering. 
                We believe that a great haircut is more than just a service—it&apos;s an experience 
                that should leave you feeling confident and refined.
              </p>
              <p>
                Our team of skilled barbers combines traditional techniques with modern trends, 
                ensuring you receive a cut that&apos;s both classic and contemporary. We take pride 
                in creating a welcoming atmosphere where every client is treated like family.
              </p>
              <p>
                From precision fades to hot towel shaves, we&apos;re dedicated to the craft and 
                committed to excellence in every detail.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 pt-10 border-t border-border">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="font-serif text-3xl lg:text-4xl font-medium text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
