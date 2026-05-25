import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="focus-ring sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-background focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-foreground focus:shadow-soft"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1 scroll-mt-32">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
