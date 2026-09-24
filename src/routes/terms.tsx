import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FileText } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions | Oribrix" },
      {
        name: "description",
        content: "The terms that govern the use of the Oribrix construction materials marketplace.",
      },
      { property: "og:title", content: "Terms and Conditions | Oribrix" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main>
      <section className="bg-brand-tint py-14 md:py-20">
        <div className="site-shell max-w-4xl">
          <Link to="/" className="link-underline text-primary"><ArrowLeft /> Back home</Link>
          <div className="mt-10 flex items-start gap-4">
            <span className="legal-icon"><FileText /></span>
            <div>
              <p className="eyebrow text-primary">Oribrix legal</p>
              <h1 className="display-title mt-2">Terms and conditions</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">Last updated September 23, 2026. These terms describe how buyers and supply partners use the Oribrix marketplace.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="site-shell max-w-4xl space-y-10 text-base leading-8 text-muted-foreground">
          {[
            ["Using Oribrix", "You may use Oribrix to discover construction materials, request pricing, coordinate deliveries and communicate with our team. You agree to provide accurate project, contact and delivery information and to use the service for lawful business purposes."],
            ["Quotes, orders and payment", "A quote is an estimate until the scope, availability, delivery details and commercial terms are confirmed in writing. Product availability, lead times and prices may change before confirmation. Payment, credit and cancellation terms apply to the confirmed order."],
            ["Delivery and inspection", "Delivery windows are planned using the information available at confirmation. The receiving party is responsible for providing safe access and checking quantities and visible condition at delivery. Any discrepancy should be reported promptly with supporting details."],
            ["Supplier relationships", "Oribrix works with verified supply partners, but each product remains subject to the confirmed specification and commercial terms. We will work with the relevant parties to resolve quality, quantity or delivery concerns fairly and promptly."],
            ["Privacy and communications", "We use the information you share to respond to enquiries, manage quotes, coordinate orders and improve the marketplace. We do not sell personal information. By contacting us, you agree that our team may respond about your request."],
            ["Updates", "We may update these terms as the service evolves. The latest version will remain available on this page, with the effective date shown above. Continued use of Oribrix after an update means you accept the revised terms."],
          ].map(([title, body], index) => (
            <article key={title} className="legal-section">
              <span className="legal-index">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="text-xl font-semibold text-foreground">{title}</h2>
                <p className="mt-3">{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/terms": {
      parentRoute: typeof import("./__root").Route;
    };
  }
}
