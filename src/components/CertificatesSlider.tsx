import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useRef, type FocusEvent, type KeyboardEvent } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import fda from "@/assets/certificates/fda.png";
import iso from "@/assets/certificates/iso-22000.png";
import halal from "@/assets/certificates/halal.png";
import fire from "@/assets/certificates/fire-safety.png";
import exporter from "@/assets/certificates/exporter-importer.png";
import electrical from "@/assets/certificates/electrical-inspection.png";

const certificates = [
  { src: fda, label: "FDA ထုတ်လုပ်ခွင့် လိုင်စင်" },
  { src: iso, label: "ISO 22000:2018 အစားအသောက် ဘေးကင်းရေး စီမံခန့်ခွဲမှု" },
  { src: halal, label: "ဟလာလ် လက်မှတ်" },
  { src: fire, label: "မီးဘေးလုံခြုံရေး လက်မှတ်" },
  { src: exporter, label: "ပို့ကုန်သွင်းကုန် မှတ်ပုံတင်" },
  { src: electrical, label: "စက်ပိုင်းနှင့် လျှပ်စစ်ပိုင်း စစ်ဆေးမှု" },
];

const englishCertificates = [
  { src: fda, label: "FDA Food Manufacturing Recommendation" },
  { src: iso, label: "ISO 22000:2018 Food Safety Management" },
  { src: halal, label: "Halal Certification" },
  { src: fire, label: "Fire Safety Certification" },
  { src: exporter, label: "Exporter / Importer Registration" },
  { src: electrical, label: "Mechanical & Electrical Inspection" },
];

const certificateCopy = {
  en: {
    eyebrow: "Certifications",
    title: "Trusted, certified, and compliant",
    aria: "Certifications carousel",
  },
  my: {
    eyebrow: "အသိအမှတ်ပြု လက်မှတ်များ",
    title: "ယုံကြည်စိတ်ချရသော လုပ်ငန်းစဉ်များနှင့် အသိအမှတ်ပြု စံနှုန်းများ",
    aria: "အသိအမှတ်ပြု လက်မှတ်များ",
  },
} as const;

export function CertificatesSlider() {
  const { lang } = useLanguage();
  const copy = certificateCopy[lang];
  const localizedCertificates = lang === "en" ? englishCertificates : certificates;
  const prefersReducedMotion = useReducedMotion();
  const autoplay = useRef(Autoplay({ delay: 3500, stopOnInteraction: true }));
  const autoplayStoppedByUser = useRef(false);
  const hasFocusWithin = useRef(false);
  const isHovering = useRef(false);

  const pauseAutoplay = useCallback(() => {
    autoplay.current.stop();
  }, []);

  const resumeAutoplayIfAllowed = useCallback(() => {
    if (
      !prefersReducedMotion &&
      !autoplayStoppedByUser.current &&
      !hasFocusWithin.current &&
      !isHovering.current
    ) {
      autoplay.current.play();
    }
  }, [prefersReducedMotion]);

  const stopAutoplayAfterInteraction = useCallback(() => {
    autoplayStoppedByUser.current = true;
    autoplay.current.stop();
  }, []);

  const handleMouseEnter = useCallback(() => {
    isHovering.current = true;
    pauseAutoplay();
  }, [pauseAutoplay]);

  const handleMouseLeave = useCallback(() => {
    isHovering.current = false;
    resumeAutoplayIfAllowed();
  }, [resumeAutoplayIfAllowed]);

  const handleFocusCapture = useCallback(() => {
    hasFocusWithin.current = true;
    pauseAutoplay();
  }, [pauseAutoplay]);

  const handleBlurCapture = useCallback(
    (event: FocusEvent<HTMLDivElement>) => {
      const nextFocusedElement = event.relatedTarget as Node | null;
      if (nextFocusedElement && event.currentTarget.contains(nextFocusedElement)) {
        return;
      }

      hasFocusWithin.current = false;
      resumeAutoplayIfAllowed();
    },
    [resumeAutoplayIfAllowed],
  );

  const handleKeyDownCapture = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        stopAutoplayAfterInteraction();
      }
    },
    [stopAutoplayAfterInteraction],
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      autoplay.current.stop();
    }
  }, [prefersReducedMotion]);

  return (
    <section className="border-t border-border bg-muted/30 py-10">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <div className="text-center mb-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary mb-1">
            {copy.eyebrow}
          </p>
          <h2 className="font-display text-lg md:text-xl font-bold text-foreground">
            {copy.title}
          </h2>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: !prefersReducedMotion,
            duration: prefersReducedMotion ? 0 : 25,
          }}
          plugins={prefersReducedMotion ? [] : [autoplay.current]}
          className="px-10"
          aria-label={copy.aria}
          onBlurCapture={handleBlurCapture}
          onFocusCapture={handleFocusCapture}
          onKeyDownCapture={handleKeyDownCapture}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onPointerDownCapture={stopAutoplayAfterInteraction}
        >
          <CarouselContent className="-ml-3">
            {localizedCertificates.map((c) => (
              <CarouselItem
                key={c.label}
                className="pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <figure className="group">
                  <div className="relative rounded-md bg-gradient-to-br from-amber-100 to-amber-50 p-1.5 shadow-md ring-1 ring-amber-200 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:-translate-y-0.5">
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
          <CarouselPrevious className="left-0" onClick={stopAutoplayAfterInteraction} />
          <CarouselNext className="right-0" onClick={stopAutoplayAfterInteraction} />
        </Carousel>
      </div>
    </section>
  );
}
