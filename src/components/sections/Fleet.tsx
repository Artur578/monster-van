"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import { QuoteModal } from "../QuoteModal";

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

/* =========================
   1) EPP (PERSONAL)
========================= */
type EppKey =
  | "casco"
  | "chaleco"
  | "lentes"
  | "guantes"
  | "botas"
  | "tapones"
  | "mangas";

const EPP: Record<
  EppKey,
  { title: string; desc: string; dot: { x: number; y: number } }
> = {
  casco: {
    title: "Casco",
    desc: "Protección contra impactos y caída de objetos.",
    dot: { x: 49, y: 12 },
  },
  chaleco: {
    title: "Chaleco",
    desc: "Alta visibilidad y seguridad en zona operativa.",
    dot: { x: 65.89, y: 33.13 },
  },
  lentes: {
    title: "Lentes",
    desc: "Protección ocular contra polvo y partículas.",
    dot: { x: 35.4, y: 17.05 },
  },
  guantes: {
    title: "Guantes",
    desc: "Agarre y protección contra abrasión/cortes leves.",
    dot: { x: 88.88, y: 51.7 },
  },
  botas: {
    title: "Botas",
    desc: "Punta reforzada y suela antiderrapante industrial.",
    dot: { x: 67.13, y: 84.91 },
  },
  tapones: {
    title: "Tapones",
    desc: "Reducción de exposición a ruido prolongado.",
    dot: { x: 64, y: 18.5 },
  },
  mangas: {
    title: "Mangas",
    desc: "Protección adicional para brazos en maniobras.",
    dot: { x: 13, y: 43.13 },
  },
};

/* =========================
   2) SEGURIDAD (VEHÍCULO)
========================= */
type SafetyKey = "reversa" | "torreta" | "eslingas" | "gatos";

const SAFETY: Record<
  SafetyKey,
  { title: string; desc: string; dot: { x: number; y: number } }
> = {
  reversa: {
    title: "Alarma de reversa",
    desc: "Alerta sonora para maniobras en patios y zonas de carga.",
    dot: { x: 95.6, y: 49.6 },
  },
  torreta: {
    title: "Torreta",
    desc: "Señalización visible para operación segura y maniobras.",
    dot: { x: 39.93, y: 24.2 },
  },
  eslingas: {
    title: "Eslingas",
    desc: "Aseguramiento de carga para evitar movimientos durante el traslado.",
    dot: { x: 73.48, y: 48.39 },
  },
  gatos: {
    title: "Gatos",
    desc: "Herramientas para soporte/levantamiento en eventualidades.",
    dot: { x: 71.52, y: 65.26 },
  },
};

export function Fleet() {
  const [activeEpp, setActiveEpp] = useState<EppKey>("lentes");
  const [activeSafety, setActiveSafety] = useState<SafetyKey>("torreta");

  const eppList = useMemo(
    () => (Object.keys(EPP) as EppKey[]).map((k) => ({ key: k, ...EPP[k] })),
    []
  );

  const safetyList = useMemo(
    () =>
      (Object.keys(SAFETY) as SafetyKey[]).map((k) => ({ key: k, ...SAFETY[k] })),
    []
  );

  return (
    <section id="flotilla" className="bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-16">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs tracking-[0.28em] text-blue-300/80">
            NUESTRA FLOTILLA
          </p>
          <h2 className="mt-3 text-4xl font-extrabold text-white md:text-5xl">
            Flotilla Vehicular
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Unidades modernas equipadas con estándares de seguridad y operación
            profesional para entregas confiables.
          </p>
          <div className="mx-auto mt-6 h-[3px] w-14 rounded-full bg-gradient-to-r from-red-500/80 via-blue-500/70 to-red-500/80" />
        </div>

        {/* Grid (3 cards) */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {/* =========================
              CARD 1: CAADY + PLATAFORMA
          ========================= */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_16px_60px_rgba(0,0,0,0.35)]">
            {/* Glow */}
            <div className="pointer-events-none absolute -top-24 left-8 h-44 w-44 rounded-full bg-red-500/15 blur-3xl" />

            <VehicleBlock
              title="Caady — 1.3 Toneladas"
              tag="Urbano"
              subtitle="Ideal para zona urbana y paquetería mediana."
              imageSrc="/images/caady1.3.webp"
              bullets={[
                "Entregas rápidas y maniobra ágil",
                "Carga segura y puntual",
                "Seguimiento y comunicación",
              ]}
            />

            <div className="my-6 h-px w-full bg-white/10" />

            <VehicleBlock
              title="Plataforma — 3.5 Toneladas"
              tag="Regional"
              subtitle="Mayor capacidad para cargas pesadas y rutas regionales."
              imageSrc="/images/plataforma.webp"
              bullets={[
                "Mayor capacidad por viaje",
                "Operación programada y urgente",
                "Cobertura regional y nacional",
              ]}
            />
          </div>

          {/* =========================
              CARD 2: Seguridad del vehículo
          ========================= */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_16px_60px_rgba(0,0,0,0.35)]">
            {/* Glow */}
            <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs tracking-[0.22em] text-white/60">
                  SEGURIDAD
                </p>
                <h3 className="mt-2 text-xl font-extrabold text-white">
                  Equipo de seguridad
                </h3>
              </div>

              <div className="rounded-2xl bg-white/5 px-3 py-2 text-xs font-semibold text-white/70">
                Vehículo
              </div>
            </div>

            <p className="mt-3 text-sm text-white/70">
              Los vehículos cuentan con equipo requerido. Selecciona un elemento
              para ver detalle.
            </p>

            <div className="mt-6">
              {/* Imagen FULL WIDTH + hotspots */}
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />

                {/* Ajusta alturas aquí si quieres el camión más grande */}
                <div className="relative h-[280px] w-full sm:h-[320px]">
                  <Image
                    src="/images/result.png"
                    alt="Vehículo y equipo de seguridad"
                    fill
                    priority
                    className="object-contain"
                  />

                  {/* Hotspots */}
                  {(Object.keys(SAFETY) as SafetyKey[]).map((k) => {
                    const d = SAFETY[k].dot;
                    const isActive = k === activeSafety;
                    return (
                      <button
                        key={k}
                        type="button"
                        onClick={() => setActiveSafety(k)}
                        className={cn(
                          "group absolute -translate-x-1/2 -translate-y-1/2 rounded-full",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/80"
                        )}
                        style={{ left: `${d.x}%`, top: `${d.y}%` }}
                        aria-label={SAFETY[k].title}
                      >
                        <span
                          className={cn(
                            "absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[1px]",
                            isActive
                              ? "bg-red-500/18 opacity-100"
                              : "bg-white/10 opacity-60"
                          )}
                        />
                        <span
                          className={cn(
                            "relative block h-3.5 w-3.5 rounded-full shadow-[0_6px_20px_rgba(0,0,0,0.6)]",
                            isActive ? "bg-red-500" : "bg-white/75"
                          )}
                        />
                        {isActive && (
                          <span className="absolute inset-0 rounded-full animate-ping bg-red-500/25" />
                        )}

                        <span
                          className={cn(
                            "pointer-events-none absolute left-1/2 top-full z-10 mt-3 w-max -translate-x-1/2",
                            "rounded-xl border border-white/10 bg-slate-950/90 px-3 py-2 text-xs font-semibold text-white/90 shadow-xl",
                            "opacity-0 translate-y-1 transition-all duration-200",
                            "group-hover:opacity-100 group-hover:translate-y-0"
                          )}
                        >
                          {SAFETY[k].title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Botones ABAJO */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                {safetyList.map((item) => {
                  const isActive = item.key === activeSafety;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setActiveSafety(item.key)}
                      className={cn(
                        "rounded-2xl border px-3 py-2 text-left text-sm transition",
                        isActive
                          ? "border-red-400/40 bg-red-500/15 text-white"
                          : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                      )}
                    >
                      <div className="font-semibold">{item.title}</div>
                    </button>
                  );
                })}
              </div>

              {/* Detalle ABAJO */}
              <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-sm font-extrabold text-white">
                  {SAFETY[activeSafety].title}
                </div>
                <p className="mt-1 text-sm text-white/70">
                  {SAFETY[activeSafety].desc}
                </p>
                <div className="mt-3 h-[2px] w-14 rounded-full bg-gradient-to-r from-red-500/70 via-blue-500/60 to-red-500/70" />
              </div>
            </div>
          </div>

          {/* =========================
              CARD 3: EPP (con el mono)
          ========================= */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_16px_60px_rgba(0,0,0,0.35)]">
            {/* Glow */}
            <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs tracking-[0.22em] text-white/60">
                  SEGURIDAD
                </p>
                <h3 className="mt-2 text-xl font-extrabold text-white">
                  Equipo EPP completo
                </h3>
              </div>

              <div className="rounded-2xl bg-white/5 px-3 py-2 text-xs font-semibold text-white/70">
                Operación segura
              </div>
            </div>

            <p className="mt-3 text-sm text-white/70">
              El personal cuenta con EPP requerido. Selecciona un elemento para
              ver detalle.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-[1.25fr_1fr]">
              {/* Imagen + hotspots */}
              <div className="relative mx-auto w-full max-w-[420px] md:max-w-[480px]">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />

                  <div className="relative h-[520px] w-full sm:h-[560px]">
                    {/* recorte/zoom */}
                    <div className="absolute inset-0 overflow-hidden">
                      <Image
                        src="/images/epp-worker.webp"
                        alt="Personal con EPP"
                        fill
                        priority
                        className="object-cover"
                        style={{
                          objectPosition: "50% 35%",
                          transform: "scale(1.25)",
                        }}
                      />
                    </div>

                    {/* Hotspots */}
                    {(Object.keys(EPP) as EppKey[]).map((k) => {
                      const d = EPP[k].dot;
                      const isActive = k === activeEpp;
                      return (
                        <button
                          key={k}
                          type="button"
                          onClick={() => setActiveEpp(k)}
                          className={cn(
                            "group absolute -translate-x-1/2 -translate-y-1/2 rounded-full",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/80"
                          )}
                          style={{ left: `${d.x}%`, top: `${d.y}%` }}
                          aria-label={EPP[k].title}
                        >
                          <span
                            className={cn(
                              "absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[1px]",
                              isActive
                                ? "bg-blue-500/18 opacity-100"
                                : "bg-white/10 opacity-60"
                            )}
                          />
                          <span
                            className={cn(
                              "relative block h-3.5 w-3.5 rounded-full shadow-[0_6px_20px_rgba(0,0,0,0.6)]",
                              isActive ? "bg-blue-400" : "bg-white/75"
                            )}
                          />
                          {isActive && (
                            <span className="absolute inset-0 rounded-full animate-ping bg-blue-500/25" />
                          )}
                          <span
                            className={cn(
                              "pointer-events-none absolute left-1/2 top-full z-10 mt-3 w-max -translate-x-1/2",
                              "rounded-xl border border-white/10 bg-slate-950/90 px-3 py-2 text-xs font-semibold text-white/90 shadow-xl",
                              "opacity-0 translate-y-1 transition-all duration-200",
                              "group-hover:opacity-100 group-hover:translate-y-0"
                            )}
                          >
                            {EPP[k].title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* botones + detalle */}
              <div>
                <div className="grid grid-cols-2 gap-2">
                  {eppList.map((item) => {
                    const isActive = item.key === activeEpp;
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setActiveEpp(item.key)}
                        className={cn(
                          "rounded-2xl border px-3 py-2 text-left text-sm transition",
                          isActive
                            ? "border-blue-400/40 bg-blue-500/15 text-white"
                            : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                        )}
                      >
                        <div className="font-semibold">{item.title}</div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-sm font-extrabold text-white">
                    {EPP[activeEpp].title}
                  </div>
                  <p className="mt-1 text-sm text-white/70">{EPP[activeEpp].desc}</p>
                  <div className="mt-3 h-[2px] w-14 rounded-full bg-gradient-to-r from-red-500/70 via-blue-500/60 to-red-500/70" />
                </div>

                
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <FleetCTAButtons />
      </div>
    </section>
  );
}

export function FleetCTAButtons() {
  const [openQuote, setOpenQuote] = useState(false);

  return (
    <>
      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        {/* BOTÓN COTIZAR → abre WhatsApp con formulario */}
        <button
          type="button"
          onClick={() => setOpenQuote(true)}
          className="rounded-full bg-red-600 px-6 py-3 text-sm font-extrabold text-white shadow-[0_10px_30px_rgba(239,68,68,0.30)] transition hover:bg-red-500"
        >
          Solicitar Cotización →
        </button>

        {/* BOTÓN NORMAL */}
        <a
          href="#servicios"
          className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10"
        >
          Ver Servicios
        </a>
      </div>

      {/* MODAL reutilizado */}
      <QuoteModal
        open={openQuote}
        onClose={() => setOpenQuote(false)}
        whatsappPhoneE164NoPlus="524691138533"
      />
    </>
  );
}

/* =========================================
   BLOQUE REUTILIZABLE: un vehículo
========================================= */
function VehicleBlock({
  title,
  tag,
  subtitle,
  imageSrc,
  bullets,
}: {
  title: string;
  tag: string;
  subtitle: string;
  imageSrc: string;
  bullets: string[];
}) {
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-white">{title}</h3>
          <p className="mt-2 text-sm text-white/70">{subtitle}</p>
        </div>

        <div className="shrink-0 rounded-2xl bg-white/5 px-3 py-2 text-xs font-semibold text-white/70">
          {tag}
        </div>
      </div>

      {/* Imagen (FULL) */}
      <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5">
        {/* Ajusta alturas aquí si quieres más grande */}
        <div className="relative h-40 w-full sm:h-44">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            style={{ objectPosition: "50% 55%" }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        </div>
      </div>

      {/* Bullets */}
      <ul className="mt-5 space-y-2 text-sm text-white/75">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-400/70" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}