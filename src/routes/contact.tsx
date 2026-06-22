import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WavePattern } from "@/components/site/WavePattern";
import { BRAND_PALETTE, paletteToCssVars } from "@/lib/variants";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact SMOD — We'd love to hear from you" },
      { name: "description", content: "Get in touch with the SMOD team for support, partnerships, bulk orders or press enquiries." },
      { property: "og:title", content: "Contact SMOD" },
      { property: "og:description", content: "Support, partnerships and press — reach the SMOD team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div style={{ ...paletteToCssVars(BRAND_PALETTE), background: "var(--v-bg)", color: "var(--v-ink)" }} className="min-h-screen">
      <Header />

      <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, var(--brand) 0%, var(--brand-deep) 100%)` }}>
        <WavePattern edge="bottom" height={140} />
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full" style={{ background: "radial-gradient(circle at 30% 30%, color-mix(in oklab, white 60%, transparent), transparent 60%)" }} />
          <div className="absolute right-10 top-40 h-40 w-40 rounded-full" style={{ background: "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--accent) 70%, transparent), transparent 60%)" }} />
        </div>
        <div className="relative mx-auto max-w-5xl px-5 pt-20 pb-28 text-center text-white md:pt-28">
          <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: "var(--accent)" }}>Get in touch</p>
          <h1 className="mx-auto mt-4 max-w-3xl text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
            Talk to the humans behind the pods.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">
            Questions about a load, a fabric, a subscription, or a wholesale order — we read every message.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-24 md:grid-cols-[1.1fr_1fr]">
        {/* FORM */}
        <div className="rounded-3xl border bg-white p-8 shadow-sm" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
          <h2 className="text-2xl font-black">Send us a note</h2>
          <p className="mt-1 text-sm" style={{ color: "var(--v-ink-soft)" }}>We typically reply within one working day.</p>

          {sent ? (
            <div className="mt-8 rounded-2xl border p-6 text-sm" style={{ borderColor: "rgba(30,91,255,0.3)", background: "#F4F7FF" }}>
              <p className="font-bold" style={{ color: "#0B2E99" }}>Thanks — your message is in.</p>
              <p className="mt-1" style={{ color: "var(--v-ink-soft)" }}>A real person will get back to you shortly at the email you provided.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="mt-6 space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="First name" name="firstName" required />
                <Field label="Last name" name="lastName" required />
              </div>
              <Field label="Email" name="email" type="email" required />
              <Field label="Subject" name="subject" placeholder="Order, partnership, press…" required />
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest" style={{ color: "var(--v-ink)" }}>Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-black"
                  style={{ borderColor: "rgba(0,0,0,0.12)" }}
                  placeholder="Tell us what's on your mind…"
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full bg-black px-6 py-3.5 text-sm font-bold text-white transition-transform hover:scale-[1.01]"
              >
                Send message →
              </button>
            </form>
          )}
        </div>

        {/* CONTACT DETAILS */}
        <div className="space-y-6">
          <InfoCard
            title="Customer support"
            lines={["hello@smod.care", "Mon–Sat · 9am to 7pm IST"]}
            badge="Replies in 24h"
          />
          <InfoCard
            title="Wholesale & partnerships"
            lines={["partners@smod.care", "+91 80 4567 1200"]}
            badge="B2B"
          />
          <InfoCard
            title="Press & media"
            lines={["press@smod.care", "Media kit available on request"]}
            badge="Press"
          />
          <InfoCard
            title="Head office"
            lines={["SMOD Care Pvt. Ltd.", "4th floor, Indiqube Alpha,", "Outer Ring Road, Bengaluru 560103"]}
            badge="Visit"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Field({ label, name, type = "text", required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest" style={{ color: "var(--v-ink)" }}>{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-black"
        style={{ borderColor: "rgba(0,0,0,0.12)" }}
      />
    </div>
  );
}

function InfoCard({ title, lines, badge }: { title: string; lines: string[]; badge?: string }) {
  return (
    <div className="rounded-3xl border bg-white p-6" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-black">{title}</h3>
        {badge && (
          <span className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest" style={{ background: "#F0F0EA", color: "#0A0A0A" }}>{badge}</span>
        )}
      </div>
      <div className="mt-3 space-y-1 text-sm" style={{ color: "var(--v-ink-soft)" }}>
        {lines.map((l) => <p key={l}>{l}</p>)}
      </div>
    </div>
  );
}
