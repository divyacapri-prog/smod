import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { SearchDialog } from "./SearchDialog";
import smodLogo from "@/assets/smod-logo.png";
import smodLogoWhite from "@/assets/smod-logo-white.png";

const NAV = [
  { to: "/shop", label: "Shop products" },
  { to: "/", label: "Best sellers", hash: "best-sellers" },
  { to: "/our-story", label: "Our story" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const { count } = useCart();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isDark = pathname === "/sports";
  const logoUrl = isDark ? smodLogoWhite : smodLogo;
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const navLinkClass =
    "rounded-full px-3.5 py-2 text-[13.5px] font-semibold transition-colors hover:bg-black/5";

  return (
    <>
      <header
        className="sticky top-0 z-40 backdrop-blur-xl"
        style={{
          background: "color-mix(in oklab, var(--v-bg, #fff) 88%, transparent)",
          borderBottom: "1px solid color-mix(in oklab, var(--v-ink, #000) 8%, transparent)",
        }}
      >
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex items-center justify-between gap-5 py-2.5">
            {/* Logo fills its slot — the source PNG is cropped to the artwork bounds */}
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="flex h-[46px] items-center"
              aria-label="SMOD home"
            >
              <img src={logoUrl} alt="SMOD" className="h-[38px] w-auto md:h-[46px]" />
            </Link>

            <nav className="hidden items-center gap-0.5 md:flex">
              {NAV.map((item) => (
                <Link
                  key={item.label}
                  to={item.to as string}
                  hash={item.hash}
                  className={navLinkClass}
                  style={{ color: "var(--v-ink-soft, #444)" }}
                  activeProps={{
                    style: {
                      color: "var(--v-ink, #000)",
                      background: "color-mix(in oklab, var(--brand, #000) 12%, transparent)",
                    },
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                to="/cart"
                aria-label="Cart"
                className="relative inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-colors hover:bg-black/5"
                style={{
                  borderColor: "color-mix(in oklab, var(--v-ink, #000) 12%, transparent)",
                  color: "var(--v-ink, #111)",
                }}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 6h15l-1.5 9h-12z" />
                  <circle cx="9" cy="20" r="1.5" />
                  <circle cx="18" cy="20" r="1.5" />
                  <path d="M6 6L4 2H1" />
                </svg>
                <span className="hidden sm:inline">Cart</span>
                {count > 0 && (
                  <span
                    className="ml-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-black text-white"
                    style={{ background: "var(--brand, #111)" }}
                  >
                    {count}
                  </span>
                )}
              </Link>

              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center justify-center rounded-full border p-2 md:hidden"
                style={{
                  borderColor: "color-mix(in oklab, var(--v-ink, #000) 12%, transparent)",
                  color: "var(--v-ink, #111)",
                }}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {open ? <path d="M6 6l12 12M18 6L6 18" /> : (
                    <>
                      <path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Search row — sits under the logo bar, as drawn */}
          <div className="pb-2.5">
            <button
              type="button"
              onClick={() => setSearch(true)}
              className="mx-auto flex w-full max-w-[560px] items-center gap-3 rounded-full border px-5 py-2.5 text-left transition-colors"
              style={{
                borderColor: "color-mix(in oklab, var(--v-ink, #000) 12%, transparent)",
                background: "var(--v-surface, #fff)",
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#728198" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.6-3.6" />
              </svg>
              <span className="flex-1 text-[13.5px]" style={{ color: "#9AA3B4" }}>
                Search pods — baby, sports, socks, 40-pack…
              </span>
              <kbd
                className="hidden rounded border px-1.5 py-0.5 text-[10.5px] font-bold sm:inline"
                style={{ borderColor: "color-mix(in oklab, var(--v-ink, #000) 12%, transparent)", color: "var(--v-ink-soft, #728198)" }}
              >
                ⌘K
              </kbd>
            </button>
          </div>
        </div>

        {open && (
          <nav
            className="border-t md:hidden"
            style={{
              borderColor: "color-mix(in oklab, var(--v-ink, #000) 8%, transparent)",
              background: "var(--v-bg, #fff)",
            }}
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-3">
              {NAV.map((item) => (
                <Link
                  key={item.label}
                  to={item.to as string}
                  hash={item.hash}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors hover:bg-black/5"
                  style={{ color: "var(--v-ink, #111)" }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      <SearchDialog open={search} onClose={() => setSearch(false)} />
    </>
  );
}
