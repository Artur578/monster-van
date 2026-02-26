"use client";

import { useState } from "react";
import { QuoteModal } from "@/components/QuoteModal";

export function CTASection() {
  const [openQuote, setOpenQuote] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950">
        {/* Separador superior sutil */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />

        {/* Glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-28 right-10 h-72 w-72 rounded-full bg-red-500/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_60%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-20">
          {/* Panel */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-[0_16px_60px_rgba(0,0,0,0.35)] backdrop-blur">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />

            <h3 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              ¿Listo para mover tu mercancía?
            </h3>

            <p className="mx-auto mt-4 max-w-2xl text-base text-white/75 md:text-lg">
              Únete a los clientes que ya confían en Monster Van para sus
              operaciones logísticas.
            </p>

            {/* ✅ BOTÓN QUE ABRE EL MODAL */}
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setOpenQuote(true)}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-red-600 px-8 py-4 text-base font-extrabold text-white shadow-[0_18px_60px_rgba(239,68,68,0.30)] transition hover:bg-red-500 hover:scale-[1.02]"
              >
                Solicitar Cotización
                <span className="text-xl leading-none">→</span>
              </button>
            </div>

            <div className="mx-auto mt-8 h-[2px] w-20 rounded-full bg-gradient-to-r from-blue-500/60 via-red-500/70 to-blue-500/60" />
          </div>
        </div>
      </section>

      {/* ✅ MODAL REUTILIZADO */}
      <QuoteModal
        open={openQuote}
        onClose={() => setOpenQuote(false)}
        whatsappPhoneE164NoPlus="524691138533" // tu número de prueba
      />
    </>
  );
}