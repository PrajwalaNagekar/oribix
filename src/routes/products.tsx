import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { categories, products } from "@/data/catalog";
import { QuoteButton } from "@/components/quote-cart";

type ProductSearch = { category?: string; q?: string };

export const Route = createFileRoute("/products")({
  validateSearch: (search: Record<string, unknown>): ProductSearch => ({
    ...(typeof search["category"] === "string" ? { category: search["category"] } : {}),
    ...(typeof search["q"] === "string" ? { q: search["q"] } : {}),
  }),
  head: () => ({
    meta: [
      { title: "All Construction Materials | Oribrix" },
      {
        name: "description",
        content:
          "Browse cement, steel, aggregates, blocks, plumbing, electrical, finishes and site essentials. Request bulk pricing from Oribrix.",
      },
      { property: "og:title", content: "All Construction Materials | Oribrix" },
      { property: "og:description", content: "Find site-ready construction materials and request bulk pricing." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { category, q } = Route.useSearch();
  const navigate = useNavigate();
  const [query, setQuery] = useState(q ?? "");
  const [sort, setSort] = useState("relevance");

  const activeCategory = categories.find((item) => item.slug === category);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    const list = products.filter(
      (product) =>
        (!category || product.category === category) &&
        (!term || `${product.name} ${product.category} ${product.detail}`.toLowerCase().includes(term)),
    );
    if (sort === "name") return [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [category, query, sort]);

  return (
    <>
      <div className="border-b border-border bg-muted">
        <div className="site-shell flex flex-wrap items-center gap-2 py-3 text-sm text-muted-foreground">
          <Link to="/" className="footer-link">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-foreground">{activeCategory ? activeCategory.name : "All materials"}</span>
        </div>
      </div>

      <section className="site-shell py-10">
        <h1 className="display-title">{activeCategory ? activeCategory.name : "All construction materials"}</h1>
        <p className="mt-2 text-muted-foreground">
          {activeCategory ? activeCategory.note : "Verified supply across every stage of the build, priced for project quantities."}
        </p>

        <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="search-pill border border-input lg:max-w-xl">
            <Search className="size-5 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search within materials"
              aria-label="Search within materials"
            />
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold">
            <SlidersHorizontal className="size-4 text-muted-foreground" />
            Sort by
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="h-10 rounded-full border border-input bg-background px-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="relevance">Best match</option>
              <option value="name">Name A–Z</option>
            </select>
          </label>
          <p className="text-sm text-muted-foreground lg:ml-auto">{filtered.length} results</p>
        </div>

        <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => navigate({ to: "/products", search: {} })}
            className={`chip ${!category ? "chip-active" : ""}`}
          >
            All
          </button>
          {categories.map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => navigate({ to: "/products", search: { category: item.slug } })}
              className={`chip ${category === item.slug ? "chip-active" : ""}`}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[15rem_1fr]">
          <aside className="wm-card hidden h-fit p-5 lg:block">
            <p className="eyebrow text-muted-foreground">Departments</p>
            <ul className="mt-3 grid gap-2 text-sm">
              <li>
                <Link to="/products" search={{}} className={!category ? "font-semibold text-primary" : "footer-link"}>
                  All materials
                </Link>
              </li>
              {categories.map((item) => (
                <li key={item.slug}>
                  <Link
                    to="/products"
                    search={{ category: item.slug }}
                    className={category === item.slug ? "font-semibold text-primary" : "footer-link"}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-xl bg-brand-tint p-4">
              <p className="text-sm font-semibold">Need a full material list priced?</p>
              <QuoteButton size="sm" className="mt-3 w-full rounded-full">Request a quote</QuoteButton>
            </div>
          </aside>

          <div>
            {filtered.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((product) => (
                  <ProductCard key={product.name} product={product} />
                ))}
              </div>
            ) : (
              <div className="wm-card p-10 text-center">
                <h2 className="section-title">No exact match yet</h2>
                <p className="mt-2 text-muted-foreground">Send us your list and we will help source it.</p>
                <QuoteButton className="mt-5">Request a quote</QuoteButton>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="site-shell">
          <div className="surface-ink accent-top wm-tile flex flex-col items-start justify-between gap-5 p-10 md:flex-row md:items-center md:p-14">
            <div>
              <p className="eyebrow text-white/55">Large or non-catalogue requirement?</p>
              <h2 className="section-title mt-2 text-white">Send the list, get one tailored quote</h2>
            </div>
            <QuoteButton size="lg" variant="secondary" className="rounded-full px-7">
              Start a bulk enquiry <ArrowRight />
            </QuoteButton>
          </div>
        </div>
      </section>
    </>
  );
}
