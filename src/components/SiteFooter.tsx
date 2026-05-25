import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import logo from "@/assets/quantum-leap-logo.png";

const footerLinkClass =
  "focus-ring -mx-2 inline-flex min-h-11 items-center rounded-md px-2 text-background/80 hover:text-accent transition-colors duration-200";

const footerCopy = {
  en: {
    tagline: "Myanmar's next generation OEM beverage manufacturing partner.",
    explore: "Explore",
    about: "About Us",
    products: "Products",
    contact: "Contact",
    services: "Services",
    oem: "OEM and ODM Manufacturing",
    production: "Production Capabilities",
    development: "Product Development",
    facilities: "Factory & Facilities",
    address: "No.351-352, No.3 High Road, R-11 Mingalardon Garden City, Yangon, Myanmar",
    rights: "All rights reserved.",
  },
  my: {
    tagline: "မြန်မာနိုင်ငံ၏ မျိုးဆက်သစ် OEM အဖျော်ယမကာ ထုတ်လုပ်မှု မိတ်ဖက်။",
    explore: "စူးစမ်းရန်",
    about: "ကျွန်ုပ်တို့အကြောင်း",
    products: "ထုတ်ကုန်များ",
    contact: "ဆက်သွယ်ရန်",
    services: "ဝန်ဆောင်မှုများ",
    oem: "OEM နှင့် ODM ထုတ်လုပ်မှု",
    production: "ထုတ်လုပ်မှု စွမ်းဆောင်ရည်များ",
    development: "ထုတ်ကုန် ဖွံ့ဖြိုးတိုးတက်မှု",
    facilities: "စက်ရုံနှင့် အခြေခံအဆောက်အအုံများ",
    address:
      "အမှတ် ၃၅၁-၃၅၂၊ အမှတ် (၃) လမ်းမကြီး၊ R-11 မင်္ဂလာဒုံ ဂါးဒင်းစီးတီး၊ ရန်ကုန်။",
    rights: "မူပိုင်ခွင့်များ ထိန်းသိမ်းထားပါသည်။",
  },
} as const;

export function SiteFooter() {
  const { lang } = useLanguage();
  const copy = footerCopy[lang];

  return (
    <footer className="relative bg-foreground text-background mt-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src={logo}
              alt="QUANTUM LEAP"
              className="h-16 w-16 object-contain bg-white rounded-lg p-1"
            />
            <div className="font-display text-lg font-bold">QUANTUM LEAP</div>
          </div>
          <p className="text-sm text-background/70 leading-relaxed">{copy.tagline}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-background/60">
            {copy.explore}
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className={footerLinkClass}>
                {copy.about}
              </Link>
            </li>
            <li>
              <Link to="/products" className={footerLinkClass}>
                {copy.products}
              </Link>
            </li>
            <li>
              <Link to="/faq" className={footerLinkClass}>
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/contact" className={footerLinkClass}>
                {copy.contact}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-background/60">
            {copy.services}
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/services/oem-manufacturing" className={footerLinkClass}>
                {copy.oem}
              </Link>
            </li>
            <li>
              <Link to="/services/production-capabilities" className={footerLinkClass}>
                {copy.production}
              </Link>
            </li>
            <li>
              <Link to="/services/product-development" className={footerLinkClass}>
                {copy.development}
              </Link>
            </li>
            <li>
              <Link to="/services/factory-facilities" className={footerLinkClass}>
                {copy.facilities}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-background/60">
            {copy.contact}
          </h4>
          <ul className="space-y-3 text-sm text-background/80">
            <li className="flex gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
              <span>{copy.address}</span>
            </li>
            <li className="flex gap-2">
              <Phone className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
              <span>09424548350 / 09424548351</span>
            </li>
            <li className="flex gap-2">
              <Mail className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
              <span className="grid gap-1">
                <a
                  className="focus-ring rounded-sm hover:text-accent"
                  href="mailto:info@quantumleap-mm.com"
                >
                  info@quantumleap-mm.com
                </a>
                <a
                  className="focus-ring rounded-sm hover:text-accent"
                  href="mailto:cs@quantumleap-mm.com"
                >
                  cs@quantumleap-mm.com
                </a>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10 py-6 text-center text-xs text-background/50">
        © {new Date().getFullYear()} QUANTUM LEAP Beverage Manufacturing Co. Ltd. {copy.rights}
      </div>
    </footer>
  );
}
