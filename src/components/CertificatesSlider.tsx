import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import fda from "@/assets/certificates/fda.png";
import iso from "@/assets/certificates/iso-22000.png";
import halal from "@/assets/certificates/halal.png";
import fire from "@/assets/certificates/fire-safety.png";
import exporter from "@/assets/certificates/exporter-importer.png";
import electrical from "@/assets/certificates/electrical-inspection.png";

const certificates = [
  { src: fda, label: "FDA — Food Manufacturing Recommendation" },
  { src: iso, label: "ISO 22000:2018 — Food Safety Management" },
  { src: halal, label: "Halal Certification" },
  { src: fire, label: "Fire Safety Certification" },
  { src: exporter, label: "Exporter / Importer Registration" },
  { src: electrical, label: "Mechanical & Electrical Inspection" },
];

export function CertificatesSlider() {
  const autoplay = useRef(Autoplay({ delay: 3500, stopOnInteraction: false }));

  return (
    <section className="border-t border-border bg-muted/30 py-10">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <div className="text-center mb-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary mb-1">Certifications</p>
          <h2 className="font-display text-lg md:text-xl font-bold text-foreground">
            Trusted, certified, and compliant
          </h2>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[autoplay.current]}
          className="px-10"
        >
          <CarouselContent className="-ml-3">
            {certificates.map((c) => (
              <CarouselItem key={c.label} className="pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                <figure className="group">
                  <div className="relative rounded-md bg-gradient-to-br from-amber-100 to-amber-50 p-1.5 shadow-md ring-1 ring-amber-200 transition-transform duration-300 group-hover:-translate-y-0.5">
                    <div className="rounded-sm bg-white p-1 ring-1 ring-border">
                      <div className="aspect-[3/4] overflow-hidden rounded-sm bg-white">
                        <img
                          src={c.src}
                          alt={c.label}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <figcaption className="mt-2 text-center text-[11px] font-medium text-foreground/70 leading-tight line-clamp-2">
                    {c.label}
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
