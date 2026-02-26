"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/config/site";
import { QuoteModal } from "@/components/QuoteModal"; // ✅ MISMO MODAL

export function Navbar() {
  const [openQuote, setOpenQuote] = useState(false); // ✅ estado del modal

  return (
    <>
      <header className="fixed top-0 z-50 w-full">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 px-5 py-3 backdrop-blur">
            
            {/* Logo */}
            <Link href="#inicio" className="flex items-center">
              {/* ✅ Slot fijo: NO mueve nada */}
              <div className="relative h-10 w-10 overflow-visible">
                <Image
                  src="/images/logo2.png"
                  alt="Monster Van"
                  fill
                  priority
                  className="object-contain origin-left scale-[2.4]"
                />
              </div>
            </Link>

            {/* Links */}
            <nav className="hidden items-center gap-8 text-sm text-white/80 md:flex">
              {site.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="transition hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* ✅ CTA → ahora es BOTÓN y abre el modal */}
            <button
              type="button"
              onClick={() => setOpenQuote(true)}
              className="rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
            >
              {site.cta.label}
            </button>
          </div>
        </div>
      </header>

      {/* ✅ MODAL GLOBAL DE LA NAVBAR */}
      <QuoteModal
        open={openQuote}
        onClose={() => setOpenQuote(false)}
        whatsappPhoneE164NoPlus="524691138533"
      />
    </>
  );
}