import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Eye, Network, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import heroImage from "@/assets/oribrix-construction-hero.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Oribrix | Connected Construction Commerce" },
      {
        name: "description",
        content: "Oribrix is building a more visible, accountable and efficient construction materials supply network.",
      },
      { property: "og:title", content: "About Oribrix" },
      { property: "og:description", content: "The connected operating layer for construction material commerce." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="bg-brand-tint py-10">
        <div className="site-shell grid items-center gap-6 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-primary">About Oribrix</p>
            <h1 className="display-title mt-2">Construction moves, supply should keep up</h1>
            <div className="rule-accent mt-5" />
            <p className="mt-3 text-lg text-muted-foreground">
              We connect construction buyers, supply partners and network operations into one ecosystem for B2B material
              commerce.
            </p>
          </div>
          <div className="wm-tile">
            <img
              src={heroImage}
              alt="An active construction site supplied with essential building materials"
              className="aspect-[16/9] w-full object-cover"
              width={1920}
              height={1088}
            />
          </div>
        </div>
      </section>

      <section className="section-space">
        <Reveal className="site-shell grid gap-8 lg:grid-cols-2">
          <SectionHeading eyebrow="Our purpose" title="Replace fragmentation with flow" />
          <div className="space-y-4 text-base leading-7 text-muted-foreground">
            <p>
              Instead of disconnected calls, spreadsheets and uncertain handoffs, Oribrix creates a clear journey — from
              site-aware discovery and bulk pricing to fulfillment, proof of delivery and settlement.
            </p>
            <p>
              That shared visibility helps every participant make faster decisions and maintain higher service standards
              as volumes grow.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="pb-8">
        <div className="site-shell grid gap-4 md:grid-cols-3">
          {[
            [Eye, "Visibility", "A current view of availability, orders, incidents and finance."],
            [ShieldCheck, "Accountability", "Verified suppliers, structured states and preserved audit trails."],
            [Network, "Coordination", "One connected workflow across buyers, suppliers and operations."],
          ].map(([Icon, title, body], index) => {
            const I = Icon as typeof Eye;
            return (
              <article key={title as string} className="wm-card wm-hover p-6">
                <I className={`size-6 ${index === 1 ? "text-forest" : index === 2 ? "text-gold-deep" : "text-primary"}`} />
                <h2 className="mt-4 text-xl font-semibold">{title as string}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{body as string}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="pb-12">
        <div className="site-shell">
          <div className="surface-ink accent-top wm-tile flex flex-col items-start justify-between gap-5 p-10 md:flex-row md:items-center md:p-14">
            <div>
              <p className="eyebrow text-white/55">Build with Oribrix</p>
              <h2 className="section-title mt-2 max-w-2xl text-white">A stronger supply network starts with one conversation</h2>
            </div>
            <Button asChild size="lg" variant="secondary" className="rounded-full px-7">
              <Link to="/contact">
                Contact us <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
