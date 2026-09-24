import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useNavigate,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, ChevronDown, MapPin, Menu, Play, Search, ShoppingCart, Smartphone, Sparkles, X } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/catalog";
import { QuoteCartProvider, useQuoteCart } from "@/components/quote-cart";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-extrabold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-bold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="mt-6">
          <Link to="/">Go home</Link>
        </Button>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-bold text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Try again
          </Button>
          <Button asChild variant="outline">
            <a href="/">Go home</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Oribrix Technologies Private Limited" },
      { property: "og:site_name", content: "Oribrix" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Sora:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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
      <QuoteCartProvider>
        <SiteHeader />
        <main>
          <Outlet />
        </main>
        <SiteFooter />
      </QuoteCartProvider>
    </QueryClientProvider>
  );
}

const navigation = [
  { label: "All materials", to: "/products" as const },
  { label: "About", to: "/about" as const },
  { label: "Contact", to: "/contact" as const },
];

function Brand() {
  return (
    <Link to="/" aria-label="Oribrix home" className="brand-lockup shrink-0">
      <span className="brand-mark" aria-hidden="true"><Sparkles /></span>
      <span>Oribrix</span>
    </Link>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  const { itemCount, cartPulse, openCart } = useQuoteCart();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate({ to: "/products", search: term.trim() ? { q: term.trim() } : {} });
    setOpen(false);
  }

  return (
    <header className="site-header">
      <div className="header-bar">
        <div className="header-inner site-shell">
          <Button
            variant="ghost"
            size="icon"
            aria-label={open ? "Close menu" : "Open menu"}
            className="header-menu -ml-2 md:hidden"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </Button>
          <div className="header-identity">
            <Brand />
            <button type="button" className="location-picker hidden lg:flex" aria-label="Choose delivery location">
              <span className="location-icon"><MapPin /></span>
              <span className="location-copy"><strong>Deliver to your site</strong><small>Fast, verified delivery</small></span>
              <ChevronDown className="location-chevron" />
            </button>
          </div>
          <nav aria-label="Primary navigation" className="header-navigation hidden md:flex">
            {navigation.map((item) => (
              <Link key={item.to} to={item.to} className="dept-link" activeProps={{ className: "dept-link-active" }}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="header-tools">
            <form onSubmit={submit} className="search-pill" role="search">
              <Search className="size-4 shrink-0" />
              <input
                value={term}
                onChange={(event) => setTerm(event.target.value)}
                placeholder="Search materials"
                aria-label="Search materials"
              />
              <button type="submit" className="search-submit" aria-label="Search">
                <Search className="size-4" />
              </button>
            </form>
            <Button
              key={cartPulse}
              type="button"
              variant="ghost"
              className={`cart-trigger relative ${cartPulse ? "cart-bump" : ""}`}
              onClick={openCart}
              aria-label={`Open material cart with ${itemCount} items`}
            >
              <ShoppingCart />
              <span className="cart-copy"><small>Quote cart</small><strong>{itemCount} items</strong></span>
              {itemCount > 0 && <span className="cart-count">{itemCount > 99 ? "99+" : itemCount}</span>}
            </Button>
          </div>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile navigation" className="mobile-menu md:hidden">
          {navigation.map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setOpen(false)}>
              {item.label}
              <ArrowRight />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="surface-ink accent-top">
      <div className="site-shell py-16">
        <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight">Oribrix</p>
            <p className="mt-3 max-w-xs text-sm leading-7 text-white/70">
              A construction materials network built on verified supply, bulk pricing and delivery you can follow to the
              gate.
            </p>
            <Link to="/contact" className="footer-cta">Talk to us <ArrowRight /></Link>
          </div>
          <div>
            <p className="eyebrow text-white/50">Shop by department</p>
            <ul className="mt-3 grid gap-2 text-sm">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link to="/products" search={{ category: category.slug }} className="footer-link">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-white/50">Get help</p>
            <ul className="mt-3 grid gap-2 text-sm">
              <li>
                <a href="tel:+916392042743" className="footer-link">
                  Call +91 63920 42743
                </a>
              </li>
              <li>
                <FooterQuoteLink />
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  Become a supply partner
                </Link>
              </li>
              <li>
                <Link to="/products" className="footer-link">
                  Browse all materials
                </Link>
              </li>
              <li>
                <Link to="/terms" className="footer-link">
                  Terms and conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <section className="app-promo" aria-labelledby="app-promo-title">
          <div className="app-promo-copy">
            <p className="eyebrow text-white/55">Oribrix on the go</p>
            <h2 id="app-promo-title" className="mt-2 font-display text-2xl font-semibold text-white md:text-3xl">Your project, always within reach</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/70">Browse categories, track deliveries and keep your quote cart moving from the site office or the road.</p>
            <div className="app-store-actions">
              <a href="https://www.android.com/" target="_blank" rel="noreferrer" className="app-store-badge">
                <span className="app-store-icon"><Smartphone /></span>
                <span><small>Available on</small><strong>Android</strong></span>
              </a>
              <a href="https://play.google.com/store" target="_blank" rel="noreferrer" className="app-store-badge">
                <span className="app-store-icon play-icon"><Play /></span>
                <span><small>Get it on</small><strong>Google Play</strong></span>
              </a>
            </div>
          </div>
          <div className="app-preview-frame">
            <img src="/oribrix-app-preview.png" alt="Oribrix mobile app showing materials and delivery tracking" />
          </div>
        </section>
        <div className="flex flex-col gap-2 pt-6 text-xs text-white/55 sm:flex-row sm:justify-between">
          <p>© 2026 Oribrix Technologies Private Limited</p>
          <p>Construction materials marketplace · India</p>
        </div>
      </div>
    </footer>
  );
}

function FooterQuoteLink() {
  const { openQuote } = useQuoteCart();
  return <button type="button" className="footer-link" onClick={() => openQuote()}>Request bulk pricing</button>;
}
