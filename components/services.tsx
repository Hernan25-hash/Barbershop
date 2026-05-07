import Image from "next/image";
import { Scissors, SprayCan } from "lucide-react";

const services = [
  {
    title: "Classic Haircut",
    description:
      "Precision cut tailored to your style, includes consultation, shampoo, and styling.",
    price: "35",
    duration: "45 min",
  },
  {
    title: "Beard Trim & Shape",
    description:
      "Expert beard sculpting with hot towel treatment and conditioning oil.",
    price: "25",
    duration: "30 min",
  },
  {
    title: "The Full Service",
    description:
      "Complete grooming experience: haircut, beard trim, hot towel shave, and facial treatment.",
    price: "75",
    duration: "90 min",
  },
  {
    title: "Hot Towel Shave",
    description:
      "Traditional straight razor shave with warm lather and soothing aftercare.",
    price: "$40",
    duration: "45 min",
  },
  {
    title: "Kids Cut",
    description:
      "Gentle, patient service for our younger clients. Ages 12 and under.",
    price: "$25",
    duration: "30 min",
  },
  {
    title: "Grey Blending",
    description:
      "Subtle color treatment to reduce grey visibility while maintaining a natural look.",
    price: "$45",
    duration: "45 min",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
            What We Offer
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-balance">
            Our Services
          </h2>
        </div>
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            // SAFE PRICE CLEANING
            const cleanPrice = Number(
              service.price?.toString().replace(/[^0-9.]/g, ""),
            );

            return (
              <div
                key={index}
                className="group bg-card border border-border rounded-lg p-6 lg:p-8 hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-serif text-xl font-medium group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  {/* FIXED PRICE DISPLAY */}
                  <span className="text-primary font-semibold text-lg">
                    ₱{cleanPrice}
                  </span>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
                  <span className="w-1 h-1 rounded-full bg-primary" />
                  {service.duration}
                </div>
              </div>
            );
          })}
        </div>
        {/* Feature Images */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="/images/haircut-detail.jpg"
              alt="Precision haircut"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-3 text-primary mb-2">
                <Scissors className="h-5 w-5" />
                <span className="uppercase tracking-widest text-xs">
                  Precision Cuts
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Every cut is crafted with attention to detail and your unique
                style.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="/images/beard-trim.jpg"
              alt="Beard grooming"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-3 text-primary mb-2">
                <SprayCan className="h-5 w-5" />
                <span className="uppercase tracking-widest text-xs">
                  Beard Care
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Expert beard sculpting and grooming for the distinguished
                gentleman.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
