"use client";

import { useMemo, useState } from "react";

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

type QuoteData = {
  name: string;
  phone: string;
  product: string;
  weight: string;
  origin: string;
  destination: string;
  notes: string;
};

export function QuoteModal({
  open,
  onClose,
  whatsappPhoneE164NoPlus,
}: {
  open: boolean;
  onClose: () => void;
  whatsappPhoneE164NoPlus: string; // ej: 524691138533
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<QuoteData>({
    name: "",
    phone: "",
    product: "",
    weight: "",
    origin: "",
    destination: "",
    notes: "",
  });

  const message = useMemo(() => {
    const lines = [
      "Hola, quiero una cotización en Monster Van.",
      "",
      `Nombre: ${data.name || "-"}`,
      `Teléfono: ${data.phone || "-"}`,
      `Mercancía: ${data.product || "-"}`,
      `Peso/Volumen aprox: ${data.weight || "-"}`,
      `Origen: ${data.origin || "-"}`,
      `Destino: ${data.destination || "-"}`,
      `Notas: ${data.notes || "-"}`,
    ];
    return lines.join("\n");
  }, [data]);

  function sendWhatsApp() {
    setLoading(true);
    try {
      const url = `https://wa.me/${whatsappPhoneE164NoPlus}?text=${encodeURIComponent(
        message
      )}`;
      window.open(url, "_blank", "noopener,noreferrer");
      onClose();
    } finally {
      setTimeout(() => setLoading(false), 350);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999]">
      {/* backdrop */}
      <button
        aria-label="Cerrar"
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* ✅ centrado real (no mt-24) para que en móvil alcance todo */}
      <div className="relative flex min-h-[100dvh] items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/90 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur">
            {/* glow */}
            <div className="pointer-events-none absolute -top-24 left-10 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 right-10 h-72 w-72 rounded-full bg-red-500/15 blur-3xl" />

            {/* ✅ alto máximo del modal según pantalla */}
            <div className="relative max-h-[calc(100dvh-2rem)]">
              {/* HEADER */}
              <div className="relative p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold tracking-[0.22em] text-white/60">
                      COTIZACIÓN
                    </div>
                    <h3 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
                      Solicitar cotización por WhatsApp
                    </h3>
                    <p className="mt-2 text-sm text-white/70">
                      Llena lo básico y te preparamos el mensaje automáticamente.
                    </p>
                  </div>

                  <button
                    onClick={onClose}
                    className="rounded-2xl border border-white/12 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10"
                  >
                    Cerrar
                  </button>
                </div>
              </div>

              {/* ✅ BODY con scroll discreto */}
              <div
                className={cn(
                  "modal-scroll px-6 pb-6 sm:px-8",
                  "overflow-y-auto overscroll-contain",
                  // deja espacio para el footer sticky
                  "pb-28",
                  // altura del área scrolleable (muy importante)
                  "max-h-[calc(100dvh-18rem)]"
                )}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Nombre">
                    <input
                      value={data.name}
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                      className={inputCls}
                      placeholder="Ej. Arturo"
                    />
                  </Field>

                  <Field label="Tu teléfono">
                    <input
                      value={data.phone}
                      onChange={(e) => setData({ ...data, phone: e.target.value })}
                      className={inputCls}
                      placeholder="Ej. 469 111 3333"
                    />
                  </Field>

                  <Field label="Mercancía / producto">
                    <input
                      value={data.product}
                      onChange={(e) =>
                        setData({ ...data, product: e.target.value })
                      }
                      className={inputCls}
                      placeholder="Ej. cajas, refacciones, tarimas..."
                    />
                  </Field>

                  <Field label="Peso / volumen aprox">
                    <input
                      value={data.weight}
                      onChange={(e) =>
                        setData({ ...data, weight: e.target.value })
                      }
                      className={inputCls}
                      placeholder="Ej. 800 kg / 2 tarimas"
                    />
                  </Field>

                  <Field label="Origen">
                    <input
                      value={data.origin}
                      onChange={(e) =>
                        setData({ ...data, origin: e.target.value })
                      }
                      className={inputCls}
                      placeholder="Ej. León, Gto."
                    />
                  </Field>

                  <Field label="Destino">
                    <input
                      value={data.destination}
                      onChange={(e) =>
                        setData({ ...data, destination: e.target.value })
                      }
                      className={inputCls}
                      placeholder="Ej. CDMX"
                    />
                  </Field>

                  <Field label="Notas (opcional)" className="sm:col-span-2">
                    <textarea
                      value={data.notes}
                      onChange={(e) => setData({ ...data, notes: e.target.value })}
                      className={cn(inputCls, "min-h-[90px] resize-none")}
                      placeholder="Horario, tipo de entrega, restricciones, etc."
                    />
                  </Field>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-4">
                  <div className="text-xs font-semibold tracking-[0.22em] text-white/60">
                    MENSAJE PREVIEW
                  </div>

                  {/* ✅ preview con su propio mini-scroll si crece */}
                  <pre className="mt-2 max-h-40 overflow-y-auto whitespace-pre-wrap text-sm text-white/75 modal-scroll">
                    {message}
                  </pre>
                </div>
              </div>

              {/* ✅ FOOTER SIEMPRE VISIBLE */}
              <div className="sticky bottom-0 z-10 border-t border-white/10 bg-slate-950/80 px-6 py-4 backdrop-blur sm:px-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                  <button
                    onClick={onClose}
                    className="rounded-2xl border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 hover:bg-white/10"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={sendWhatsApp}
                    disabled={loading}
                    className="rounded-2xl bg-red-600 px-6 py-3 text-sm font-extrabold text-white shadow-[0_18px_60px_rgba(239,68,68,0.30)] transition hover:bg-red-500 disabled:opacity-60"
                  >
                    {loading ? "Abriendo WhatsApp..." : "Enviar por WhatsApp →"}
                  </button>
                </div>
              </div>
            </div>

            {/* ✅ Scrollbar discreto */}
            <style jsx>{`
              .modal-scroll {
                scrollbar-width: thin; /* Firefox */
                scrollbar-color: rgba(255, 255, 255, 0.18) transparent;
              }
              .modal-scroll::-webkit-scrollbar {
                width: 6px;
              }
              .modal-scroll::-webkit-scrollbar-track {
                background: transparent;
              }
              .modal-scroll::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.14);
                border-radius: 999px;
              }
              .modal-scroll::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.22);
              }
            `}</style>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <div className="mb-2 text-xs font-semibold text-white/70">{label}</div>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-red-500/40 focus:ring-2 focus:ring-red-500/15";