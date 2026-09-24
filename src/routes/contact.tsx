import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { CheckCircle2, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const mapUrl = "https://www.google.com/maps/search/?api=1&query=H.No-109%2C%20Sector-C%20Pocket-4%2C%20Sushant%20Golf%20City%2C%20Lucknow%2C%20Uttar%20Pradesh%20226030";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Oribrix | Get in Touch" },
      {
        name: "description",
        content: "Contact Oribrix for general questions, partnerships, support, or help with the construction materials network.",
      },
      { property: "og:title", content: "Contact Oribrix | Get in Touch" },
      { property: "og:description", content: "Reach Oribrix for support, partnerships, and general questions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!data.get("name") || !data.get("email") || !data.get("message")) {
      setError("Please add your name, email address and message.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return (
    <>
      <section className="bg-brand-tint py-10">
        <div className="site-shell">
          <p className="eyebrow text-primary">Contact Oribrix</p>
          <h1 className="display-title mt-2">Let’s start a conversation</h1>
          <div className="rule-accent mt-5" />
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Questions, partnerships, support or feedback — send us a message and our team will get back to you.
          </p>
        </div>
      </section>

      <section className="section-space">
        <div className="site-shell grid gap-6 lg:grid-cols-[1fr_20rem]">
          <div className="wm-card p-6 md:p-8">
            {submitted ? (
              <div className="flex min-h-[24rem] flex-col items-center justify-center text-center">
                <CheckCircle2 className="size-14 text-forest" />
                <h2 className="section-title mt-4">Message ready</h2>
                <p className="mt-2 max-w-md text-muted-foreground">
                  Thanks for getting in touch. Please call +91 63920 42743 if your message is time-sensitive.
                </p>
                <Button className="mt-5" onClick={() => setSubmitted(false)}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <h2 className="section-title">Send us a message</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field label="Your name *" name="name" placeholder="Full name" />
                  <Field label="Email address *" name="email" placeholder="you@company.com" type="email" />
                  <Field label="Phone number" name="phone" placeholder="+91" type="tel" />
                  <Field label="Company" name="company" placeholder="Company name" />
                </div>
                <label className="mt-4 block text-sm font-semibold">
                  Subject
                  <select
                    name="subject"
                    className="mt-2 h-12 w-full rounded-xl border border-input bg-background px-3 text-sm font-normal outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option>General question</option>
                    <option>Customer support</option>
                    <option>Supplier partnership</option>
                    <option>Business partnership</option>
                    <option>Feedback</option>
                  </select>
                </label>
                <div className="mt-4 space-y-2">
                  <Label htmlFor="contact-message">Message *</Label>
                  <Textarea id="contact-message" name="message" rows={6} className="rounded-xl" placeholder="How can we help?" />
                </div>
                {error && (
                  <p role="alert" className="mt-4 text-sm font-bold text-destructive">
                    {error}
                  </p>
                )}
                <Button type="submit" size="lg" className="mt-5 w-full sm:w-auto">
                  Send message
                </Button>
                <p className="mt-4 text-xs leading-5 text-muted-foreground">
                  This website does not yet send or store messages online. Please use the phone number for immediate help.
                </p>
              </form>
            )}
          </div>

          <aside className="grid h-fit gap-4">
            <a href="tel:+916392042743" className="wm-card wm-hover flex items-start gap-3 p-5">
              <Phone className="mt-1 size-5 text-forest" />
              <span>
                <strong className="block text-sm">Ayush · Direct line</strong>
                <span className="mt-1 block text-muted-foreground">+91 63920 42743</span>
              </span>
            </a>
            <a href={mapUrl} target="_blank" rel="noreferrer" className="wm-card wm-hover flex items-start gap-3 p-5" aria-label="Open Oribrix office address in Google Maps">
              <MapPin className="mt-1 size-5 text-gold-deep" />
              <address className="not-italic leading-7 text-muted-foreground">
                <strong className="block text-sm text-foreground">Oribrix Technologies Private Limited</strong>
                H.No-109, Sector-C Pocket-4
                <br />
                Sushant Golf City, Lucknow
                <br />
                Uttar Pradesh 226030
              </address>
            </a>
            <div className="wm-card wm-tile bg-forest-soft p-6">
              <p className="font-bold">Supplying materials?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Choose “Supplier partnership” in the form and tell us about your catalogue and service area.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, placeholder, type = "text" }: { label: string; name: string; placeholder: string; type?: string }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={`contact-${name}`}>{label}</Label>
      <Input id={`contact-${name}`} name={name} type={type} className="h-12 rounded-xl" placeholder={placeholder} />
    </div>
  );
}
