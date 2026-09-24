import { Link } from "@tanstack/react-router";
import { categories } from "@/data/catalog";

export function CategoryGrid({ limit }: { limit?: number }) {
  const list = limit ? categories.slice(0, limit) : categories;
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {list.map((category, index) => (
        <Link
          key={category.slug}
          to="/products"
          search={{ category: category.slug }}
          className="wm-card wm-hover group relative flex flex-col overflow-hidden"
        >
          <div className="media-zoom overflow-hidden bg-muted">
            <img
              src={category.image}
              alt={category.name}
              className="aspect-square w-full object-cover"
              loading="lazy"
              width={768}
              height={768}
            />
          </div>
          <div className="p-4">
            <p className="font-display leading-snug font-semibold">{category.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{category.note}</p>
            <span className={`link-underline mt-3 ${index % 3 === 1 ? "text-forest" : index % 3 === 2 ? "text-gold-deep" : "text-primary"}`}>Browse</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
