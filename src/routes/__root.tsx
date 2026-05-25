import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useLocation,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";

import appCss from "../styles.css?url";
import logo from "@/assets/quantum-leap-logo.png";
import socialImage from "@/assets/hero-factory.jpg";

const siteUrl = import.meta.env.VITE_SITE_URL?.trim();
const siteTitle = "QUANTUM LEAP — မြန်မာနိုင်ငံ၏ OEM နှင့် ODM အဖျော်ယမကာ ထုတ်လုပ်မှု";
const siteDescription =
  "QUANTUM LEAP သည် PET ပုလင်းသွတ်ခြင်း၊ အဖျော်ယမကာ ဖော်စပ်ခြင်းနှင့် စကေးချဲ့ထုတ်လုပ်မှု ဖြေရှင်းချက်များကို ပေးဆောင်သော မြန်မာနိုင်ငံအခြေစိုက် OEM နှင့် ODM အဖျော်ယမကာ ထုတ်လုပ်သူဖြစ်ပါသည်။";
const socialImageUrl = siteUrl ? new URL(socialImage, siteUrl).toString() : socialImage;

const documentTitles = {
  en: {
    "/": "QUANTUM LEAP — Myanmar's Next Generation OEM Beverage Partner",
    "/about": "About QUANTUM LEAP — Beverage Manufacturing",
    "/products": "Products — QUANTUM LEAP",
    "/faq": "FAQ — QUANTUM LEAP",
    "/contact": "Contact — QUANTUM LEAP",
    "/services/oem-manufacturing": "OEM and ODM Manufacturing — QUANTUM LEAP",
    "/services/production-capabilities": "Production Capabilities — QUANTUM LEAP",
    "/services/product-development": "Product Development — QUANTUM LEAP",
    "/services/factory-facilities": "Factory & Facilities — QUANTUM LEAP",
  },
  my: {
    "/": "QUANTUM LEAP — မြန်မာနိုင်ငံ၏ မျိုးဆက်သစ် OEM အဖျော်ယမကာ မိတ်ဖက်",
    "/about": "ကျွန်ုပ်တို့အကြောင်း — QUANTUM LEAP Beverage Manufacturing",
    "/products": "ထုတ်ကုန်များ — QUANTUM LEAP",
    "/faq": "အမေးများသော မေးခွန်းများ — QUANTUM LEAP",
    "/contact": "ဆက်သွယ်ရန် — QUANTUM LEAP",
    "/services/oem-manufacturing": "OEM နှင့် ODM ထုတ်လုပ်မှု — QUANTUM LEAP",
    "/services/production-capabilities": "ထုတ်လုပ်မှု စွမ်းဆောင်ရည်များ — QUANTUM LEAP",
    "/services/product-development": "ထုတ်ကုန် ဖွံ့ဖြိုးတိုးတက်မှု — QUANTUM LEAP",
    "/services/factory-facilities": "စက်ရုံနှင့် အခြေခံအဆောက်အအုံများ — QUANTUM LEAP",
  },
} as const;

function getCanonicalUrl(pathname = "/") {
  if (!siteUrl) return undefined;

  return new URL(pathname, siteUrl).toString();
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">စာမျက်နှာ မတွေ့ပါ</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          သင်ရှာဖွေနေသော စာမျက်နှာ မရှိတော့ပါ သို့မဟုတ် ပြောင်းရွှေ့ထားပါသည်။
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="focus-ring inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            ပင်မစာမျက်နှာသို့
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          ဤစာမျက်နှာကို ဖွင့်၍မရပါ
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          စနစ်ပိုင်းဆိုင်ရာ ပြဿနာတစ်ခု ဖြစ်ပွားခဲ့ပါသည်။ ပြန်လည်စမ်းကြည့်နိုင်သည် သို့မဟုတ်
          ပင်မစာမျက်နှာသို့ ပြန်သွားနိုင်ပါသည်။
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="focus-ring inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            ထပ်စမ်းရန်
          </button>
          <Link
            to="/"
            className="focus-ring inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            ပင်မစာမျက်နှာသို့
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: ({ matches }) => {
    const currentMatch = matches[matches.length - 1];
    const canonicalUrl = getCanonicalUrl(currentMatch?.pathname);

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#17396f" },
        { title: siteTitle },
        { name: "description", content: siteDescription },
        { name: "author", content: "QUANTUM LEAP Beverage Manufacturing Co. Ltd." },
        { property: "og:title", content: siteTitle },
        { property: "og:description", content: siteDescription },
        { property: "og:type", content: "website" },
        ...(canonicalUrl ? [{ property: "og:url", content: canonicalUrl }] : []),
        { property: "og:site_name", content: "QUANTUM LEAP" },
        { property: "og:locale", content: "my_MM" },
        { property: "og:image", content: socialImageUrl },
        { property: "og:image:alt", content: "QUANTUM LEAP အဖျော်ယမကာ ထုတ်လုပ်ရေး စက်ရုံ" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: siteTitle },
        { name: "twitter:description", content: siteDescription },
        { name: "twitter:image", content: socialImageUrl },
        { name: "twitter:image:alt", content: "QUANTUM LEAP အဖျော်ယမကာ ထုတ်လုပ်ရေး စက်ရုံ" },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        ...(canonicalUrl ? [{ rel: "canonical", href: canonicalUrl }] : []),
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Noto+Sans+Myanmar:wght@400;500;600;700;800;900&display=swap",
        },
        { rel: "preload", as: "image", href: logo },
        { rel: "icon", href: logo },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="my">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <DocumentLanguageSync />
        <Outlet />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

function DocumentLanguageSync() {
  const { lang } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.lang = lang === "my" ? "my" : "en";
    const pathname = location.pathname.replace(/\/$/, "") || "/";
    document.title = documentTitles[lang][pathname as keyof (typeof documentTitles)[typeof lang]]
      ?? documentTitles[lang]["/"];
  }, [lang, location.pathname]);

  return null;
}
