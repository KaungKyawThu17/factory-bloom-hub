import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import { MapPin, Phone, Mail, Building2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

type InquiryCategory = "beverage" | "packaging";
type SubmitStatus = "idle" | "submitting" | "sent" | "error";
type ContactLine =
  | string
  | {
      label: string;
      value: string;
      href?: string;
    };

type ContactSearch = {
  category?: InquiryCategory;
  product?: string;
};

const generalInquiriesEmail = "info@quantumleap-mm.com";
const quotationsEmail = "cs@quantumleap-mm.com";

const serviceValues = {
  oem: "OEM and ODM Manufacturing",
  odm: "ODM Solutions",
  production: "Production Capabilities",
  other: "Other",
} as const;

function parseInquiryCategory(value: unknown): InquiryCategory | undefined {
  return value === "beverage" || value === "packaging" ? value : undefined;
}

function parseSearchText(value: unknown) {
  if (typeof value !== "string") return undefined;

  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, 80) : undefined;
}

function getCategoryLabel(category: InquiryCategory | undefined, lang: "en" | "my") {
  if (lang === "en") {
    if (category === "beverage") return "Beverage";
    if (category === "packaging") return "Packaging";
    return "Product";
  }

  if (category === "beverage") return "အဖျော်ယမကာ";
  if (category === "packaging") return "ထုပ်ပိုးမှု";
  return "ထုတ်ကုန်";
}

function getDefaultMessage(search: ContactSearch, lang: "en" | "my") {
  if (!search.product) return undefined;

  const categoryLabel = getCategoryLabel(search.category, lang);
  if (lang === "en") {
    return `I'm interested in ${search.product} ${categoryLabel.toLowerCase()} support. Please share the right manufacturing path, packaging options, and next steps.`;
  }

  return `${search.product} ${categoryLabel} ဆိုင်ရာ ထုတ်လုပ်မှုအကူအညီကို စိတ်ဝင်စားပါသည်။ သင့်တော်သော ထုတ်လုပ်မှုလမ်းကြောင်း၊ ထုပ်ပိုးမှုရွေးချယ်စရာများနှင့် နောက်တစ်ဆင့် လုပ်ငန်းစဉ်များကို မျှဝေပေးပါ။`;
}

const contactCopy = {
  en: {
    general: "General inquiries",
    quotations: "Client services / Quotations",
    inquiryContext: "Inquiry context",
    selected: (category: string) => `${category} inquiry selected from the products page.`,
  },
  my: {
    general: "အထွေထွေ စုံစမ်းမှုများ",
    quotations: "ဖောက်သည်ဝန်ဆောင်မှု / ဈေးနှုန်းမေးမြန်းမှု",
    inquiryContext: "စုံစမ်းမှု အချက်အလက်",
    selected: (category: string) => `ထုတ်ကုန်စာမျက်နှာမှ ရွေးချယ်ထားသော ${category} ဆိုင်ရာ စုံစမ်းမှု။`,
  },
} as const;

export const Route = createFileRoute("/contact")({
  validateSearch: (search): ContactSearch => ({
    category: parseInquiryCategory(search.category),
    product: parseSearchText(search.product),
  }),
  head: () => ({
    meta: [
      { title: "Contact Us — QUANTUM LEAP" },
      {
        name: "description",
        content:
          "Get in touch with our OEM and ODM beverage manufacturing team in Yangon, Myanmar.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const search = Route.useSearch();
  const { lang, t } = useLanguage();
  const copy = contactCopy[lang];
  const defaultMessage = getDefaultMessage(search, lang);
  const categoryLabel = getCategoryLabel(search.category, lang);
  const sent = submitStatus === "sent";
  const submitting = submitStatus === "submitting";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { accept: "application/json" },
        body: new FormData(event.currentTarget),
      });

      if (!response.ok) {
        throw new Error(`Contact form failed with status ${response.status}`);
      }

      setSubmitStatus("sent");
      event.currentTarget.reset();
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    }
  };

  return (
    <Layout>
      <PageHero
        eyebrow={t("contact.hero.eyebrow")}
        title={t("contact.hero.title")}
        subtitle={t("contact.hero.subtitle")}
      />

      <section className="py-20 mx-auto max-w-7xl px-4 lg:px-8 grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <ContactCard
            icon={Building2}
            title={t("contact.card.company.title")}
            lines={[t("contact.card.company.line1")]}
          />
          <ContactCard
            icon={MapPin}
            title={t("contact.card.visit.title")}
            lines={[
              t("contact.card.visit.line1"),
              t("contact.card.visit.line2"),
              t("contact.card.visit.line3"),
              t("contact.card.visit.line4"),
            ]}
          />
          <ContactCard
            icon={Phone}
            title={t("contact.card.call.title")}
            lines={["09424548350", "09424548351"]}
          />
          <ContactCard
            icon={Mail}
            title={t("contact.card.email.title")}
            lines={[
              {
                label: copy.general,
                value: generalInquiriesEmail,
                href: `mailto:${generalInquiriesEmail}`,
              },
              {
                label: copy.quotations,
                value: quotationsEmail,
                href: `mailto:${quotationsEmail}`,
              },
            ]}
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="lg:col-span-3 rounded-3xl border border-border bg-card p-8 md:p-10 shadow-soft"
        >
          <h2 className="font-display text-2xl font-bold mb-1">{t("contact.form.title")}</h2>
          <p className="text-muted-foreground text-sm mb-6">{t("contact.form.subtitle")}</p>
          {sent ? (
            <div
              className="rounded-2xl bg-accent/20 text-foreground p-6 text-center"
              role="status"
              aria-live="polite"
            >
              {t("contact.form.thanks")}
            </div>
          ) : (
            <div className="grid gap-4">
              {submitStatus === "error" && (
                <div
                  className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-foreground"
                  role="alert"
                >
                  {t("contact.form.error")}
                </div>
              )}
              {search.product && (
                <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
                  <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                    {copy.inquiryContext}
                  </div>
                  <div className="mt-1 font-display text-lg font-bold text-foreground">
                    {search.product}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {copy.selected(categoryLabel)}
                  </p>
                </div>
              )}
              <input type="hidden" name="inquiry_product" value={search.product ?? ""} />
              <input type="hidden" name="inquiry_category" value={search.category ?? ""} />
              <div className="grid md:grid-cols-2 gap-4">
                <Field label={t("contact.form.name")}>
                  <input
                    name="name"
                    autoComplete="name"
                    required
                    className="focus-ring w-full rounded-xl border border-input bg-background px-4 py-3 text-sm"
                  />
                </Field>
                <Field label={t("contact.form.company")}>
                  <input
                    name="company"
                    autoComplete="organization"
                    className="focus-ring w-full rounded-xl border border-input bg-background px-4 py-3 text-sm"
                  />
                </Field>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label={t("contact.form.email")}>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="focus-ring w-full rounded-xl border border-input bg-background px-4 py-3 text-sm"
                  />
                </Field>
                <Field label={t("contact.form.phone")}>
                  <input
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    className="focus-ring w-full rounded-xl border border-input bg-background px-4 py-3 text-sm"
                  />
                </Field>
              </div>
              <Field label={t("contact.form.service")}>
                <select
                  name="service_interest"
                  defaultValue={serviceValues.oem}
                  className="focus-ring w-full rounded-xl border border-input bg-background px-4 py-3 text-sm"
                >
                  <option value={serviceValues.oem}>{t("contact.service.oem")}</option>
                  <option value={serviceValues.odm}>{t("contact.service.odm")}</option>
                  <option value={serviceValues.production}>
                    {t("contact.service.production")}
                  </option>
                  <option value={serviceValues.other}>{t("contact.service.other")}</option>
                </select>
              </Field>
              <Field label={t("contact.form.message")}>
                <textarea
                  key={defaultMessage ?? "blank-message"}
                  name="message"
                  rows={5}
                  required
                  defaultValue={defaultMessage}
                  className="focus-ring w-full rounded-xl border border-input bg-background px-4 py-3 text-sm resize-none"
                />
              </Field>
              <button
                type="submit"
                disabled={submitting}
                className="focus-ring mt-2 rounded-full bg-gradient-brand text-white px-7 py-3.5 font-semibold shadow-glow motion-safe:hover:scale-[1.02] transition-transform duration-200 disabled:cursor-not-allowed disabled:opacity-60 disabled:motion-safe:hover:scale-100"
              >
                {submitting ? t("contact.form.sending") : t("contact.form.submit")}
              </button>
            </div>
          )}
        </form>
      </section>

      <section className="pb-20 mx-auto max-w-7xl px-4 lg:px-8">
        <div className="rounded-3xl overflow-hidden border border-border shadow-soft">
          <iframe
            title={t("contact.map.title")}
            src="https://www.google.com/maps?q=Quantum+Leap+Co.,+Ltd.,+No.351/352+11th+Road,+Yangon+11021&output=embed"
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>
    </Layout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}

function ContactCard({
  icon: Icon,
  title,
  lines,
}: {
  icon: React.ElementType;
  title: string;
  lines: ContactLine[];
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 flex gap-4">
      <div className="h-11 w-11 rounded-xl bg-gradient-brand flex items-center justify-center shrink-0">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <div className="font-display font-bold mb-1">{title}</div>
        {lines.map((line, i) => (
          <div key={i} className="text-sm text-muted-foreground leading-relaxed">
            {typeof line === "string" ? (
              line
            ) : (
              <>
                <span className="font-medium text-foreground/80">{line.label}: </span>
                {line.href ? (
                  <a className="focus-ring rounded-sm hover:text-accent" href={line.href}>
                    {line.value}
                  </a>
                ) : (
                  line.value
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
