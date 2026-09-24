import { useState } from "react";
import { Check, Plus } from "lucide-react";
import type { Product } from "@/data/catalog";
import { categories } from "@/data/catalog";
import { Button } from "@/components/ui/button";
import { useQuoteCart } from "@/components/quote-cart";

export function ProductCard({ product }: { product: Product }) {
  const category = categories.find((item) => item.slug === product.category);
  const { addItem, openQuote } = useQuoteCart();
  const [added, setAdded] = useState(false);

  function addToCart() {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }

  return (
    <article className="wm-card wm-hover group flex flex-col overflow-hidden">
      <div className="media-zoom relative overflow-hidden bg-muted">
        {product.badge && <span className="badge-gold absolute left-3 top-3 z-10">{product.badge}</span>}
        <img
          src={product.image}
          alt={product.name}
          className="aspect-4/3 w-full object-cover"
          loading="lazy"
          width={768}
          height={768}
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        {category && <p className="eyebrow text-muted-foreground">{category.name}</p>}
        <h3 className="mt-2 font-display text-lg leading-snug font-semibold">{product.name}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{product.detail}</p>
        <div className="mt-auto pt-5">
          <div className="hairline" />
          <div className="mt-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">Price on request</p>
              <p className="text-xs text-muted-foreground">{product.unit}</p>
            </div>
             <div className="grid shrink-0 gap-2">
               <Button
                 type="button"
                 size="sm"
                 variant={added ? "secondary" : "default"}
                 className={added ? "add-confirmed" : ""}
                 onClick={addToCart}
               >
                 {added ? <Check /> : <Plus />} {added ? "Added" : "Add"}
               </Button>
               <Button type="button" size="sm" variant="outline" onClick={() => openQuote(product)}>
                 Enquire
               </Button>
             </div>
          </div>
        </div>
      </div>
    </article>
  );
}
