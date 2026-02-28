"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { QuoteModal } from "@/components/QuoteModal"; // ✅ IMPORTA EL MODAL

export function Footer() {
  const [openQuote, setOpenQuote] = useState(false);

  return (
    <>
      <footer id="footer" className="bg-slate-950">
        <div className="mx-auto max-w-6xl px-4">
          {/* Top border */}
          <div className="border-t border-white/10 pb-10 pt-14">
            <div className="grid gap-10 md:grid-cols-4">
              {/* Brand */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-3">
                  {/* ✅ Slot fijo (no cambia posición), logo escalado */}
                  <div className="relative h-11 w-11 overflow-visible">
                    <Image
                      src="/images/logo2.png"
                      alt="Monster Van"
                      fill
                      priority
                      className="object-contain origin-left scale-[2.0]"
                    />
                  </div>

                  <div className="leading-tight">
                    <div className="text-sm font-extrabold text-white">
                      MONSTER
                    </div>
                    <div className="text-sm font-extrabold text-white">VAN</div>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-white/65">
                  Transporte y logística nacional con operación segura, puntual y
                  rastreable.
                </p>

                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
                  <span className="h-2 w-2 rounded-full bg-blue-400/80" />
                 
                </div>
              </div>

              {/* Links */}
              <div>
                <div className="text-sm font-extrabold text-white">Secciones</div>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  <li>
                    <a className="hover:text-white" href="#inicio">
                      Inicio
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white" href="#nosotros">
                      Nosotros
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white" href="#servicios">
                      Servicios
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white" href="#flotilla">
                      Flotilla
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white" href="#contacto">
                      Contacto
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <div className="text-sm font-extrabold text-white">Contacto</div>

                <ul className="mt-4 space-y-3 text-sm text-white/70">
                  <li className="flex gap-3">
                    <span className="mt-0.5 text-white/70">
                      <Phone className="h-4 w-4" />
                    </span>
                    <span>(+52) 462 236 3138</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 text-white/70">
                      <Phone className="h-4 w-4" />
                    </span>
                    <span>(+52) 462 250 7585</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 text-white/70">
                      <Mail className="h-4 w-4" />
                    </span>
                    <span>monstervanmx@gmail.com</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 text-white/70">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <span>México</span>
                  </li>
                </ul>

                {/* ✅ AHORA ES BOTÓN Y ABRE EL MODAL */}
                <button
                  type="button"
                  onClick={() => setOpenQuote(true)}
                  className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  Cotizar ahora <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>

              {/* Legal */}
              <div>
                <div className="text-sm font-extrabold text-white">Legal</div>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  <li>
                    <a className="hover:text-white" href="#">
                      Aviso de privacidad
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white" href="#">
                      Términos y condiciones
                    </a>
                  </li>
                </ul>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs font-semibold tracking-[0.22em] text-white/60">
                    COBERTURA
                  </div>
                  <div className="mt-2 text-sm font-extrabold text-white">
                    Nacional
                  </div>
                  <div className="mt-1 text-xs text-white/65">
                    Rutas programadas y urgentes.
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
              <div className="text-xs text-white/55">
                © {new Date().getFullYear()} Monster Van. Todos los derechos
                reservados.
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="#inicio"
                  className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  Volver arriba ↑
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ✅ MODAL GLOBAL PARA EL FOOTER */}
      <QuoteModal
        open={openQuote}
        onClose={() => setOpenQuote(false)}
        whatsappPhoneE164NoPlus="524622363138" // ✅ tu número de prueba (sin +)
      />
    </>
  );
}