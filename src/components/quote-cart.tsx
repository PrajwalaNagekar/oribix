"use client";

import { createContext, useContext, useState, type FormEvent, type ReactNode } from "react";
import { Check, CheckCircle2, ClipboardList, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import type { Product } from "@/data/catalog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

type CartItem = { product: Product; quantity: number };
type QuoteContextValue = {
  items: CartItem[];
  itemCount: number;
  cartPulse: number;
  addItem: (product: Product) => void;
  setQuantity: (name: string, quantity: number) => void;
  removeItem: (name: string) => void;
  openCart: () => void;
  openQuote: (product?: Product) => void;
};

const QuoteContext = createContext<QuoteContextValue | undefined>(undefined);

export function QuoteCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState<Product | undefined>();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [cartPulse, setCartPulse] = useState(0);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  function addItem(product: Product) {
    setItems((current) => {
      const existing = current.find((item) => item.product.name === product.name);
      if (existing) {
        return current.map((item) =>
          item.product.name === product.name ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { product, quantity: 1 }];
    });
    setCartPulse((value) => value + 1);
  }

  function setQuantity(name: string, quantity: number) {
    if (quantity < 1) {
      setItems((current) => current.filter((item) => item.product.name !== name));
      return;
    }
    setItems((current) => current.map((item) => (item.product.name === name ? { ...item, quantity } : item)));
  }

  function removeItem(name: string) {
    setItems((current) => current.filter((item) => item.product.name !== name));
  }

  function openQuote(product?: Product) {
    setQuoteProduct(product);
    setSubmitted(false);
    setError("");
    setCartOpen(false);
    setQuoteOpen(true);
  }

  function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!data.get("name") || !data.get("phone") || !data.get("city") || !data.get("requirement")) {
      setError("Please add your name, phone number, delivery city and requirement.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  const requestedItems = quoteProduct ? [{ product: quoteProduct, quantity: 1 }] : items;
  const requirementDefault = requestedItems.length
    ? requestedItems.map((item) => `${item.product.name} — quantity: ${item.quantity} (${item.product.unit})`).join("\n")
    : "";

  const value = { items, itemCount, cartPulse, addItem, setQuantity, removeItem, openCart: () => setCartOpen(true), openQuote };

  return (
    <QuoteContext.Provider value={value}>
      {children}

      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent className="flex w-full flex-col p-0 sm:max-w-md">
          <SheetHeader className="border-b border-border p-6 pr-14 text-left">
            <div className="flex items-center gap-3">
              <span className="cart-mark"><ShoppingCart className="size-5" /></span>
              <div>
                <SheetTitle className="font-display text-xl">Your material list</SheetTitle>
                <SheetDescription>{itemCount ? `${itemCount} item${itemCount === 1 ? "" : "s"} ready for pricing` : "Add materials to build your quote"}</SheetDescription>
              </div>
            </div>
          </SheetHeader>

          {items.length ? (
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="flex-1 space-y-3 overflow-y-auto p-5">
                {items.map(({ product, quantity }) => (
                  <article key={product.name} className="flex gap-3 rounded-xl border border-border bg-card p-3">
                    <img src={product.image} alt="" className="size-16 rounded-lg object-cover" width={64} height={64} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{product.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{product.unit}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex h-8 items-center rounded-full border border-border">
                          <Button type="button" variant="ghost" size="icon" className="size-8" onClick={() => setQuantity(product.name, quantity - 1)} aria-label={`Decrease ${product.name}`}><Minus /></Button>
                          <span className="w-7 text-center text-sm font-semibold">{quantity}</span>
                          <Button type="button" variant="ghost" size="icon" className="size-8" onClick={() => setQuantity(product.name, quantity + 1)} aria-label={`Increase ${product.name}`}><Plus /></Button>
                        </div>
                        <Button type="button" variant="ghost" size="icon" className="size-8 text-destructive" onClick={() => removeItem(product.name)} aria-label={`Remove ${product.name}`}><Trash2 /></Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <div className="border-t border-border bg-muted p-5">
                <p className="text-xs leading-5 text-muted-foreground">Final rates depend on quantity, delivery location, availability and schedule.</p>
                <Button type="button" size="lg" className="mt-4 w-full" onClick={() => openQuote()}>
                  Request quote <ClipboardList />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
              <span className="cart-empty"><ShoppingCart className="size-7" /></span>
              <h3 className="mt-5 font-display text-xl font-semibold">Your list is empty</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Use the Add button on any material to prepare one consolidated quote.</p>
              <Button type="button" variant="outline" className="mt-5" onClick={() => setCartOpen(false)}>Continue browsing</Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={quoteOpen} onOpenChange={setQuoteOpen}>
        <DialogContent className="max-h-[92vh] max-w-2xl overflow-y-auto rounded-2xl p-0">
          {submitted ? (
            <div className="flex min-h-[28rem] flex-col items-center justify-center p-8 text-center">
              <span className="success-mark"><CheckCircle2 className="size-8" /></span>
              <DialogTitle className="mt-5 font-display text-2xl">Quote request ready</DialogTitle>
              <DialogDescription className="mt-2 max-w-md leading-6">
                Thanks. Please call +91 63920 42743 to share this request directly while online sending is being connected.
              </DialogDescription>
              <Button type="button" className="mt-6" onClick={() => setQuoteOpen(false)}>Done</Button>
            </div>
          ) : (
            <>
              <div className="quote-modal-head p-6 pr-14 sm:p-8 sm:pr-14">
                <DialogHeader className="text-left">
                  <span className="badge-gold w-fit">Request for quote</span>
                  <DialogTitle className="mt-3 font-display text-2xl">Get project pricing</DialogTitle>
                  <DialogDescription className="mt-2 leading-6">Share the quantities and site details. Oribrix will prepare a tailored quote.</DialogDescription>
                </DialogHeader>
              </div>
              <form key={`${quoteProduct?.name ?? "general"}-${quoteOpen ? "open" : "closed"}`} onSubmit={submitQuote} className="space-y-5 p-6 pt-0 sm:p-8 sm:pt-0" noValidate>
                {requestedItems.length > 0 && (
                  <div className="rounded-xl border border-border bg-muted p-4">
                    <p className="eyebrow text-muted-foreground">Selected materials</p>
                    <ul className="mt-3 space-y-2">
                      {requestedItems.map((item) => (
                        <li key={item.product.name} className="flex items-center gap-2 text-sm font-medium"><Check className="size-4 text-forest" />{item.product.name} <span className="text-muted-foreground">× {item.quantity}</span></li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="grid gap-4 sm:grid-cols-2">
                  <QuoteField label="Name *" name="name" placeholder="Your full name" />
                  <QuoteField label="Phone *" name="phone" placeholder="+91" type="tel" />
                  <QuoteField label="Company" name="company" placeholder="Company name" />
                  <QuoteField label="Delivery city *" name="city" placeholder="City or site location" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quote-requirement">Materials and quantities *</Label>
                  <Textarea id="quote-requirement" name="requirement" rows={5} defaultValue={requirementDefault} placeholder="Add materials, quantities and preferred delivery date" className="rounded-xl" />
                </div>
                {error && <p role="alert" className="text-sm font-semibold text-destructive">{error}</p>}
                <Button type="submit" size="lg" className="w-full">Submit quote request</Button>
                <p className="text-center text-xs leading-5 text-muted-foreground">This request is not yet sent or stored online.</p>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </QuoteContext.Provider>
  );
}

function QuoteField({ label, name, placeholder, type = "text" }: { label: string; name: string; placeholder: string; type?: string }) {
  return <div className="space-y-2"><Label htmlFor={`quote-${name}`}>{label}</Label><Input id={`quote-${name}`} name={name} type={type} placeholder={placeholder} className="h-11 rounded-xl" /></div>;
}

export function useQuoteCart() {
  const context = useContext(QuoteContext);
  if (!context) throw new Error("useQuoteCart must be used within QuoteCartProvider");
  return context;
}

export function QuoteButton({ children, className, variant = "default", size = "default" }: { children: ReactNode; className?: string; variant?: "default" | "outline" | "secondary" | "ghost" | "hero" | "dark" | "spark"; size?: "default" | "sm" | "lg" | "icon" }) {
  const { openQuote } = useQuoteCart();
  return <Button type="button" variant={variant} size={size} className={className} onClick={() => openQuote()}>{children}</Button>;
}