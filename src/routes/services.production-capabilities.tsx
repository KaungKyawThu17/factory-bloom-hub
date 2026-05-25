import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ServiceMediaHero } from "@/components/ServiceMediaHero";
import welcomeImg from "@/assets/optimized/welcome-feature.jpg";
import heroBg from "@/assets/pc-hero.webp";
import { CertificatesSlider } from "@/components/CertificatesSlider";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  ArrowLeft,
  ArrowRight,
  Droplets,
  Layers,
  PackageOpen,
  Thermometer,
  Sparkles,
  Package,
  Gauge,
  Clock,
  Factory,
} from "lucide-react";

export const Route = createFileRoute("/services/production-capabilities")({
  head: () => ({
    meta: [
      { title: "ထုတ်လုပ်မှု စွမ်းဆောင်ရည်များ — QUANTUM LEAP" },
      {
        name: "description",
        content:
          "PET ပုလင်းသွတ်လိုင်း၊ နှစ်မျိုးသုံး PET ပုလင်းသွတ်လိုင်း၊ Standing Pouch နှင့် UHT ထုတ်လုပ်မှုလိုင်းများ။",
      },
    ],
  }),
  component: ProductionCapabilities,
});

const lines = [
  {
    icon: Droplets,
    name: "PET ပုလင်းသွတ်လိုင်း",
    tag: "မြန်နှုန်းမြင့်",
    capacity: "၄၀၀",
    unit: "ပုလင်း / မိနစ်",
    body: "Ultraclean Hot-Fill နည်းပညာဖြင့် တစ်မိနစ်လျှင် ပုလင်း ၄၀၀ ထုတ်လုပ်နိုင်သော အရှိန်မြင့် စနစ်။",
    highlights: ["Ultraclean Hot-Fill", "အလိုအလျောက် QA", "အဆင့်မြင့်"],
    status: "active",
  },
  {
    icon: Layers,
    name: "နှစ်မျိုးသုံး PET ပုလင်းသွတ်လိုင်း",
    tag: "ပြောင်းလွယ်ပြင်လွယ်",
    capacity: "၅,၀၀၀",
    unit: "ပုလင်း / နာရီ",
    body: "PET နှင့် ဖန်ပုလင်း နှစ်မျိုးလုံးအတွက် တစ်နာရီလျှင် ပုလင်း ၅,၀၀၀ ထုတ်လုပ်နိုင်သော ပုလင်းသွတ်စနစ်။",
    highlights: ["PET + ဖန်ပုလင်း", "အမြန်ပြောင်းနိုင်မှု", "ရေရှည်တည်တံ့မှု"],
    status: "active",
  },
  {
    icon: PackageOpen,
    name: "အိတ်သွတ်လိုင်း (Standing Pouch)",
    tag: "စုံလင်သော",
    capacity: "၁၀,၀၀၀",
    unit: "အိတ် / နာရီ",
    body: "တစ်နာရီလျှင် အိတ် ၇,၀၀၀ မှ ၁၀,၀၀၀ ကြား ထုတ်လုပ်နိုင်သော လိုက်လျောညီထွေရှိသည့် ထုပ်ပိုးမှုလိုင်း။",
    highlights: ["လိုက်လျောညီထွေ ထုပ်ပိုးမှု", "ပုံစံမျိုးစုံ", "ထုတ်လုပ်မှုမြင့်"],
    status: "active",
  },
  {
    icon: Thermometer,
    name: "UHT ထုတ်လုပ်မှုလိုင်း",
    tag: "အဆင့်မြင့်",
    capacity: "၇,၀၀၀",
    unit: "pack / နာရီ",
    body: "နို့ထွက်ပစ္စည်းနှင့် အခြားအဖျော်ရည်များအတွက် အဆင့်မြင့် UHT စနစ်။",
    highlights: ["သက်တမ်းရှည်", "Aseptic process", "နို့ထွက် + အပင်အခြေခံ"],
    status: "active",
  },
  {
    icon: Sparkles,
    name: "CSD",
    tag: "မကြာမီလာမည်",
    capacity: "မကြာမီ",
    unit: "တိုးချဲ့မှုအဆင့်",
    body: "အကြီးစား အဖျော်ယမကာထုတ်လုပ်မှုအတွက် မြန်နှုန်းမြင့် ကာဗွန်နိတ်အချိုရည် စနစ်များသို့ တိုးချဲ့နေပါသည်။",
    highlights: ["ကာဗွန်နိတ်", "အရသာမျိုးစုံ", "မြန်နှုန်းမြင့်"],
    status: "soon",
  },
  {
    icon: Package,
    name: "ဘူးထုတ်လုပ်မှုလိုင်း",
    tag: "အနာဂတ်အစီအစဉ်",
    capacity: "အနာဂတ်",
    unit: "စီမံကိန်းအဆင့်",
    body: "ပုလင်းနှင့်အိတ်ထုပ်ပိုးမှုစွမ်းရည်များကို ဖြည့်စွက်ရန် အနာဂတ် အလူမီနီယမ်ဘူး ထုတ်လုပ်မှုလိုင်း။",
    highlights: ["အလူမီနီယမ်ဘူး", "ပုံစံမျိုးစုံ", "အပြည့်အစုံ"],
    status: "future",
  },
];

const stats = [
  { icon: Gauge, value: "၂၄,၀၀၀", label: "အများဆုံး ပုလင်း / နာရီ", suffix: "BPH" },
  { icon: Factory, value: "၆", label: "ထုတ်လုပ်မှုလိုင်းများ", suffix: "Lines" },
  { icon: Clock, value: "၂၄/၇", label: "လုပ်ငန်းလည်ပတ်နိုင်စွမ်း", suffix: "Uptime" },
];

const englishLines = [
  {
    icon: Droplets,
    name: "PET Bottling Line",
    tag: "High-Speed",
    capacity: "400",
    unit: "bottles / minute",
    body: "High-speed PET bottling system with Ultraclean Hot-Fill technology for premium beverage filling.",
    highlights: ["Ultraclean Hot-Fill", "Automated QA", "Premium grade"],
    status: "active",
  },
  {
    icon: Layers,
    name: "Dual PET Bottling Line",
    tag: "Flexible",
    capacity: "5,000",
    unit: "bottles / hour",
    body: "Dual-purpose bottling system supporting both PET and recyclable glass packaging formats.",
    highlights: ["PET + Glass", "Quick changeover", "Sustainable"],
    status: "active",
  },
  {
    icon: PackageOpen,
    name: "Standing Pouch Line",
    tag: "Versatile",
    capacity: "10,000",
    unit: "pouches / hour",
    body: "Flexible packaging production line capable of filling 7,000 to 10,000 pouches per hour.",
    highlights: ["Flexible packaging", "Multi-format", "High output"],
    status: "active",
  },
  {
    icon: Thermometer,
    name: "UHT Production Line",
    tag: "Advanced",
    capacity: "7,000",
    unit: "packs / hour",
    body: "Advanced UHT beverage processing engineered for dairy and plant-based beverage products.",
    highlights: ["Long shelf life", "Aseptic process", "Dairy + plant"],
    status: "active",
  },
  {
    icon: Sparkles,
    name: "CSD",
    tag: "Coming Soon",
    capacity: "Soon",
    unit: "expansion phase",
    body: "Expansion into high-speed carbonated soft drink systems for large-scale beverage production.",
    highlights: ["Carbonation", "Multiple flavors", "High-speed"],
    status: "soon",
  },
  {
    icon: Package,
    name: "Canning Line",
    tag: "Future Plan",
    capacity: "Future",
    unit: "planning phase",
    body: "Future aluminum canning line to complement our bottling and pouch capabilities for complete packaging flexibility.",
    highlights: ["Aluminum cans", "Multi-format", "Complete range"],
    status: "future",
  },
];

const englishStats = [
  { icon: Gauge, value: "24,000", label: "Max bottles per hour", suffix: "BPH" },
  { icon: Factory, value: "6", label: "Production lines", suffix: "Lines" },
  { icon: Clock, value: "24/7", label: "Operational capacity", suffix: "Uptime" },
];

const productionCopy = {
  en: {
    eyebrow: "Production Capabilities",
    title: "Production",
    highlight: "Capabilities",
    subtitle:
      "Multiple high-throughput lines built for flexibility and scale — engineered to support your brand at every volume.",
    introTitle: "Built for flexibility. Engineered for scale.",
    intro1:
      "QUANTUM LEAP operates a diverse portfolio of production lines designed to support beverage brands across formats, volumes, and product categories — from PET bottling to UHT processing.",
    intro2:
      "Our infrastructure is continuously expanding to meet the growing demand for sustainable, high-volume beverage manufacturing.",
    linesEyebrow: "Our Production Lines",
    linesTitle: "Capabilities at a glance",
    ctaTitle: "Need a production partner that scales with you?",
    ctaBody:
      "From small batch trials to full-volume export production — we've built the lines for it.",
    ctaButton: "Talk to our production team",
  },
  my: {
    eyebrow: "ထုတ်လုပ်မှု စွမ်းဆောင်ရည်များ",
    title: "ထုတ်လုပ်မှု",
    highlight: "စွမ်းဆောင်ရည်များ",
    subtitle:
      "ပြောင်းလွယ်ပြင်လွယ်နှင့် စကေးချဲ့နိုင်မှုအတွက် တည်ဆောက်ထားသော မြန်နှုန်းမြင့် ထုတ်လုပ်မှုလိုင်းများ။",
    introTitle: "ပြောင်းလွယ်ပြင်လွယ်ရှိပြီး စကေးချဲ့နိုင်ရန် တည်ဆောက်ထားပါသည်။",
    intro1:
      "Quantum Leap သည် ထုတ်ကုန်အကြံဉာဏ်မှသည် အလုံးစုံ ထုတ်လုပ်မှုအထိ အပြည့်အဝ OEM နှင့် ODM အဖျော်ယမကာ ထုတ်လုပ်မှု ဖြေရှင်းချက်များကို ပေးဆောင်ပါသည်။",
    intro2:
      "PET ပုလင်းသွတ်ခြင်းမှ UHT စနစ်အထိ အမျိုးအစား၊ ပမာဏနှင့် ထုပ်ပိုးမှုပုံစံအလိုက် အဖျော်ယမကာအမှတ်တံဆိပ်များကို ပံ့ပိုးနိုင်ရန် ထုတ်လုပ်မှုစနစ်များကို အဆက်မပြတ် တိုးချဲ့နေပါသည်။",
    linesEyebrow: "ကျွန်ုပ်တို့၏ ထုတ်လုပ်မှုလိုင်းများ",
    linesTitle: "စွမ်းဆောင်ရည်များ အကျဉ်းချုပ်",
    ctaTitle: "သင့်အမှတ်တံဆိပ်နှင့်အတူ စကေးချဲ့နိုင်သော ထုတ်လုပ်မှုမိတ်ဖက် လိုအပ်ပါသလား?",
    ctaBody:
      "စမ်းသပ်ထုတ်လုပ်မှုမှ အပြည့်အဝ ပြည်ပပို့ကုန် ထုတ်လုပ်မှုအထိ ပံ့ပိုးနိုင်သော လိုင်းများကို တည်ဆောက်ထားပါသည်။",
    ctaButton: "ထုတ်လုပ်မှုအဖွဲ့နှင့် ဆွေးနွေးရန်",
  },
} as const;

const heroSlides = [{ src: heroBg, width: 1562, height: 878 }];

function ProductionCapabilities() {
  const { lang } = useLanguage();
  const copy = productionCopy[lang];
  const localizedLines = lang === "en" ? englishLines : lines;
  const localizedStats = lang === "en" ? englishStats : stats;

  return (
    <Layout>
      <ServiceMediaHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        highlight={copy.highlight}
        subtitle={copy.subtitle}
        slides={heroSlides}
      />

      {/* STATS STRIP */}
      <section className="relative -mt-12 z-20 mx-auto max-w-6xl px-4 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
          {localizedStats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="bg-card border border-border rounded-2xl p-6 shadow-glow flex items-center gap-4"
              >
                <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-brand flex items-center justify-center">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-display text-2xl md:text-3xl font-extrabold text-foreground leading-none">
                    {s.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* INTRO */}
      <section className="py-20 md:py-24 mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
              {copy.introTitle}
            </h2>
            <div className="w-20 h-1.5 bg-accent mt-6 rounded-full" />
          </div>
          <div className="lg:col-span-7 space-y-6 text-muted-foreground text-lg leading-relaxed">
            <p>{copy.intro1}</p>
            <p>{copy.intro2}</p>
          </div>
        </div>
      </section>

      {/* LINES — interactive cards */}
      <section className="py-12 md:py-20 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-14 md:mb-16">
            <div className="text-xs uppercase tracking-widest text-accent-text font-semibold mb-3">
              {copy.linesEyebrow}
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-foreground">
              {copy.linesTitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {localizedLines.map((line, i) => {
              const Icon = line.icon;
              const isSoon = line.status === "soon";
              const isFuture = line.status === "future";
              return (
                <div
                  key={line.name}
                  className={`group relative bg-card rounded-3xl border border-border p-7 md:p-8 transition-[border-color,box-shadow,transform] duration-200 motion-safe:hover:-translate-y-1 hover:shadow-glow hover:border-primary/40 overflow-hidden ${i === 0 ? "lg:col-span-2" : ""}`}
                >
                  <div className="relative flex items-start justify-between mb-6">
                    <div
                      className={`inline-flex items-center justify-center h-14 w-14 rounded-2xl ${isSoon ? "bg-accent/10 text-accent-text" : isFuture ? "bg-muted text-muted-foreground" : "bg-gradient-brand text-white"} motion-safe:group-hover:scale-110 motion-safe:transition-transform motion-safe:duration-200`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${isSoon ? "bg-accent/15 text-accent-text" : isFuture ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"}`}
                    >
                      {line.tag}
                    </span>
                  </div>

                  <div className="relative mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-4xl md:text-5xl font-extrabold text-foreground leading-none">
                        {line.capacity}
                      </span>
                      <span className="text-xs md:text-sm text-muted-foreground font-medium">
                        {line.unit}
                      </span>
                    </div>
                  </div>

                  <h3 className="relative font-display text-xl font-bold text-foreground mb-3">
                    {line.name}
                  </h3>
                  <p className="relative text-muted-foreground text-sm leading-relaxed mb-5">
                    {line.body}
                  </p>

                  <div className="relative flex flex-wrap gap-2 pt-4 border-t border-border">
                    {line.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-xs text-foreground/80 bg-muted px-2.5 py-1 rounded-md"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gradient-hero rounded-3xl overflow-hidden text-white shadow-glow">
            <div className="absolute inset-0 bg-gradient-glow opacity-60" />
            <div className="relative z-10 min-h-[380px] md:min-h-[440px] flex items-center">
              <img
                src={welcomeImg}
                alt="QUANTUM LEAP team welcome"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
                width={1280}
                height={720}
                sizes="(min-width: 1280px) 1024px, calc(100vw - 2rem)"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
              <div className="absolute inset-0 bg-gradient-glow opacity-60" />
              <div className="relative w-full p-10 md:p-16 text-center md:text-left max-w-2xl">
                <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  {copy.ctaTitle}
                </h3>
                <p className="text-white/80 mb-10 text-lg max-w-xl mx-auto">{copy.ctaBody}</p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 font-bold text-lg transition-colors duration-200 group"
                >
                  {copy.ctaButton}
                  <ArrowRight className="h-5 w-5 motion-safe:group-hover:translate-x-1 motion-safe:transition-transform motion-safe:duration-200" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CertificatesSlider />
    </Layout>
  );
}
