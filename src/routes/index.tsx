import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeIndianRupee, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryGrid } from "@/components/category-grid";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { QuoteButton } from "@/components/quote-cart";
import { products } from "@/data/catalog";
import heroImage from "@/assets/oribrix-construction-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Oribrix | Construction Materials Delivered to Site" },
      {
        name: "description",
        content:
          "Shop cement, steel, aggregates, blocks and site essentials in bulk. Verified suppliers, bulk pricing and tracked delivery with Oribrix.",
      },
      { property: "og:title", content: "Oribrix | Construction Materials Delivered to Site" },
      {
        property: "og:description",
        content: "A B2B marketplace for construction materials with bulk pricing and tracked delivery.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const perks = [
  { icon: BadgeIndianRupee, title: "Bulk pricing", body: "Project quantities quoted for your site.", tone: "text-primary" },
  { icon: ShieldCheck, title: "Verified suppliers", body: "Onboarded and checked before they sell.", tone: "text-forest" },
  { icon: Truck, title: "Tracked delivery", body: "Follow each order from dispatch to gate.", tone: "text-primary" },
  { icon: PackageCheck, title: "Proof of delivery", body: "Every drop recorded against the order.", tone: "text-gold-deep" },
];

function HomePage() {
  return (
    <>
      <section className="surface-ink relative overflow-hidden">
        <img
          src={heroImage}
          alt="Construction materials at an active project site"
          className="hero-image opacity-25"
          width={1920}
          height={1088}
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, oklch(0.2 0.05 258 / .92), oklch(0.2 0.05 258 / .35))" }}
        />
        <div className="site-shell relative grid gap-12 py-20 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:py-28">
          <div>
            <span className="pill-badge pill-badge-invert">Construction materials network</span>
            <h1 className="display-title mt-6 max-w-2xl text-white">
              Everything your site needs, priced and delivered
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/75">
              Cement, steel, aggregates, blocks, plumbing, electrical and finishes from verified suppliers — quoted for
              project quantities and tracked to your gate.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-7">
                <Link to="/products">Browse materials</Link>
              </Button>
              <QuoteButton
                size="lg"
                variant="outline"
                className="rounded-full border-white/30 bg-transparent px-7 text-white hover:bg-white/10 hover:text-white"
              >
                Get bulk pricing
              </QuoteButton>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/10 sm:grid-cols-4 lg:grid-cols-2">
            {[
              ["8", "Material departments"],
              ["1 list", "One consolidated quote"],
              ["Verified", "Supplier onboarding"],
              ["Tracked", "Dispatch to delivery"],
            ].map(([value, label]) => (
              <div key={label} className="bg-transparent p-5 backdrop-blur-sm" style={{ background: "oklch(1 0 0 / .06)" }}>
                <dt className="font-display text-2xl font-semibold text-white">{value}</dt>
                <dd className="mt-1 text-sm text-white/65">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="site-shell grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {perks.map(({ icon: Icon, title, body, tone }) => (
            <div key={title} className="flex items-start gap-3 bg-background px-5 py-7">
              <Icon className={`mt-0.5 size-5 shrink-0 ${tone}`} />
              <div>
                <p className="font-display font-semibold">{title}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-space">
        <div className="site-shell">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Catalogue" title="Shop by department" />
              <Link to="/products" className="link-underline text-primary">
                View all materials
              </Link>
            </div>
          </Reveal>
          <Reveal className="mt-10" delay={80}>
            <CategoryGrid />
          </Reveal>
        </div>
      </section>

      <section className="bg-brand-tint section-space">
        <div className="site-shell">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Moving fast" title="Popular on site right now" />
              <Link to="/products" className="link-underline text-primary">
                See more
              </Link>
            </div>
          </Reveal>
          <Reveal className="mt-10" delay={80}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-20">
        <div className="site-shell">
          <div className="surface-ink accent-top wm-tile flex flex-col items-start justify-between gap-6 p-10 md:flex-row md:items-center md:p-14">
            <div>
              <p className="eyebrow text-white/55">Ready when your site is</p>
              <h2 className="section-title mt-3 max-w-2xl text-white">Send your material list, get one priced quote</h2>
              <div className="rule-accent mt-5" />
            </div>
            <Button asChild size="lg" variant="secondary" className="rounded-full px-7">
              <Link to="/contact">Talk to us <ArrowRight /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
