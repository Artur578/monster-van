"use client";

import React, { useEffect, useState } from "react";
import { MapPin, Clock, Box, Megaphone } from "lucide-react";
import { QuoteModal } from "@/components/QuoteModal";
import { useSiteContent } from "@/hooks/useSiteContent";

type HeroSlide = {
  type: "hero" | "promo";
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  backgroundImage: string;
  mainImage: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  badgeOneTitle: string;
  badgeOneSubtitle: string;
  badgeTwoTitle: string;
  badgeTwoSubtitle: string;
  badgeThreeTitle: string;
  badgeThreeSubtitle: string;
};

export function Hero() {
  const [openQuote, setOpenQuote] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const { content } = useSiteContent();

  const whatsapp = content.general.whatsapp.replace(/\D/g, "");
  const promoEnabled = content.promo.enabled;

  const slides: HeroSlide[] = [
    {
      type: "hero",
      badge: content.hero.badge,
      title: content.hero.title,
      highlight: content.hero.highlight,
      subtitle: content.hero.subtitle,
      backgroundImage: content.hero.backgroundImage,
      mainImage: content.hero.truckImage,
      primaryButtonText: content.hero.primaryButtonText,
      secondaryButtonText: content.hero.secondaryButtonText,
      badgeOneTitle: content.hero.badgeOneTitle,
      badgeOneSubtitle: content.hero.badgeOneSubtitle,
      badgeTwoTitle: content.hero.badgeTwoTitle,
      badgeTwoSubtitle: content.hero.badgeTwoSubtitle,
      badgeThreeTitle: content.hero.badgeThreeTitle,
      badgeThreeSubtitle: content.hero.badgeThreeSubtitle,
    },
    ...(promoEnabled
      ? [
          {
            type: "promo" as const,
            badge: "Promoción activa",
            title: content.promo.title || "Promoción especial",
            highlight: "",
            subtitle:
              content.promo.subtitle ||
              "Aprovecha esta promoción por tiempo limitado.",
            backgroundImage: content.hero.backgroundImage,
            mainImage: content.promo.image || content.hero.truckImage,
            primaryButtonText:
              content.promo.buttonText || "Solicitar Cotización",
            secondaryButtonText: content.hero.secondaryButtonText,
            badgeOneTitle: "Promo",
            badgeOneSubtitle: "Especial",
            badgeTwoTitle: "Local",
            badgeTwoSubtitle: "Envíos",
            badgeThreeTitle: "Vigente",
            badgeThreeSubtitle: "Limitado",
          },
        ]
      : []),
  ];

  const currentSlide = slides[activeSlide] ?? slides[0];

  useEffect(() => {
    if (!promoEnabled || slides.length <= 1) {
      setActiveSlide(0);
      return;
    }

    const interval = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [promoEnabled, slides.length]);

  return (
    <section id="inicio" className="relative min-h-[92vh] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          key={`bg-${activeSlide}-${currentSlide.backgroundImage}`}
          src={currentSlide.backgroundImage}
          alt="Almacén y logística"
          className="hero-bg-enter h-full w-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-slate-950/70" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-slate-950/20" />
      </div>

      {/* Content */}
     <div
  key={`slide-${activeSlide}-${currentSlide.type}`}
  className="hero-slide-enter relative mx-auto flex h-[700px] max-w-6xl flex-col gap-10 px-4 pb-20 pt-32 md:h-[620px] md:flex-row md:items-center"
>
        {/* Left */}
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
            <span
              className={
                currentSlide.type === "promo"
                  ? "h-2 w-2 rounded-full bg-blue-400"
                  : "h-2 w-2 rounded-full bg-red-500"
              }
            />
            {currentSlide.badge}
          </div>

          <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-white md:text-6xl">
            <TitleWithHighlight
              title={currentSlide.title}
              highlight={currentSlide.highlight}
            />
          </h1>

          <p className="mt-5 text-base leading-relaxed text-white/75 md:text-lg">
            {currentSlide.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => setOpenQuote(true)}
              className="rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-500"
            >
              {currentSlide.primaryButtonText} →
            </button>

            <a
              href="#servicios"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              {currentSlide.secondaryButtonText}
            </a>
          </div>

          {promoEnabled && slides.length > 1 && (
            <div className="mt-8 flex items-center gap-3">
              {slides.map((slide, index) => (
                <button
                  key={`${slide.type}-${index}`}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  className={
                    activeSlide === index
                      ? "h-2.5 w-8 rounded-full bg-red-500 transition"
                      : "h-2.5 w-2.5 rounded-full bg-white/30 transition hover:bg-white/60"
                  }
                  aria-label={`Ir al slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right */}
        <div className="relative flex-1">
          {/* IMPORTANTE: overflow-visible para que los badges sobresalgan */}
          <div className="relative mx-auto max-w-xl overflow-visible">
            {/* Card animado */}
            <div className="animate-float">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur">
                <div className="relative h-[260px] overflow-hidden rounded-2xl sm:h-[320px] md:h-[340px]">
                  <img
                    src={currentSlide.mainImage}
                    alt={
                      currentSlide.type === "promo"
                        ? "Promoción Monster Van"
                        : "Unidad Monster Van"
                    }
                    className="h-full w-full object-cover"
                  />

                  {currentSlide.type === "promo" && (
                    <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-xs font-black text-white shadow-lg">
                      <Megaphone className="h-4 w-4" />
                      Promoción
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Badges */}
            <Badge
              icon={
                currentSlide.type === "promo" ? (
                  <Megaphone className="h-5 w-5" />
                ) : (
                  <Box className="h-5 w-5" />
                )
              }
              title={currentSlide.badgeOneTitle}
              subtitle={currentSlide.badgeOneSubtitle}
              className="absolute -left-4 -top-4 md:-left-6 md:-top-6"
            />

            <Badge
              icon={<MapPin className="h-5 w-5" />}
              title={currentSlide.badgeTwoTitle}
              subtitle={currentSlide.badgeTwoSubtitle}
              className="absolute -left-2 bottom-4 md:-left-4 md:bottom-6"
            />

            <Badge
              icon={<Clock className="h-5 w-5" />}
              title={currentSlide.badgeThreeTitle}
              subtitle={currentSlide.badgeThreeSubtitle}
              className="absolute -right-2 bottom-6 md:-right-4 md:bottom-10"
            />
          </div>
        </div>
      </div>

      {/* Bottom stats */}
      <div className="relative mx-auto max-w-6xl px-4 pb-10">
        <div className="grid gap-6 border-t border-white/10 pt-8 md:grid-cols-4">
          <Stat value="3.5t" label="Capacidad máx." />
          <Stat value="Gran" label="Disponibilidad" />
          <Stat value="GPS" label="Rastreo en vivo" />
        </div>
      </div>

      <QuoteModal
        open={openQuote}
        onClose={() => setOpenQuote(false)}
        whatsappPhoneE164NoPlus={whatsapp}
      />

      {/* Keyframes */}
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

        @keyframes hero-slide-enter {
          0% {
            opacity: 0;
            transform: translateX(42px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .hero-slide-enter {
          animation: hero-slide-enter 650ms ease-out both;
        }

        @keyframes hero-bg-enter {
          0% {
            opacity: 0;
            transform: scale(1.03);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .hero-bg-enter {
          animation: hero-bg-enter 800ms ease-out both;
        }
      `}</style>
    </section>
  );
}

function TitleWithHighlight({
  title,
  highlight,
}: {
  title: string;
  highlight: string;
}) {
  if (!highlight || !title.includes(highlight)) {
    return <>{title}</>;
  }

  const parts = title.split(highlight);

  return (
    <>
      {parts[0]}
      <span className="text-blue-400">{highlight}</span>
      {parts.slice(1).join(highlight)}
    </>
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