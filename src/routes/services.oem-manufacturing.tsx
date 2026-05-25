import { useRef, type KeyboardEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import welcomeImg from "@/assets/optimized/welcome-feature.jpg";
import { CertificatesSlider } from "@/components/CertificatesSlider";
import { useLanguage } from "@/i18n/LanguageContext";
import { ArrowLeft, ArrowRight, Package, Container, Clock } from "lucide-react";
import step01 from "@/assets/optimized/oem-step-01-consultation-card.jpg";
import step02 from "@/assets/optimized/oem-step-02-preform-card.jpg";
import step03 from "@/assets/optimized/oem-step-03-blowing-card.jpg";
import step04 from "@/assets/optimized/oem-step-04-water-card.jpg";
import step05 from "@/assets/optimized/oem-step-05-rawmaterial-card.jpg";
import step06 from "@/assets/optimized/oem-step-06-mixing-card.jpg";
import step07 from "@/assets/optimized/oem-step-07-uht-card.jpg";
import step08 from "@/assets/optimized/oem-step-08-filling-card.jpg";
import step09 from "@/assets/optimized/oem-step-09-labelling-card.jpg";
import step10 from "@/assets/optimized/oem-step-10-quality-card.jpg";
import step11 from "@/assets/optimized/oem-step-11-storage-card.jpg";

export const Route = createFileRoute("/services/oem-manufacturing")({
  validateSearch: (search): { tab: ManufacturingTab } => ({
    tab: parseManufacturingTab(search.tab) ?? "pet",
  }),
  head: () => ({
    meta: [
      { title: "OEM နှင့် ODM ထုတ်လုပ်မှု — QUANTUM LEAP" },
      {
        name: "description",
        content:
          "အသင့်သောက် အဖျော်ယမကာများအတွက် ယုံကြည်စိတ်ချရသော OEM နှင့် ODM ထုတ်လုပ်မှု မိတ်ဖက်။",
      },
    ],
  }),
  component: OemManufacturing,
});

type ImageAsset = {
  src: string;
  width: number;
  height: number;
};

type ManufacturingTab = "pet" | "can";

function parseManufacturingTab(value: unknown): ManufacturingTab | undefined {
  return value === "pet" || value === "can" ? value : undefined;
}

const tabOrder: ManufacturingTab[] = ["pet", "can"];
const tabIds: Record<ManufacturingTab, string> = {
  pet: "pet-manufacturing-tab",
  can: "can-manufacturing-tab",
};
const panelIds: Record<ManufacturingTab, string> = {
  pet: "pet-manufacturing-panel",
  can: "can-manufacturing-panel",
};

const processImageSizes =
  "(min-width: 1280px) 560px, (min-width: 768px) calc((100vw - 10rem) / 2), calc(100vw - 2rem)";

const steps: { title: string; body: string; image?: ImageAsset }[] = [
  {
    title: "ဖောက်သည်လိုအပ်ချက် တိုင်ပင်ဆွေးနွေးခြင်း",
    image: { src: step01, width: 960, height: 540 },
    body: "ဖောက်သည်၏ ထုတ်ကုန်သဘောတရား၊ ပစ်မှတ်စျေးကွက်၊ ထုပ်ပိုးမှုဦးစားပေးမှုနှင့် ထုတ်လုပ်မှုလိုအပ်ချက်များကို နားလည်ခြင်း။",
  },
  {
    title: "ထုတ်ကုန်သဘောတရား ဖွံ့ဖြိုးတိုးတက်ရေး",
    image: { src: step02, width: 960, height: 540 },
    body: "အမှတ်တံဆိပ်ရပ်တည်ချက်နှင့် စျေးကွက်ခေတ်ရေစီးကြောင်းနှင့်အညီ စိတ်ကြိုက်အဖျော်ယမကာသဘောတရားများကို တီထွင်ခြင်း။",
  },
  {
    title: "ထုတ်ကုန်ဖွံ့ဖြိုးတိုးတက်ရေး",
    image: { src: step03, width: 960, height: 540 },
    body: "ထုတ်ကုန်တသမတ်တည်းရှိမှုနှင့် ထုတ်လုပ်မှုဖြစ်နိုင်ခြေကို သေချာစေရန် အဖျော်ယမကာဖော်မြူလာများ၊ ထုပ်ပိုးမှုဖြေရှင်းချက်များနှင့် အရည်အသွေးအကဲဖြတ်ခြင်းများ ဖန်တီးခြင်း။",
  },
  {
    title: "နမူနာတီထွင်ခြင်းနှင့် အတည်ပြုခြင်း",
    image: { src: step04, width: 960, height: 539 },
    body: "ထုတ်လုပ်မှုမပြုလုပ်မီ ဖောက်သည်စမ်းသပ်မှုအတွက် ထုတ်ကုန်နမူနာများကို ပြင်ဆင်ခြင်းနှင့် နောက်ဆုံးအတည်ပြုခြင်း။",
  },
  {
    title: "ကုန်ကျစရိတ်နှင့် ဖြစ်နိုင်ခြေ ပြန်လည်သုံးသပ်ခြင်း",
    image: { src: step05, width: 960, height: 540 },
    body: "ထုတ်လုပ်မှုစွမ်းရည်၊ ပစ္စည်းရင်းမြစ်၊ MOQ နှင့် ထုတ်လုပ်မှုကုန်ကျစရိတ်ဖွဲ့စည်းပုံကို အကဲဖြတ်ခြင်း။",
  },
  {
    title: "စည်းမျဉ်းစည်းကမ်းနှင့် လိုက်နာမှု ပြန်လည်သုံးသပ်ခြင်း",
    image: { src: step06, width: 960, height: 540 },
    body: "အစားအစာဘေးကင်းရေးစံနှုန်းများ၊ အညွှန်းကပ်ခြင်းလိုအပ်ချက်များနှင့် ထုတ်ကုန်မှတ်ပုံတင်ခြင်းလိုက်နာမှုကို ပြန်လည်သုံးသပ်ခြင်း။",
  },
  {
    title: "စမ်းသပ်ထုတ်လုပ်မှု",
    image: { src: step07, width: 960, height: 540 },
    body: "ထုတ်ကုန်အရည်အသွေး၊ လုပ်ငန်းစဉ်တည်ငြိမ်မှုနှင့် ထုပ်ပိုးမှုလိုက်ဖက်ညီမှုကို အတည်ပြုရန် စမ်းသပ်ထုတ်လုပ်မှုကို ပြုလုပ်ခြင်း။",
  },
  {
    title: "OEM သဘောတူညီချက် အတည်ပြုခြင်း",
    image: { src: step08, width: 960, height: 539 },
    body: "ဈေးနှုန်း၊ ထုတ်လုပ်မှုအချိန်ဇယား၊ လျှို့ဝှက်ချက်၊ အရည်အသွေးစံနှုန်းများနှင့် ပို့ဆောင်ရေးစည်းကမ်းချက်များကို အပြီးသတ်ခြင်း။",
  },
  {
    title: "အစုလိုက်အပြုံလိုက်ထုတ်လုပ်မှု",
    image: { src: step09, width: 960, height: 540 },
    body: "အလိုအလျောက်ထုတ်လုပ်မှု၊ ဖြည့်သွင်းခြင်းနှင့် ထုပ်ပိုးခြင်းစနစ်များမှတစ်ဆင့် အဖျော်ယမကာများ ထုတ်လုပ်ခြင်း။",
  },
  {
    title: "အရည်အသွေးစစ်ဆေးခြင်း",
    image: { src: step10, width: 960, height: 540 },
    body: "ထုတ်ကုန်ဘေးကင်းရေးနှင့် တသမတ်တည်းရှိစေရန် တင်းကျပ်သော အရည်အသွေးထိန်းချုပ်မှုနှင့် ဓာတ်ခွဲခန်းစမ်းသပ်မှုများကို လုပ်ဆောင်ခြင်း။",
  },
  {
    title: "ဂိုဒေါင်နှင့် ပို့ဆောင်ခြင်း",
    image: { src: step11, width: 960, height: 540 },
    body: "ထုတ်ကုန်သိုလှောင်မှု၊ ထောက်ပံ့ပို့ဆောင်ရေးညှိနှိုင်းမှုနှင့် နောက်ဆုံးထုတ်ကုန်ပို့ဆောင်မှုကို စီမံခန့်ခွဲခြင်း။",
  },
];

const englishSteps: typeof steps = [
  {
    title: "Customer Requirement Consultation",
    image: { src: step01, width: 960, height: 540 },
    body: "Understanding the customer's product concept, target market, packaging preference, and production requirements.",
  },
  {
    title: "Product Concept Development",
    image: { src: step02, width: 960, height: 540 },
    body: "Developing customized beverage concepts aligned with brand positioning and market trends.",
  },
  {
    title: "Product Development",
    image: { src: step03, width: 960, height: 540 },
    body: "Creating beverage formulations, packaging solutions, and quality evaluations to ensure product consistency and manufacturing feasibility.",
  },
  {
    title: "Sample Development & Approval",
    image: { src: step04, width: 960, height: 539 },
    body: "Preparing product samples for customer testing and final approval before production.",
  },
  {
    title: "Costing & Feasibility Review",
    image: { src: step05, width: 960, height: 540 },
    body: "Evaluating production capability, material sourcing, MOQ, and manufacturing cost structure.",
  },
  {
    title: "Regulatory & Compliance Review",
    image: { src: step06, width: 960, height: 540 },
    body: "Reviewing food safety standards, labeling requirements, and product registration compliance.",
  },
  {
    title: "Pilot Production",
    image: { src: step07, width: 960, height: 540 },
    body: "Conducting trial production to verify product quality, process stability, and packaging compatibility.",
  },
  {
    title: "OEM Agreement Confirmation",
    image: { src: step08, width: 960, height: 539 },
    body: "Finalizing pricing, production schedule, confidentiality, quality standards, and delivery terms.",
  },
  {
    title: "Mass Production",
    image: { src: step09, width: 960, height: 540 },
    body: "Producing beverages through automated manufacturing, filling, and packaging systems.",
  },
  {
    title: "Quality Inspection",
    image: { src: step10, width: 960, height: 540 },
    body: "Performing strict quality control and laboratory testing to ensure product safety and consistency.",
  },
  {
    title: "Warehousing & Delivery",
    image: { src: step11, width: 960, height: 540 },
    body: "Managing product storage, logistics coordination, and final product delivery.",
  },
];

const oemCopy = {
  en: {
    heroTitle: "OEM and ODM",
    heroHighlight: "Manufacturing",
    heroSubtitle:
      "From concept to mass production, we provide the infrastructure and expertise to scale your beverage brand globally.",
    introTitle: "Your Trusted OEM and ODM Partner for Ready to Drink Beverages",
    introParagraphs: [
      "QUANTUM LEAP provides integrated PET bottle manufacturing and beverage packaging solutions designed to support OEM and private label beverage brands. Our production systems support customized PET bottle development, high-speed bottling operations, labeling, and secondary packaging solutions to meet diverse market and product requirements.",
      "From bottle design and beverage formulation to filling and final packaging, QUANTUM LEAP delivers scalable and efficient manufacturing services supported by advanced production technology and quality-focused operations.",
    ],
    petTab: "PET Manufacturing",
    canTab: "Can Manufacturing",
    soonBadge: "Soon",
    petEyebrow: "PET Manufacturing",
    petTitle: "Our 11-Step Process",
    petDescription:
      "A streamlined path from vision to shelf, engineered for quality at every stage.",
    phaseLabel: "Phase",
    canBadge: "Coming Soon",
    canTitle: "Can Manufacturing",
    canParagraphs: [
      "QUANTUM LEAP is currently expanding its manufacturing capabilities with a future can production line designed to support both carbonated and non-carbonated beverages.",
      "The upcoming can manufacturing facility will focus on high-speed production efficiency, product quality consistency, and sustainable aluminum packaging solutions for evolving beverage market demands.",
    ],
    canButton: "Register your interest",
    ctaTitle: "Ready to discuss your project?",
    ctaBody: "Our team will guide you from initial enquiry to scaled production.",
    ctaButton: "Contact our team",
  },
  my: {
    heroTitle: "OEM နှင့် ODM",
    heroHighlight: "ထုတ်လုပ်မှု",
    heroSubtitle:
      "ထုတ်ကုန်သဘောတရားမှ အစုလိုက်အပြုံလိုက်ထုတ်လုပ်မှုအထိ သင့်အဖျော်ယမကာအမှတ်တံဆိပ်ကို စကေးချဲ့နိုင်ရန် လိုအပ်သော အခြေခံအဆောက်အအုံနှင့် ကျွမ်းကျင်မှုများကို ပံ့ပိုးပေးပါသည်။",
    introTitle: "အသင့်သောက် အဖျော်ယမကာများအတွက် သင့်ယုံကြည်စိတ်ချရသော OEM နှင့် ODM မိတ်ဖက်",
    introParagraphs: [
      "Quantum Leap သည် OEM နှင့် ပုဂ္ဂလိကတံဆိပ်ပါ အဖျော်ယမကာအမှတ်တံဆိပ်များကို ပံ့ပိုးရန် ဒီဇိုင်းထုတ်ထားသော ပေါင်းစပ် PET ပုလင်းထုတ်လုပ်ခြင်းနှင့် အဖျော်ယမကာထုပ်ပိုးမှုဖြေရှင်းချက်များကို ပံ့ပိုးပေးပါသည်။",
      "ကျွန်ုပ်တို့၏ ထုတ်လုပ်မှုစနစ်များသည် စိတ်ကြိုက် PET ပုလင်းဖွံ့ဖြိုးတိုးတက်မှု၊ မြန်နှုန်းမြင့်ပုလင်းသွင်းခြင်းလုပ်ငန်းများ၊ တံဆိပ်ကပ်ခြင်းနှင့် ဒုတိယထုပ်ပိုးမှု ဖြေရှင်းချက်များကို ကွဲပြားသောစျေးကွက်နှင့် ထုတ်ကုန်လိုအပ်ချက်များနှင့် ကိုက်ညီစေရန် ပံ့ပိုးပေးပါသည်။",
    ],
    petTab: "PET ထုတ်လုပ်ခြင်း",
    canTab: "ဘူးထုတ်လုပ်ခြင်း",
    soonBadge: "မကြာမီ",
    petEyebrow: "PET ထုတ်လုပ်ခြင်း",
    petTitle: "PET ထုတ်လုပ်မှုလုပ်ငန်းစဉ်",
    petDescription:
      "အဆင့်တိုင်းတွင် အရည်အသွေးကို အလေးထားသော သဘောတရားမှ ထုတ်ကုန်ပို့ဆောင်မှုအထိ လုပ်ငန်းစဉ်။",
    phaseLabel: "အဆင့်",
    canBadge: "မကြာမီလာမည်",
    canTitle: "CAN ထုတ်လုပ်ခြင်း",
    canParagraphs: [
      "Quantum Leap သည် ကာဗွန်နိတ်နှင့် ကာဗွန်နိတ်မဟုတ်သော အဖျော်ယမကာနှစ်မျိုးလုံးကို ပံ့ပိုးရန် ဒီဇိုင်းထုတ်ထားသော အနာဂတ်ဘူးထုတ်လုပ်မှုလိုင်းဖြင့် ၎င်း၏ ထုတ်လုပ်မှုစွမ်းရည်များကို လက်ရှိတွင် တိုးချဲ့နေသည်။",
      "လာမည့် ဘူးထုတ်လုပ်ရေးစက်ရုံသည် ပြောင်းလဲနေသော အဖျော်ယမကာဈေးကွက် လိုအပ်ချက်များအတွက် မြန်နှုန်းမြင့် ထုတ်လုပ်မှုစွမ်းဆောင်ရည်၊ ထုတ်ကုန်အရည်အသွေး တသမတ်တည်းရှိမှုနှင့် ရေရှည်တည်တံ့သော အလူမီနီယမ်ထုပ်ပိုးမှု ဖြေရှင်းချက်များကို အာရုံစိုက်မည်ဖြစ်သည်။",
    ],
    canButton: "စိတ်ဝင်စားမှု မှတ်ပုံတင်ရန်",
    ctaTitle: "သင့်စီမံကိန်းကို ဆွေးနွေးရန် အသင့်ဖြစ်ပါသလား?",
    ctaBody: "စတင်စုံစမ်းမှုမှ စကေးချဲ့ထုတ်လုပ်မှုအထိ ကျွန်ုပ်တို့အဖွဲ့က လမ်းညွှန်ပေးပါမည်။",
    ctaButton: "ကျွန်ုပ်တို့အဖွဲ့ကို ဆက်သွယ်ရန်",
  },
} as const;

function OemManufacturing() {
  const { tab } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { lang } = useLanguage();
  const copy = oemCopy[lang];
  const localizedSteps = lang === "en" ? englishSteps : steps;
  const tabRefs = useRef<Record<ManufacturingTab, HTMLButtonElement | null>>({
    pet: null,
    can: null,
  });

  const selectTab = (nextTab: ManufacturingTab) => {
    navigate({
      search: (prev) => ({ ...prev, tab: nextTab }),
      resetScroll: false,
    });
    tabRefs.current[nextTab]?.focus();
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const currentIndex = tabOrder.indexOf(tab);
    let nextTab: ManufacturingTab | null = null;

    if (event.key === "ArrowRight") {
      nextTab = tabOrder[(currentIndex + 1) % tabOrder.length];
    } else if (event.key === "ArrowLeft") {
      nextTab = tabOrder[(currentIndex - 1 + tabOrder.length) % tabOrder.length];
    } else if (event.key === "Home") {
      nextTab = tabOrder[0];
    } else if (event.key === "End") {
      nextTab = tabOrder[tabOrder.length - 1];
    }

    if (!nextTab) return;

    event.preventDefault();
    selectTab(nextTab);
  };

  return (
    <Layout>
      {/* HERO */}
      <section className="relative min-h-[480px] flex items-center bg-gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full blur-3xl bg-accent/40" />
          <div className="absolute right-1/4 bottom-0 w-64 h-64 rounded-full blur-3xl bg-primary/40" />
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-[-12deg] translate-x-20" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8 py-20 w-full">
          <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-[1.05] max-w-3xl">
            {copy.heroTitle}{" "}
            <span className="bg-gradient-to-r from-accent to-cyan-200 bg-clip-text text-transparent">
              {copy.heroHighlight}
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
            {copy.heroSubtitle}
          </p>
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
            {copy.introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* MANUFACTURING TABS */}
      <section className="py-20 md:py-28 bg-muted/40 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Tab switcher */}
          <div className="flex justify-center mb-12 md:mb-16">
            <div
              role="tablist"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1.5 shadow-sm"
            >
              <button
                id={tabIds.pet}
                ref={(node) => {
                  tabRefs.current.pet = node;
                }}
                type="button"
                role="tab"
                aria-selected={tab === "pet"}
                aria-controls={panelIds.pet}
                tabIndex={tab === "pet" ? 0 : -1}
                onClick={() => selectTab("pet")}
                onKeyDown={handleTabKeyDown}
                className={`inline-flex items-center gap-2 rounded-full px-5 md:px-7 py-2.5 text-sm md:text-base font-semibold transition-[background-color,color,box-shadow] duration-200 ${
                  tab === "pet"
                    ? "bg-gradient-brand text-white shadow-glow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Package className="h-4 w-4" aria-hidden="true" />
                {copy.petTab}
              </button>
              <button
                id={tabIds.can}
                ref={(node) => {
                  tabRefs.current.can = node;
                }}
                type="button"
                role="tab"
                aria-selected={tab === "can"}
                aria-controls={panelIds.can}
                tabIndex={tab === "can" ? 0 : -1}
                onClick={() => selectTab("can")}
                onKeyDown={handleTabKeyDown}
                className={`inline-flex items-center gap-2 rounded-full px-5 md:px-7 py-2.5 text-sm md:text-base font-semibold transition-[background-color,color,box-shadow] duration-200 ${
                  tab === "can"
                    ? "bg-gradient-brand text-white shadow-glow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Container className="h-4 w-4" aria-hidden="true" />
                {copy.canTab}
                <span
                  className={`ml-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tab === "can" ? "bg-white/20 text-white" : "bg-accent/15 text-accent-text"}`}
                >
                  {copy.soonBadge}
                </span>
              </button>
            </div>
          </div>

          <div
            id={panelIds.pet}
            role="tabpanel"
            tabIndex={0}
            aria-labelledby={tabIds.pet}
            hidden={tab !== "pet"}
          >
            <div className="text-center mb-16 md:mb-20">
              <div className="text-xs uppercase tracking-widest text-accent-text font-semibold mb-3">
                {copy.petEyebrow}
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-extrabold text-foreground">
                {copy.petTitle}
              </h2>
              <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
                {copy.petDescription}
              </p>
            </div>

            <div className="relative">
              {/* S-curve SVG path (desktop) */}
              <svg
                className="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 1000 2600"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="oemPath" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
                <path
                  d="M 500 40
                   C 800 140, 800 340, 500 440
                   C 200 540, 200 740, 500 840
                   C 800 940, 800 1140, 500 1240
                   C 200 1340, 200 1540, 500 1640
                   C 800 1740, 800 1940, 500 2040
                   C 200 2140, 200 2340, 500 2440
                   L 500 2560"
                  fill="none"
                  stroke="url(#oemPath)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="6 8"
                />
              </svg>

              <div className="space-y-10 md:space-y-16 relative">
                {localizedSteps.map((step, i) => {
                  const isLeft = i % 2 === 0;
                  const isAccent = i === 0 || i === localizedSteps.length - 1;
                  return (
                    <div
                      key={step.title}
                      className={`relative md:flex items-center ${isLeft ? "" : "md:flex-row-reverse"}`}
                    >
                      <div
                        className={`md:w-1/2 hidden md:block ${isLeft ? "md:pr-16 text-right" : "md:pl-16 text-left"}`}
                      >
                        <span
                          className={`inline-block text-xs font-bold uppercase tracking-widest ${isAccent ? "text-accent-text" : "text-primary"}`}
                        >
                          {copy.phaseLabel} {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Node */}
                      <div className="relative z-10 flex-shrink-0 mx-auto md:mx-0">
                        <div
                          className={`flex items-center justify-center w-14 h-14 rounded-full font-bold text-lg shadow-glow ring-8 ring-muted/40 ${
                            isAccent
                              ? "bg-accent text-accent-foreground"
                              : "bg-primary text-primary-foreground"
                          }`}
                        >
                          {i + 1}
                        </div>
                      </div>

                      <div className={`md:w-1/2 mt-4 md:mt-0 ${isLeft ? "md:pl-16" : "md:pr-16"}`}>
                        <div
                          className={`group bg-card rounded-2xl border border-border shadow-sm hover:shadow-glow hover:border-primary/30 transition-[border-color,box-shadow] duration-200 overflow-hidden ${isLeft ? "" : "md:text-right"}`}
                        >
                          {step.image && (
                            <div className="aspect-[16/9] overflow-hidden bg-muted">
                              <img
                                src={step.image.src}
                                alt={step.title}
                                loading="lazy"
                                decoding="async"
                                width={step.image.width}
                                height={step.image.height}
                                sizes={processImageSizes}
                                className="w-full h-full object-cover motion-safe:group-hover:scale-105 motion-safe:transition-transform motion-safe:duration-500"
                              />
                            </div>
                          )}
                          <div className="p-6 md:p-8">
                            <h3 className="font-display text-xl font-bold text-foreground mb-2">
                              {step.title}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {step.body}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div
            id={panelIds.can}
            role="tabpanel"
            tabIndex={0}
            aria-labelledby={tabIds.can}
            hidden={tab !== "can"}
            className="max-w-3xl mx-auto"
          >
            <div className="relative rounded-2xl border border-border bg-card p-10 md:p-16 text-center overflow-hidden shadow-sm">
              <div className="absolute inset-0 bg-gradient-glow opacity-30 pointer-events-none" />
              <div className="relative">
                <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow">
                  <Container className="h-8 w-8" />
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 text-accent-text px-3 py-1 text-xs font-bold uppercase tracking-widest mb-4">
                  <Clock className="h-3.5 w-3.5" /> {copy.canBadge}
                </div>
                <h2 className="font-display text-3xl md:text-5xl font-extrabold text-foreground mb-4">
                  {copy.canTitle}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-6">
                  {copy.canParagraphs[0]}
                </p>
                <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
                  {copy.canParagraphs[1]}
                </p>
                <Link
                  to="/contact"
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold motion-safe:hover:scale-105 transition-transform duration-200"
                >
                  {copy.canButton} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
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
                <p className="text-white/80 mb-10 text-lg max-w-xl mx-auto">
                  {copy.ctaBody}
                </p>
                <Link
                  to="/contact"
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 font-bold text-lg transition-colors duration-200 group"
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
