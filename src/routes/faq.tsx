import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — QUANTUM LEAP" },
      {
        name: "description",
        content: "Frequently asked questions about OEM and ODM beverage manufacturing services.",
      },
    ],
  }),
  component: FAQ,
});

const faqs = [
  {
    q: "ဘယ်လို အဖျော်ယမကာ အမျိုးအစားတွေကို ထုတ်လုပ်ပေးသလဲ?",
    a: "ကျွန်ုပ်တို့သည် အားဖြည့်အချိုရည်များ၊ ဖျော်ရည်များ၊ အနံ့အရသာပါဝင်သော အချိုရည်များ၊ ဓာတ်ဆားရည်များ၊ အချိုရည်များ (Soft Drinks) နှင့် မကြာမီလာမည့် UHT၊ CSD နှင့် စည်သွပ်ဗူး (Canning) ထုတ်ကုန်များကို ထုတ်လုပ်ပါသည်။",
  },
  {
    q: "OEM နဲ့ ODM ဝန်ဆောင်မှု နှစ်မျိုးလုံး ပေးသလား?",
    a: "ဟုတ်ကဲ့၊ ပေးပါသည်။ ဖောက်သည်လိုအပ်ချက်နှင့်အညီ OEM နှင့် ODM အဖျော်ယမကာ ထုတ်လုပ်မှု ဖြေရှင်းချက်များကို ပံ့ပိုးပေးပါသည်။",
  },
  {
    q: "မည်သည့် ထုပ်ပိုးမှုပုံစံများကို ရရှိနိုင်ပါလဲ?",
    a: "PET ပုလင်းများ၊ အိတ်သွတ်စနစ် (Standing Pouches) နှင့် မကြာမီအချိန်တွင် ဖန်ပုလင်း ထုပ်ပိုးမှုပုံစံများကို ရရှိနိုင်ရန် ကြိုးစားနေပါသည်။",
  },
  {
    q: "Quantum Leap အနေဖြင့် ပြည်ပပို့ကုန် ထုတ်လုပ်မှုကို ပံ့ပိုးပေးနိုင်ပါသလား?",
    a: "ဟုတ်ကဲ့။ ကျွန်ုပ်တို့၏ စက်ရုံသည် ပြည်တွင်းနှင့် နိုင်ငံတကာ ဈေးကွက်နှစ်ခုလုံးအတွက် ပံ့ပိုးပေးနိုင်ပါသည်။",
  },
];

const englishFaqs = [
  {
    q: "What beverage categories can QUANTUM LEAP manufacture?",
    a: "We manufacture energy drinks, juices, flavored beverages, electrolyte drinks, soft drinks, and upcoming UHT, CSD and Canning products.",
  },
  {
    q: "Do you provide OEM and ODM beverage services?",
    a: "Yes. We provide both OEM and ODM beverage manufacturing solutions tailored to client requirements.",
  },
  {
    q: "What packaging formats are available?",
    a: "PET bottles, standing pouches, and future glass bottle packaging options are available.",
  },
  {
    q: "Can QUANTUM LEAP support export production?",
    a: "Yes. Our facility is designed to support scalable production for both local and international markets.",
  },
];

const faqCopy = {
  en: {
    title: "Answers to the questions we hear most.",
    subtitle: "Don't see what you're looking for? Reach out to our team — we're happy to help.",
  },
  my: {
    title: "အမေးများသော မေးခွန်းများ",
    subtitle: "သင်ရှာဖွေနေသည့် အဖြေ မတွေ့ပါက ကျွန်ုပ်တို့အဖွဲ့ကို ဆက်သွယ်နိုင်ပါသည်။",
  },
} as const;

function FAQ() {
  const { lang } = useLanguage();
  const copy = faqCopy[lang];
  const localizedFaqs = lang === "en" ? englishFaqs : faqs;
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Layout>
      <PageHero
        eyebrow="FAQ"
        title={copy.title}
        subtitle={copy.subtitle}
      />
      <section className="py-20 mx-auto max-w-3xl px-4 lg:px-8">
        <div className="space-y-3">
          {localizedFaqs.map((f, i) => {
            const isOpen = open === i;
            const triggerId = `faq-trigger-${i}`;
            const panelId = `faq-panel-${i}`;

            return (
              <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
                <button
                  id={triggerId}
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="focus-ring w-full flex items-center justify-between gap-4 p-6 text-left"
                >
                  <span className="font-display text-lg font-bold">{f.q}</span>
                  {isOpen ? (
                    <Minus className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                  ) : (
                    <Plus className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                  )}
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  hidden={!isOpen}
                  className="px-6 pb-6 text-muted-foreground leading-relaxed"
                >
                  {f.a}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
