"use client";

import Image from "next/image";
import { Clock, MapPin, Radar, Shield, Box, Headset } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const services = [
  {
    title: "Cumplimiento de Tiempos",
    desc: "Respondemos a las exigencias de entregas puntuales o urgentes con máxima eficiencia.",
    icon: Clock,
    image: "/images/time.png",
    accent: "bg-blue-600",
  },
  {
    title: "Cobertura Geográfica",
    desc: "Facilitamos la distribución en la república mexicana de acuerdo a las necesidades del cliente.",
    icon: MapPin,
    image: "/images/g.png",
    accent: "bg-red-600",
  },
  {
    title: "Monitoreo en Tiempo Real",
    desc: "Seguimiento GPS activo en toda la flotilla para la tranquilidad de nuestros clientes.",
    icon: Radar,
    image: "/images/gps.png",
    accent: "bg-blue-600",
  },
  {
    title: "Seguridad Garantizada",
    desc: "Equipos de seguridad completos: alarma de reversa, torreta, slings y gatos en cada unidad.",
    icon: Shield,
    image: "/images/s.png",
    accent: "bg-red-600",
  },
  {
    title: "Carga Especializada",
    desc: "Unidades de 1.3 toneladas y plataformas hasta 3.5 toneladas para diversas necesidades.",
    icon: Box,
    image: "/images/a.png",
    accent: "bg-blue-600",
  },
  {
    title: "Atención Personalizada",
    desc: "Soluciones a la medida con un equipo profesional altamente capacitado a tu servicio.",
    icon: Headset,
    image: "/images/c.png",
    accent: "bg-red-600",
  },
];

export function Services() {
  return (
    <section id="servicios" className="relative overflow-hidden bg-slate-950">
      {/* Fondo suave para que NO “corte” con lo oscuro */}
      <div className="pointer-events-none absolute inset-0">
        {/* degradado principal (oscuro a gris-azulado) */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
        {/* capa clara controlada (simula “sección más clara” sin llegar a blanco) */}
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_0%,rgba(148,163,184,0.16)_0%,rgba(2,6,23,0)_65%)]" />
        {/* glow decorativo */}
        <div className="absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-20">
        <Reveal>
          <div className="text-center">
            <div className="text-xs font-semibold tracking-[0.25em] text-blue-300/80">
              NUESTROS SERVICIOS
            </div>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Lo que ofrecemos
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              Soluciones integrales de transporte diseñadas para impulsar tu negocio.
            </p>

            <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-red-600" />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delayMs={i * 80}>
              <article
                className={[
                  "group overflow-hidden rounded-3xl",
                  "border border-white/10",
                  "bg-white/[0.06] backdrop-blur",
                  "shadow-[0_16px_60px_rgba(0,0,0,0.35)]",
                  "transition hover:-translate-y-1 hover:border-white/15",
                ].join(" ")}
              >
                <div className="relative h-44 w-full">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  {/* overlay para que la imagen no “brinque” demasiado */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent" />

                  {/* ícono arriba derecha como ya lo tienes */}
                  <div className="absolute right-4 top-4">
                    <div
                      className={[
                        "grid h-12 w-12 place-items-center rounded-2xl text-white shadow-lg",
                        s.accent,
                      ].join(" ")}
                    >
                      <s.icon className="h-6 w-6" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {s.desc}
                  </p>

                  <div className="mt-5 h-[2px] w-16 rounded-full bg-white/10 transition group-hover:w-24 group-hover:bg-red-500/80" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}