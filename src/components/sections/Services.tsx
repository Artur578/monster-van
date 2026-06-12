"use client";

import { Clock, MapPin, Radar, Shield, Box, Headset } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { useSiteContent } from "@/hooks/useSiteContent";

const defaultServices = [
  {
    title: "Cumplimiento de Tiempos",
    description:
      "Respondemos a las exigencias de entregas puntuales o urgentes con máxima eficiencia.",
    image: "/images/time.png",
  },
  {
    title: "Cobertura Geográfica",
    description:
      "Facilitamos la distribución en la república mexicana de acuerdo a las necesidades del cliente (aplica algunas restricciones).",
    image: "/images/g.png",
  },
  {
    title: "Monitoreo en Tiempo Real",
    description:
      "Seguimiento GPS activo en toda la flotilla para la tranquilidad de nuestros clientes.",
    image: "/images/gps.png",
  },
  {
    title: "Seguridad Garantizada",
    description:
      "Equipos de seguridad completos: alarma de reversa, torreta, slings y gatos en cada unidad.",
    image: "/images/s.png",
  },
  {
    title: "Carga Especializada",
    description:
      "Unidades de 1.3 toneladas y plataformas hasta 3.5 toneladas para diversas necesidades.",
    image: "/images/a.png",
  },
  {
    title: "Atención Personalizada",
    description:
      "Soluciones a la medida con un equipo profesional altamente capacitado a tu servicio.",
    image: "/images/c.png",
  },
];

const serviceVisuals = [
  {
    icon: Clock,
    accent: "bg-blue-600",
  },
  {
    icon: MapPin,
    accent: "bg-red-600",
  },
  {
    icon: Radar,
    accent: "bg-blue-600",
  },
  {
    icon: Shield,
    accent: "bg-red-600",
  },
  {
    icon: Box,
    accent: "bg-blue-600",
  },
  {
    icon: Headset,
    accent: "bg-red-600",
  },
];

export function Services() {
  const { content } = useSiteContent();

  const editableServices =
    content.services.items && content.services.items.length >= 6
      ? content.services.items
      : defaultServices;

  const eyebrow =
    content.services.eyebrow && content.services.eyebrow !== "SERVICIOS"
      ? content.services.eyebrow
      : "NUESTROS SERVICIOS";

  const title =
    content.services.title &&
    content.services.title !== "Soluciones de transporte para tu operación"
      ? content.services.title
      : "Lo que ofrecemos";

  const description =
    content.services.description &&
    content.services.description !==
      "Movemos tu mercancía con unidades adecuadas, atención personalizada y cobertura nacional."
      ? content.services.description
      : "Soluciones integrales de transporte diseñadas para impulsar tu negocio.";

  return (
    <section id="servicios" className="relative overflow-hidden bg-slate-950">
      {/* Fondo suave para que NO “corte” con lo oscuro */}
      <div className="pointer-events-none absolute inset-0">
        {/* degradado principal (oscuro a gris-azulado) */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

        {/* capa clara controlada */}
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_0%,rgba(148,163,184,0.16)_0%,rgba(2,6,23,0)_65%)]" />

        {/* glow decorativo */}
        <div className="absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-20">
        <Reveal>
          <div className="text-center">
            <div className="text-xs font-semibold tracking-[0.25em] text-blue-300/80">
              {eyebrow}
            </div>

            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              {title}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              {description}
            </p>

            <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-red-600" />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {editableServices.map((service, i) => {
            const visual = serviceVisuals[i] ?? serviceVisuals[0];
            const Icon = visual.icon;

            return (
              <Reveal key={`${service.title}-${i}`} delayMs={i * 80}>
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
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />

                    {/* overlay para que la imagen no “brinque” demasiado */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent" />

                    {/* ícono arriba derecha como ya lo tienes */}
                    <div className="absolute right-4 top-4">
                      <div
                        className={[
                          "grid h-12 w-12 place-items-center rounded-2xl text-white shadow-lg",
                          visual.accent,
                        ].join(" ")}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white">
                      {service.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      {service.description}
                    </p>

                    <div className="mt-5 h-[2px] w-16 rounded-full bg-white/10 transition group-hover:w-24 group-hover:bg-red-500/80" />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}