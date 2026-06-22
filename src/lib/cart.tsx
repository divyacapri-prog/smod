import { createContext, useContext, useEffect, useState, ReactNode, useMemo, useCallback } from "react";
import { ALL_SKUS } from "@/lib/variants";

export type CartItem = {
  sku: string;
  qty: number;
};

export type CartLine = CartItem & {
  name: string;
  variantSlug: string;
  variantName: string;
  size: number;
  price: number;
  imageUrl?: string;
  buyPath: string;
};

type CartCtx = {
  items: CartItem[];
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (sku: string, qty?: number) => void;
  setQty: (sku: string, qty: number) => void;
  remove: (sku: string) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "smod.cart.v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const add = useCallback((sku: string, qty = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.sku === sku);
      if (i === -1) return [...prev, { sku, qty }];
      const next = [...prev];
      next[i] = { ...next[i], qty: next[i].qty + qty };
      return next;
    });
  }, []);

  const setQty = useCallback((sku: string, qty: number) => {
    setItems((prev) =>
      qty <= 0 ? prev.filter((x) => x.sku !== sku) : prev.map((x) => (x.sku === sku ? { ...x, qty } : x))
    );
  }, []);

  const remove = useCallback((sku: string) => {
    setItems((prev) => prev.filter((x) => x.sku !== sku));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const lines: CartLine[] = useMemo(() => {
    return items
      .map((it) => {
        const p = ALL_SKUS.find((x) => x.sku === it.sku);
        if (!p) return null;
        return {
          ...it,
          name: `${p.variant.name} · ${p.size} Pods`,
          variantSlug: p.variant.slug,
          variantName: p.variant.name,
          size: p.size,
          price: p.price,
          imageUrl: p.variant.packaging.imageUrl,
          buyPath: p.buyPath,
        } as CartLine;
      })
      .filter(Boolean) as CartLine[];
  }, [items]);

  const count = lines.reduce((s, l) => s + l.qty, 0);
  const subtotal = lines.reduce((s, l) => s + l.qty * l.price, 0);

  return (
    <Ctx.Provider value={{ items, lines, count, subtotal, add, setQty, remove, clear }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}
