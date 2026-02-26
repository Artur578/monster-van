"use client";

import type React from "react";
import { useMemo, useState } from "react";
import Image from "next/image";
import { Eye, Target, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ProgressBar } from "@/components/ui/ProgressBar";

type TabKey = "mision" | "vision";

export function Essence() {
  const [tab, setTab] = useState<TabKey>("mision");

  const content = useMemo(() => {
    if (tab === "mision") {
      return {
        kicker: "Nuestra esencia",
        title: "Comprometidos con cada entrega",
        iconBg: "bg-blue-600",
        Icon: Target,
        bullets: [
          "Transporte seguro, puntual y eficiente",
          "Soluciones personalizadas para cada cliente",
          "Tecnología innovadora al servicio de tu negocio",
          "Equipo profesional altamente capacitado",
          "Responsabilidad y sostenibilidad en cada ruta",
        ],
        quote: "No solo transportamos mercancía, transportamos confianza.",
        image: "/images/essence-mission.jpg",
        bars: [
          { label: "Confiabilidad", value: 98 },
          { label: "Puntualidad", value: 95 },
          { label: "Satisfacción del cliente", value: 97 },
        ],
      };
    }

    return {
      kicker: "Nuestra esencia",
      title: "Líderes en logística del futuro",
      iconBg: "bg-red-600",
      Icon: Eye,
      bullets: [
        "Empresa líder en transporte y logística nacional",
        "Eficiencia y confiabilidad como pilares",
        "Soluciones innovadoras y sostenibles",
        "Adaptados a las necesidades del mercado",
        "Crecimiento compartido con nuestros clientes",
      ],
      quote: "Aspiramos a ser el motor logístico de México.",
      image: "/images/v2.png",
      bars: [
        { label: "Confiabilidad", value: 98 },
        { label: "Puntualidad", value: 95 },
        { label: "Satisfacción del cliente", value: 97 },
      ],
    };
  }, [tab]);

  const ActiveIcon = content.Icon;

  return (
    <section id="nosotros" className="bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-24">
        <Reveal>
          <div className="text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Nuestra esencia
            </h2>
            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-red-600" />
          </div>
        </Reveal>

        {/* Toggle */}
        <Reveal delayMs={120}>
          <div className="mt-10 flex justify-center">
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur">
              <TabButton
                active={tab === "mision"}
                onClick={() => setTab("mision")}
                icon={<Target className="h-4 w-4" />}
                label="Misión"
                activeStyle="bg-blue-600 text-white"
              />
              <TabButton
                active={tab === "vision"}
                onClick={() => setTab("vision")}
                icon={<Eye className="h-4 w-4" />}
                label="Visión"
                activeStyle="bg-red-600 text-white"
              />
            </div>
          </div>
        </Reveal>

        {/* Content grid */}
        <div className="mt-14 grid gap-10 md:grid-cols-2 md:items-center">
          {/* Left image card */}
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={content.image}
                  alt={tab === "mision" ? "Misión" : "Visión"}
                  fill
                  className="object-cover opacity-95"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/70 via-transparent to-slate-950/25" />

                {/* ✅ ICONO EN LA ESQUINA (como tu imagen 1) */}
                <div className="absolute right-5 top-5 z-10">
                  <div
                    className={[
                      "grid h-16 w-16 place-items-center rounded-2xl text-white shadow-xl",
                      "border border-white/10 backdrop-blur",
                      content.iconBg,
                      "animate-[float_7s_ease-in-out_infinite]",
                    ].join(" ")}
                  >
                    <ActiveIcon className="h-7 w-7" />
                  </div>
                </div>
              </div>

              {/* ✅ QUOTE MÁS GRANDE / MEJOR FORMATO (como imagen 1) */}
              <div className="absolute bottom-5 left-5 right-5">
                <div className="rounded-2xl border border-white/10 bg-slate-950/55 px-5 py-4 text-center text-base font-semibold italic tracking-wide text-white/90 backdrop-blur md:text-lg">
                  “{content.quote}”
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right content */}
          <Reveal delayMs={80}>
            <div className="relative">
              {/* ❌ Quitamos el ícono flotante del lado derecho (esto causaba el desfase) */}

              <p className="text-xs tracking-[0.22em] text-white/60">
                {content.kicker.toUpperCase()}
              </p>

              <h3 className="mt-3 text-3xl font-extrabold text-white md:text-4xl">
                {content.title}
              </h3>

              <ul className="mt-6 space-y-4">
                {content.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-white/80">
                    <span className="mt-0.5 text-white/70">
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 space-y-5">
                {content.bars.map((bar) => (
                  <ProgressBar key={bar.label} label={bar.label} value={bar.value} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Keyframes por si no los tienes globales */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
      `}</style>
    </section>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
  activeStyle,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  activeStyle: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition",
        active ? activeStyle : "text-white/60 hover:text-white bg-transparent",
      ].join(" ")}
    >
      {icon}
      {label}
    </button>
  );
}