"use client";

import Link from "next/link";
import { useState } from "react";
import { QuoteModal } from "@/components/QuoteModal";
import { useSiteContent } from "@/hooks/useSiteContent";

export function Navbar() {
  const [openQuote, setOpenQuote] = useState(false);
  const { content } = useSiteContent();

  const whatsapp = content.general.whatsapp.replace(/\D/g, "");

  const navItems = [
    { label: content.nav.inicio, href: "#inicio" },
    { label: content.nav.nosotros, href: "#nosotros" },
    { label: content.nav.servicios, href: "#servicios" },
    { label: content.nav.flotilla, href: "#flotilla" },
    { label: content.nav.contacto, href: "#footer" },
  ];

  return (
    <>
      <header className="fixed top-0 z-50 w-full">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 px-5 py-3 backdrop-blur">
            <Link href="#inicio" className="flex items-center">
              <div className="relative h-10 w-10 overflow-visible">
                <img
                  src={content.general.logo}
                  alt={content.general.companyName}
                  className="h-10 w-10 origin-left scale-[2.4] object-contain"
                />
              </div>
            </Link>

            <nav className="hidden items-center gap-8 text-sm text-white/80 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="transition hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <button
              type="button"
              onClick={() => setOpenQuote(true)}
              className="rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
            >
              {content.nav.cotizar}
            </button>
          </div>
        </div>
      </header>

      <QuoteModal
        open={openQuote}
        onClose={() => setOpenQuote(false)}
        whatsappPhoneE164NoPlus={whatsapp}
      />
    </>
  );
}