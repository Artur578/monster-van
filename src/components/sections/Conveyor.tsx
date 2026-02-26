"use client";

import Image from "next/image";

export function Conveyor() {
  return (
    <div aria-hidden="true" className="bg-slate-950">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative py-6">
          {/* Carril */}
          <div className="relative h-32 overflow-hidden">
            {/* Líneas */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
              <div className="h-[1px] bg-white/10" />
              <div className="mt-[6px] h-[2px] bg-gradient-to-r from-red-500/60 via-blue-500/55 to-red-500/60" />
            </div>

            {/* Camiones */}
            <div className="absolute inset-0">
              {/* Camión A */}
              <div className="truck">
                <div className="truck-inner">
                  <Image
                    src="/images/camionmh.png"
                    alt="Monster Van"
                    width={160}
                    height={55}
                    priority
                    className="opacity-95 drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
                  />
                </div>
              </div>

              {/* Camión B (offset para loop continuo) */}
              <div className="truck truck-delay">
                <div className="truck-inner">
                  <Image
                    src="/images/camionmh.png"
                    alt="Monster Van"
                    width={160}
                    height={55}
                    className="opacity-90 drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
                  />
                </div>
              </div>
            </div>

            {/* Profundidad */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white/5 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ========= CONTROLES =========
           1) SUBIR/BAJAR: aumenta --truckRaise
              Ej: 48px, 60px, 75px...
           2) TAMAÑO: ajusta --truckScale
              Ej: 0.7, 0.6, 0.5...
        */
        .truck {
          --truckRaise: 62px; /* 👈 SUBE/BAJA AQUÍ */
          --truckScale: 0.55; /* 👈 TAMAÑO AQUÍ */

          position: absolute;
          right: -520px; /* arranca fuera por la derecha */
          top: calc(50% - var(--truckRaise)); /* ✅ esto lo pone arriba de la línea */
          animation: move-truck 18s linear infinite;
          will-change: transform;
        }

        .truck-delay {
          animation-delay: -9s; /* mitad del ciclo */
        }

        .truck-inner {
          transform: scale(var(--truckScale));
          transform-origin: left center;
        }

        /* Movimiento: derecha -> izquierda */
        @keyframes move-truck {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100vw - 1200px));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .truck {
            animation: none;
            right: 0;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}