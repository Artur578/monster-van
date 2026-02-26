"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, Clock, Box } from "lucide-react";
import { QuoteModal } from "@/components/QuoteModal";

export function Hero() {
  const [openQuote, setOpenQuote] = useState(false);

  return (
    <section id="inicio" className="relative min-h-[92vh] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero1-bg.jpg"
          alt="Almacén y logística"
          fill
          priority
          className="object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-slate-950/70" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-slate-950/20" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-20 pt-32 md:flex-row md:items-center">
        {/* Left */}
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            Transporte y logística nacional
          </div>

          <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-white md:text-6xl">
            Tu mejor socio <span className="text-blue-400">en logística</span> y
            transporte
          </h1>

          <p className="mt-5 text-base leading-relaxed text-white/75 md:text-lg">
            Transportamos más que tus mercancías, te entregamos tranquilidad.
            Carga segura, puntual y eficiente en toda la república.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            {/* ✅ Cotizar → abre modal */}
            <button
              type="button"
              onClick={() => setOpenQuote(true)}
              className="rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-500"
            >
              Solicitar Cotización →
            </button>

            <a
              href="#servicios"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              Conocer Servicios
            </a>
          </div>
        </div>

        {/* Right */}
        <div className="relative flex-1">
          {/* IMPORTANTE: overflow-visible para que los badges sobresalgan */}
          <div className="relative mx-auto max-w-xl overflow-visible">
            {/* Card animado */}
            <div className="animate-float">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="/images/truck.jpg"
                    alt="Unidad Monster Van"
                    width={1100}
                    height={700}
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </div>

            {/* Badges */}
            <Badge
              icon={<Box className="h-5 w-5" />}
              title="3.5t"
              subtitle="Carga segura"
              className="absolute -left-4 -top-4 md:-left-6 md:-top-6"
            />

            <Badge
              icon={<MapPin className="h-5 w-5" />}
              title="Nacional"
              subtitle="Cobertura"
              className="absolute -left-2 bottom-4 md:-left-4 md:bottom-6"
            />

            <Badge
              icon={<Clock className="h-5 w-5" />}
              title="24/7"
              subtitle="Servicio"
              className="absolute -right-2 bottom-6 md:-right-4 md:bottom-10"
            />
          </div>
        </div>
      </div>

      {/* Bottom stats */}
      <div className="relative mx-auto max-w-6xl px-4 pb-10">
        <div className="grid gap-6 border-t border-white/10 pt-8 md:grid-cols-4">
          <Stat value="3.5t" label="Capacidad máx." />
          <Stat value="24/7" label="Disponibilidad" />
          <Stat value="100+" label="Entregas/mes" />
          <Stat value="GPS" label="Rastreo en vivo" />
        </div>
      </div>

      {/* ✅ Modal (reutilizable) */}
      <QuoteModal
        open={openQuote}
        onClose={() => setOpenQuote(false)}
        whatsappPhoneE164NoPlus="524691138533"
      />

      {/* Keyframes (sin tocar tailwind config) */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 7s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>
    </section>
  );
}

function Badge({
  icon,
  title,
  subtitle,
  className = "",
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  className?: string;
}) {
  return (
    <div
      className={
        "flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 text-white shadow-lg backdrop-blur " +
        className
      }
    >
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600/90 text-white">
        {icon}
      </span>
      <div className="leading-tight">
        <div className="text-base font-semibold">{title}</div>
        <div className="text-xs text-white/70">{subtitle}</div>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-3xl font-bold text-white">{value}</div>
      <div className="mt-1 text-sm text-white/60">{label}</div>
    </div>
  );
}