import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import welcomeImg from "@/assets/optimized/welcome-feature.jpg";
import { PageHero } from "@/components/PageHero";
import { ArrowRight, GlassWater, Package, Palette } from "lucide-react";
import plasticCapImg from "@/assets/optimized/pkg-plastic-cap-card.jpg";
import petBottleImg from "@/assets/optimized/pkg-pet-bottle-card.jpg";
import petPreformImg from "@/assets/optimized/pkg-pet-preform-card.jpg";
import aluminumCapImg from "@/assets/optimized/pkg-aluminum-cap-card.jpg";
import labelImg from "@/assets/optimized/pkg-label-card.jpg";
import prodElectrolyteImg from "@/assets/optimized/prod-electrolyte-card.jpg";
import prodFlavoredImg from "@/assets/optimized/prod-flavored-card.jpg";
import prodSoftDrinkImg from "@/assets/optimized/prod-soft-drink-card.jpg";
import prodTeaImg from "@/assets/optimized/prod-tea-card.jpg";
import prodFruitJuiceImg from "@/assets/optimized/prod-fruit-juice-card.jpg";
import prodEnergyImg from "@/assets/optimized/prod-energy-card.jpg";
import prodDairyImg from "@/assets/optimized/prod-dairy-card.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "ထုတ်ကုန်များ — QUANTUM LEAP" },
      {
        name: "description",
        content:
          "ထုပ်ပိုးမှုဆိုင်ရာ ထုတ်ကုန်များနှင့် အဖျော်ယမကာ OEM ထုတ်လုပ်မှု ဝန်ဆောင်မှုများ။",
      },
    ],
  }),
  component: Products,
});

type ImageAsset = {
  src: string;
  width: number;
  height: number;
};

type ProductCategory = "beverage" | "packaging";

type ProductCardData = {
  name: string;
  category: ProductCategory;
  image?: ImageAsset;
  desc: string;
  specs: string[];
  inquiryLabel: string;
  status?: string;
  items?: string[];
};

const gridImageSizes =
  "(min-width: 1280px) 405px, (min-width: 1024px) calc((100vw - 8rem) / 3), (min-width: 768px) calc((100vw - 5rem) / 2), calc(100vw - 2rem)";

const categoryLabels: Record<"en" | "my", Record<ProductCategory, string>> = {
  en: { beverage: "Beverage", packaging: "Packaging" },
  my: { beverage: "အဖျော်ယမကာ", packaging: "ထုပ်ပိုးမှု" },
};

const beverageProducts: ProductCardData[] = [
  {
    name: "အားဖြည့်အချိုရည်များ",
    category: "beverage",
    image: { src: prodEnergyImg, width: 960, height: 480 },
    desc: "စိတ်ကြိုက်ဖော်စပ်ထားသော ဖော်မြူလာများ၊ အရသာများနှင့် ထုပ်ပိုးမှုပုံစံများဖြင့် စွမ်းဆောင်ရည်မြင့် အားဖြည့်အချိုရည် ထုတ်လုပ်မှု ဖြေရှင်းချက်များ။",
    specs: ["ဖော်မြူလာ ပံ့ပိုးမှု", "PET ပုလင်းသွတ်ခြင်း", "ပမာဏအလိုက် ဈေးနှုန်း"],
    inquiryLabel: "ဈေးနှုန်း မေးမြန်းရန်",
  },
  {
    name: "အချိုရည်များ",
    category: "beverage",
    image: { src: prodSoftDrinkImg, width: 960, height: 640 },
    desc: "ပြည်တွင်းနှင့် ပြည်ပပို့ကုန် ဈေးကွက် လိုအပ်ချက်များအတွက် ကိုက်ညီသော ကာဗွန်နိတ်ပါဝင်သော သို့မဟုတ် မပါဝင်သော အချိုရည် ထုတ်လုပ်မှု။",
    specs: ["ကာဗွန်နိတ်ပါ/မပါ", "ထုပ်ပိုးမှုပြန်လည်သုံးသပ်မှု", "လိုင်းအစီအစဉ်"],
    inquiryLabel: "အချိုရည်ဆိုင်ရာ ဆွေးနွေးရန်",
  },
  {
    name: "သစ်သီးဖျော်ရည်များ",
    category: "beverage",
    image: { src: prodFruitJuiceImg, width: 960, height: 538 },
    desc: "လိမ္မော်၊ နာနတ်၊ သခွားမွှေး၊ လိုက်ချီးနှင့် စိတ်ကြိုက်ဖော်စပ်ထားသော သစ်သီးဖျော်ရည်များ ထုတ်လုပ်ခြင်း။",
    specs: ["သစ်သီးရောစပ်မှု", "တံဆိပ်ပံ့ပိုးမှု", "သက်တမ်းစစ်ဆေးမှု"],
    inquiryLabel: "ဖျော်ရည်ဆိုင်ရာ မေးမြန်းရန်",
  },
  {
    name: "ဓာတ်ဆားရည်များ",
    category: "beverage",
    image: { src: prodElectrolyteImg, width: 960, height: 479 },
    desc: "အဆင့်မြင့် ထုတ်လုပ်မှု စနစ်များဖြင့် အရည်အသွေး တသမတ်တည်းရှိသော ကျန်းမာရေးနှင့်ညီညွတ်သည့် ဓာတ်ဆားဖြည့်အချိုရည်များ။",
    specs: ["ဓာတ်ဆားဖော်မြူလာ", "PET ပုံစံများ", "Batch အစီအစဉ်"],
    inquiryLabel: "ဓာတ်ဆားရည် စီစဉ်ရန်",
  },
  {
    name: "အရသာပါဝင်သော အချိုရည်များ",
    category: "beverage",
    image: { src: prodFlavoredImg, width: 960, height: 479 },
    desc: "Nata de coco (အုန်းဂျယ်လီ) နှင့် သစ်သီးအခြေခံထားသော ဆန်းသစ်သည့် အရသာရှိသော အချိုရည်များ။",
    specs: ["အရသာညှိနှိုင်းမှု", "Nata de coco ရွေးချယ်စရာ", "စိတ်ကြိုက်တံဆိပ်"],
    inquiryLabel: "အရသာ brief စတင်ရန်",
  },
  {
    name: "လက်ဖက်ရည်နှင့် အဖျော်ယမကာများ",
    category: "beverage",
    image: { src: prodTeaImg, width: 960, height: 537 },
    desc: "လက်ဖက်ရည်၊ နို့လက်ဖက်ရည်၊ ကော်ဖီနှင့် တခြားသော အဖျော်ယမကာများ။",
    specs: ["လက်ဖက်ရည်ထုတ်ကုန်", "PET ပုံစံများ", "QC ပံ့ပိုးမှု"],
    inquiryLabel: "လက်ဖက်ရည်ထုတ်ကုန် ဆွေးနွေးရန်",
  },
];

const upcoming: ProductCardData[] = [
  {
    category: "beverage",
    image: { src: prodDairyImg, width: 960, height: 641 },
    name: "ပဲနို့နှင့် နို့ထွက်ပစ္စည်းများ",
    desc: "မကြာမီလာမည့် ပဲနို့နှင့် နို့ထွက်ပစ္စည်း ထုတ်ကုန်များ။",
    specs: ["ပဲနို့", "UHT အစီအစဉ်", "စတင်ထုတ်လုပ်မှု ဆွေးနွေးမှု"],
    inquiryLabel: "လာမည့်လိုင်း ဆွေးနွေးရန်",
    status: "မကြာမီလာမည်",
  },
];

const packagingProducts: ProductCardData[] = [
  {
    name: "ပလတ်စတစ် ပုလင်းအဖုံးများ",
    category: "packaging",
    image: { src: plasticCapImg, width: 960, height: 640 },
    desc: "PET အဖျော်ယမကာ ပုလင်းများအတွက် ပိတ်ဆို့မှုဆိုင်ရာ ဖြေရှင်းချက်များ။",
    items: ["အဖျော်ယမကာ ပုလင်းအဖုံးများ", "PET ပုလင်းများအတွက် ပိတ်ဆို့မှုဆိုင်ရာ ဖြေရှင်းချက်များ"],
    specs: ["PET ကိုက်ညီမှု", "အမှတ်တံဆိပ်အရောင်", "Specification ပြန်လည်သုံးသပ်မှု"],
    inquiryLabel: "အဖုံးများ မေးမြန်းရန်",
  },
  {
    name: "PET ပုလင်းများ",
    category: "packaging",
    image: { src: petBottleImg, width: 960, height: 731 },
    desc: "ထုတ်လုပ်ရန်အသင့်ဖြစ်သော ပုလင်းပုံစံများလိုအပ်သည့် အဖျော်ယမကာအမှတ်တံဆိပ်များအတွက် စိတ်ကြိုက် PET ပုလင်း ထုပ်ပိုးမှု ပံ့ပိုးမှု။",
    items: ["ရေသန့်ပုလင်းများ", "အပူပေးစနစ်ဖြင့် ပုလင်းသွတ်နိုင်သော ပုလင်းများ", "ကာဗွန်နိတ်အချိုရည်ပုလင်းများ", "စိတ်ကြိုက်ပုံစံဖော်ထားသော PET ထုပ်ပိုးမှုများ"],
    specs: ["Hot-fill ပုံစံများ", "စိတ်ကြိုက်ပုံစံ", "Neck finish အစီအစဉ်"],
    inquiryLabel: "ပုလင်းပုံစံ ဆွေးနွေးရန်",
  },
  {
    name: "PET ပုလင်းလောင်းများ",
    category: "packaging",
    image: { src: petPreformImg, width: 960, height: 598 },
    desc: "အဖျော်ယမကာအမျိုးအစားများနှင့် ထုပ်ပိုးမှုအစီအစဉ်များအတွက် ပုလင်းထုတ်လုပ်ရန် PET ပုလင်းလောင်းများ။",
    items: [
      "ပုလင်းထုတ်လုပ်ရန်အတွက် PET ပုလင်းလောင်းများ",
      "Crystallized နှင့် Non-crystallized ပုလင်းလောင်းများ",
      "CSD (ကာဗွန်နိတ်အချိုရည်) အတွက် ပုလင်းလောင်းများ",
    ],
    specs: ["Preform ပံ့ပိုးမှု", "CSD ရွေးချယ်စရာ", "Specification ပြန်လည်သုံးသပ်မှု"],
    inquiryLabel: "Preform အချက်အလက် မေးမြန်းရန်",
  },
  {
    name: "အလူမီနီယမ် အဖုံးများ",
    category: "packaging",
    image: { src: aluminumCapImg, width: 960, height: 523 },
    desc: "ယုံကြည်စိတ်ချရသော ပိတ်ဆို့မှုလိုအပ်သည့် အဖျော်ယမကာ ထုပ်ပိုးမှုအစီအစဉ်များအတွက် အလူမီနီယမ်အဖုံး ရွေးချယ်စရာများ။",
    items: ["အလူမီနီယမ် အဖျော်ယမကာ အဖုံးများ", "တံဆိပ်မပျက်သေးကြောင်း သက်သေပြနိုင်သည့် အဖုံးများ"],
    specs: ["Tamper-evident", "အဖျော်ယမကာ အဖုံးများ", "Specification ပြန်လည်သုံးသပ်မှု"],
    inquiryLabel: "အလူမီနီယမ်အဖုံး မေးမြန်းရန်",
  },
  {
    name: "တံဆိပ်များ",
    category: "packaging",
    image: { src: labelImg, width: 960, height: 547 },
    desc: "ပုလင်းအမှတ်တံဆိပ်အတွက် တံဆိပ်ဒီဇိုင်း၊ sleeve အစီအစဉ်နှင့် shelf presentation ပံ့ပိုးမှု။",
    items: ["အပူပေးကျုံ့ကပ်တံဆိပ်များ", "အဖျော်ယမကာ ထုပ်ပိုးမှုဆိုင်ရာ တံဆိပ်များ"],
    specs: ["Shrink sleeve", "Artwork ပံ့ပိုးမှု", "ပုလင်းနှင့်ကိုက်ညီမှု စစ်ဆေးမှု"],
    inquiryLabel: "တံဆိပ်များ ဆွေးနွေးရန်",
  },
  {
    name: "စိတ်ကြိုက်ဝန်ဆောင်မှုများ",
    category: "packaging",
    desc: "စိတ်ကြိုက် ပုလင်း၊ အဖုံးနှင့် တံဆိပ်စနစ် လိုအပ်သည့် အမှတ်တံဆိပ်များအတွက် OEM ထုပ်ပိုးမှု ဖွံ့ဖြိုးတိုးတက်မှု။",
    items: ["OEM ထုပ်ပိုးမှုဆိုင်ရာ ဖွံ့ဖြိုးတိုးတက်မှု", "စိတ်ကြိုက် ပုလင်းနှင့် အဖုံး ဒီဇိုင်းဖော်ဆောင်ခြင်း"],
    specs: ["ပုလင်းဒီဇိုင်း", "အဖုံး / တံဆိပ်စနစ်", "ထုပ်ပိုးမှု brief"],
    inquiryLabel: "စိတ်ကြိုက် brief စတင်ရန်",
  },
];

const quickInquiries = [
  {
    category: "beverage" as const,
    product: "အဖျော်ယမကာ ထုတ်လုပ်မှု",
    title: "အဖျော်ယမကာ စုံစမ်းမှု",
    body: "ဖော်မြူလာ၊ ပုလင်းပုံစံ၊ ထုတ်လုပ်မှုပမာဏနှင့် စတင်မည့်အချိန်။",
    icon: GlassWater,
  },
  {
    category: "packaging" as const,
    product: "ထုပ်ပိုးမှု ဖြေရှင်းချက်",
    title: "ထုပ်ပိုးမှု စုံစမ်းမှု",
    body: "PET ပုလင်းများ၊ ပုလင်းလောင်းများ၊ အဖုံးများ၊ တံဆိပ်များ သို့မဟုတ် စိတ်ကြိုက်ထုပ်ပိုးမှုစနစ်။",
    icon: Package,
  },
];

const englishBeverageProducts: ProductCardData[] = [
  {
    name: "Energy Drinks",
    category: "beverage",
    image: { src: prodEnergyImg, width: 960, height: 480 },
    desc: "Manufacturing solutions for high-performance energy beverages with customizable formulations, flavors, and packaging formats.",
    specs: ["Formula support", "PET bottling", "Quote by volume"],
    inquiryLabel: "Request quote",
  },
  {
    name: "Soft Drinks",
    category: "beverage",
    image: { src: prodSoftDrinkImg, width: 960, height: 640 },
    desc: "Carbonated and non-carbonated beverage production tailored for local and export market requirements.",
    specs: ["Still or carbonated", "Packaging review", "Line planning"],
    inquiryLabel: "Discuss soft drinks",
  },
  {
    name: "Fruit Juices",
    category: "beverage",
    image: { src: prodFruitJuiceImg, width: 960, height: 538 },
    desc: "Production of fruit juice beverages including orange, pineapple, cantaloupe, lychee, and customized formulations.",
    specs: ["Juice blends", "Label support", "Shelf-life review"],
    inquiryLabel: "Ask about juices",
  },
  {
    name: "Electrolyte Beverages",
    category: "beverage",
    image: { src: prodElectrolyteImg, width: 960, height: 479 },
    desc: "Functional hydration beverages manufactured with consistent quality and advanced processing systems.",
    specs: ["Hydration formula", "PET formats", "Batch planning"],
    inquiryLabel: "Plan electrolyte drink",
  },
  {
    name: "Flavored Drinks",
    category: "beverage",
    image: { src: prodFlavoredImg, width: 960, height: 479 },
    desc: "Innovative flavored beverages with nata de coco and fruit-based variations designed for evolving consumer preferences.",
    specs: ["Flavor matching", "Nata de coco options", "Custom labels"],
    inquiryLabel: "Start flavor brief",
  },
  {
    name: "Tea & Functional",
    category: "beverage",
    image: { src: prodTeaImg, width: 960, height: 537 },
    desc: "Tea-based and functional beverages for everyday wellness and performance.",
    specs: ["Functional concepts", "PET formats", "QC support"],
    inquiryLabel: "Discuss tea products",
  },
];

const englishUpcoming: ProductCardData[] = [
  {
    category: "beverage",
    image: { src: prodDairyImg, width: 960, height: 641 },
    name: "Dairy Products",
    desc: "Soy milk and dairy products.",
    specs: ["Soy milk", "UHT planning", "Launch consultation"],
    inquiryLabel: "Discuss upcoming line",
    status: "Coming Soon",
  },
];

const englishPackagingProducts: ProductCardData[] = [
  {
    name: "Plastic Cap",
    category: "packaging",
    image: { src: plasticCapImg, width: 960, height: 640 },
    desc: "Closure solutions for PET beverage bottles, planned around fit, sealing needs, and brand presentation.",
    items: ["Beverage bottle caps", "Closure solutions for PET bottles"],
    specs: ["PET compatibility", "Brand color planning", "Spec review"],
    inquiryLabel: "Ask about caps",
  },
  {
    name: "PET Bottle",
    category: "packaging",
    image: { src: petBottleImg, width: 960, height: 731 },
    desc: "Custom PET bottle packaging support for beverage brands that need production-ready bottle formats.",
    items: ["Hot-fill bottles", "Carbonated drink bottles", "Customized PET packaging"],
    specs: ["Hot-fill formats", "Custom shape review", "Neck finish planning"],
    inquiryLabel: "Discuss bottle format",
  },
  {
    name: "PET Preform",
    category: "packaging",
    image: { src: petPreformImg, width: 960, height: 598 },
    desc: "PET preform support for bottle manufacturing requirements across drink categories and packaging plans.",
    items: [
      "PET preforms for bottle manufacturing",
      "Crystallized & non-crystallized preforms",
      "CSD (carbonated soft drink) preforms",
    ],
    specs: ["Preform supply", "CSD options", "Spec review"],
    inquiryLabel: "Request preform info",
  },
  {
    name: "Aluminum Cap",
    category: "packaging",
    image: { src: aluminumCapImg, width: 960, height: 523 },
    desc: "Aluminum closure options for beverage packaging programs that require reliable sealed presentation.",
    items: ["Aluminum beverage closures", "Tamper-evident caps"],
    specs: ["Tamper-evident", "Beverage closures", "Spec review"],
    inquiryLabel: "Ask about closures",
  },
  {
    name: "Label",
    category: "packaging",
    image: { src: labelImg, width: 960, height: 547 },
    desc: "Packaging label support for bottle-ready branding, sleeve planning, and beverage shelf presentation.",
    items: ["Shrink sleeve labels", "Beverage packaging labels"],
    specs: ["Shrink sleeves", "Artwork support", "Bottle fit check"],
    inquiryLabel: "Discuss labels",
  },
  {
    name: "Customized Services",
    category: "packaging",
    desc: "OEM packaging development for brands that need a custom bottle, cap, and label system.",
    items: ["OEM packaging development", "Custom bottle and cap design"],
    specs: ["Bottle design", "Cap / label system", "Packaging brief"],
    inquiryLabel: "Start custom brief",
  },
];

const englishQuickInquiries = [
  {
    category: "beverage" as const,
    product: "Beverage manufacturing",
    title: "Beverage inquiry",
    body: "Formula, bottle format, production volume, and launch timing.",
    icon: GlassWater,
  },
  {
    category: "packaging" as const,
    product: "Packaging solution",
    title: "Packaging inquiry",
    body: "PET bottles, preforms, caps, labels, or a custom packaging system.",
    icon: Package,
  },
];

const productPageCopy = {
  en: {
    tailored: "Tailored Solutions",
    products: "Products",
    heroTitle: "A complete beverage portfolio.",
    heroSubtitle:
      "From energy and hydration to UHT and canning — the categories we manufacture today, and what's next.",
    beverages: "Beverages",
    beverageSub: "Energy · Soft · Tea · Dairy",
    packaging: "Packaging",
    packagingSub: "Caps · Bottles · Labels",
    quote: "Quote",
    productInquiry: "Product inquiry",
    briefEyebrow: "Start with your brief",
    briefTitle: "What are you looking to manufacture?",
    briefBody: "Choose a path and we will carry the product context into the contact form.",
    openInquiry: "Open inquiry",
    beverageTitle: "Beverage OEM Products",
    comingSoon: "Coming Soon",
    upcomingTitle: "Upcoming categories",
    packagingTitle: "Packaging Products",
    ctaTitle: "Not sure which product fits?",
    ctaBody:
      "Tell us what you want to launch and our team will map the right beverage or packaging path.",
    ctaButton: "Contact us",
    ariaFor: "for",
  },
  my: {
    tailored: "စိတ်ကြိုက် ဖြေရှင်းချက်များ",
    products: "ထုတ်ကုန်များ",
    heroTitle: "အဖျော်ယမကာနှင့် ထုပ်ပိုးမှုဆိုင်ရာ ထုတ်ကုန်အမျိုးအစားများ။",
    heroSubtitle:
      "ထုပ်ပိုးမှုဆိုင်ရာ ထုတ်ကုန်များမှ အဖျော်ယမကာ OEM ထုတ်လုပ်မှု ဝန်ဆောင်မှုများအထိ အပြည့်အဝ ပံ့ပိုးပေးပါသည်။",
    beverages: "အဖျော်ယမကာ",
    beverageSub: "အားဖြည့် · အချိုရည် · လက်ဖက်ရည် · နို့",
    packaging: "ထုပ်ပိုးမှု",
    packagingSub: "အဖုံး · ပုလင်း · တံဆိပ်",
    quote: "ဈေးနှုန်း",
    productInquiry: "ထုတ်ကုန် စုံစမ်းမှု",
    briefEyebrow: "သင့်လိုအပ်ချက်မှ စတင်ပါ",
    briefTitle: "မည်သည့်ထုတ်ကုန်ကို ထုတ်လုပ်လိုပါသလဲ?",
    briefBody:
      "သင့်လိုအပ်ချက်ကို ရွေးချယ်ပါ။ ထုတ်ကုန်အချက်အလက်များကို ဆက်သွယ်ရန်ဖောင်ထဲသို့ ထည့်သွင်းပေးပါမည်။",
    openInquiry: "စုံစမ်းမှုဖောင် ဖွင့်ရန်",
    beverageTitle: "အဖျော်ယမကာ OEM ထုတ်ကုန်များ",
    comingSoon: "မကြာမီလာမည်",
    upcomingTitle: "မကြာမီလာမည့် ထုတ်ကုန်များ",
    packagingTitle: "ထုပ်ပိုးမှုဆိုင်ရာ ထုတ်ကုန်များ",
    ctaTitle: "မည်သည့်ထုတ်ကုန် သင့်တော်မည်ကို မသေချာပါသလား?",
    ctaBody:
      "သင်စတင်လိုသည့် ထုတ်ကုန်အကြောင်း ပြောပြပါ။ ကျွန်ုပ်တို့အဖွဲ့က သင့်တော်သော အဖျော်ယမကာ သို့မဟုတ် ထုပ်ပိုးမှုလမ်းကြောင်းကို အကြံပြုပေးပါမည်။",
    ctaButton: "ဆက်သွယ်ရန်",
    ariaFor: "အတွက်",
  },
} as const;

function getInquirySearch(product: Pick<ProductCardData, "category" | "name">) {
  return {
    category: product.category,
    product: product.name,
  };
}

function ProductInquiryCard({
  product,
  variant = "default",
}: {
  product: ProductCardData;
  variant?: "default" | "dashed";
}) {
  const { lang } = useLanguage();
  const copy = productPageCopy[lang];

  return (
    <Link
      to="/contact"
      search={getInquirySearch(product)}
      aria-label={`${product.inquiryLabel} ${copy.ariaFor} ${product.name}`}
      className={`focus-ring group flex h-full flex-col overflow-hidden rounded-3xl border bg-card transition-[border-color,box-shadow,transform] duration-200 hover:border-primary/40 hover:shadow-glow motion-safe:hover:-translate-y-0.5 ${
        variant === "dashed" ? "border-dashed border-primary/30" : "border-border"
      }`}
    >
      <article className="flex h-full flex-col">
        {product.image ? (
          <div className="relative h-48 w-full overflow-hidden bg-muted">
            <img
              src={product.image.src}
              alt={product.name}
              className="h-full w-full object-cover motion-safe:group-hover:scale-105 motion-safe:transition-transform motion-safe:duration-500"
              loading="lazy"
              decoding="async"
              width={product.image.width}
              height={product.image.height}
              sizes={gridImageSizes}
            />
            {product.status && (
              <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground shadow-sm">
                {product.status}
              </span>
            )}
          </div>
        ) : (
          <div className="relative flex h-48 w-full items-center justify-center overflow-hidden bg-gradient-brand">
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm motion-safe:group-hover:scale-110 motion-safe:transition-transform motion-safe:duration-300">
                <Palette className="h-8 w-8 text-white" />
              </div>
            <span className="text-sm font-semibold tracking-wide text-white/90">
                {copy.tailored}
              </span>
            </div>
          </div>
        )}

        <div className="flex flex-1 flex-col p-6 md:p-8">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
              {categoryLabels[lang][product.category]}
            </span>
            {product.status && (
              <span className="rounded-full bg-accent/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-text">
                {product.status}
              </span>
            )}
          </div>
          <h3 className="font-display text-2xl font-bold mb-3">{product.name}</h3>
          <p className="text-muted-foreground leading-relaxed">{product.desc}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {product.specs.map((spec) => (
              <span
                key={spec}
                className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-foreground/80"
              >
                {spec}
              </span>
            ))}
          </div>

          {product.items && (
            <ul className="mt-5 space-y-2">
              {product.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          )}

          <span className="mt-6 inline-flex min-h-11 items-center gap-2 self-start rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-colors duration-200 group-hover:bg-primary">
            {product.inquiryLabel}
            <ArrowRight className="h-4 w-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-1" />
          </span>
        </div>
      </article>
    </Link>
  );
}

function Products() {
  const { lang } = useLanguage();
  const copy = productPageCopy[lang];
  const localizedBeverageProducts = lang === "en" ? englishBeverageProducts : beverageProducts;
  const localizedUpcoming = lang === "en" ? englishUpcoming : upcoming;
  const localizedPackagingProducts = lang === "en" ? englishPackagingProducts : packagingProducts;
  const localizedQuickInquiries = lang === "en" ? englishQuickInquiries : quickInquiries;
  const [activeNav, setActiveNav] = useState<ProductCategory>(() => {
    if (typeof window !== "undefined" && window.location.hash === "#packaging") {
      return "packaging";
    }

    return "beverage";
  });

  return (
    <Layout>
      <PageHero
        eyebrow={copy.products}
        title={copy.heroTitle}
        subtitle={copy.heroSubtitle}
      />

      <nav className="sticky top-24 md:top-32 z-40 border-y border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-3 lg:px-8">
          <div className="grid w-full max-w-md grid-cols-2 gap-1.5 rounded-2xl border border-border bg-muted/60 p-1.5 sm:w-fit sm:max-w-none sm:rounded-full">
            {(
              [
                {
                  key: "beverage",
                  href: "#beverages",
                  label: copy.beverages,
                  sub: copy.beverageSub,
                  icon: GlassWater,
                  count: localizedBeverageProducts.length,
                },
                {
                  key: "packaging",
                  href: "#packaging",
                  label: copy.packaging,
                  sub: copy.packagingSub,
                  icon: Package,
                  count: localizedPackagingProducts.length,
                },
              ] as const
            ).map(({ key, href, label, sub, icon: Icon, count }) => {
              const active = activeNav === key;

              return (
                <a
                  key={key}
                  href={href}
                  onClick={() => setActiveNav(key)}
                  className={`focus-ring relative flex min-h-11 items-center justify-center gap-2.5 rounded-xl px-4 py-2.5 text-left transition-[background-color,color,box-shadow] duration-200 sm:rounded-full sm:px-6 ${
                    active
                      ? "bg-foreground text-background shadow-soft"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <div className="flex flex-col leading-tight">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
                      {label}
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                          active
                            ? "bg-background/20 text-background"
                            : "bg-foreground/15 text-foreground"
                        }`}
                      >
                        {count}
                      </span>
                    </span>
                    <span
                      className={`hidden text-[10px] sm:block ${
                        active ? "text-background/70" : "text-muted-foreground/80"
                      }`}
                    >
                      {sub}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
          <Link
            to="/contact"
            search={{ category: "beverage", product: copy.productInquiry }}
            className="focus-ring hidden min-h-11 items-center rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition-colors duration-200 hover:bg-primary sm:inline-flex md:hidden"
          >
            {copy.quote}
          </Link>
        </div>
      </nav>

      <section className="border-b border-border bg-card/60 py-8">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-4 rounded-3xl border border-border bg-background p-5 shadow-soft md:grid-cols-[0.9fr_1.1fr] md:p-7">
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
                {copy.briefEyebrow}
              </div>
              <h2 className="font-display text-2xl font-bold leading-tight">
                {copy.briefTitle}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {copy.briefBody}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {localizedQuickInquiries.map(({ category, product, title, body, icon: Icon }) => (
                <Link
                  key={category}
                  to="/contact"
                  search={{ category, product }}
                  className="focus-ring group flex min-h-32 items-start gap-4 rounded-2xl border border-border bg-card p-4 transition-[border-color,box-shadow] duration-200 hover:border-primary/40 hover:shadow-soft"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-bold">{title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                      {body}
                    </span>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      {copy.openInquiry}
                      <ArrowRight className="h-4 w-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-1" />
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="beverages"
        className="py-20 mx-auto max-w-7xl px-4 lg:px-8 scroll-mt-52 md:scroll-mt-60"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 text-primary px-4 py-1.5 text-xs uppercase tracking-widest font-semibold">
            {copy.beverages}
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4">{copy.beverageTitle}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {localizedBeverageProducts.map((product) => (
            <ProductInquiryCard key={product.name} product={product} />
          ))}
        </div>
      </section>

      <section className="py-20 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 text-primary px-4 py-1.5 text-xs uppercase tracking-widest font-semibold">
              {copy.comingSoon}
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-4">{copy.upcomingTitle}</h2>
          </div>
          <div className="grid gap-6 max-w-xl mx-auto">
            {localizedUpcoming.map((product) => (
              <ProductInquiryCard key={product.name} product={product} variant="dashed" />
            ))}
          </div>
        </div>
      </section>

      <section
        id="packaging"
        className="py-20 mx-auto max-w-7xl px-4 lg:px-8 scroll-mt-52 md:scroll-mt-60"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 text-primary px-4 py-1.5 text-xs uppercase tracking-widest font-semibold">
            {copy.packaging}
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4">{copy.packagingTitle}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {localizedPackagingProducts.map((product) => (
            <ProductInquiryCard key={product.name} product={product} />
          ))}
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
              <div className="relative w-full p-10 md:p-16 text-center md:text-left max-w-2xl">
                <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  {copy.ctaTitle}
                </h3>
                <p className="text-white/80 mb-10 text-lg max-w-xl mx-auto">{copy.ctaBody}</p>
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
    </Layout>
  );
}
