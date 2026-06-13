

"use client";

import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { defaultContent, type SiteContent } from "@/config/defaultContent";
import { supabase } from "@/lib/supabaseClient";
import { getSiteContent } from "@/lib/siteContent";

const ADMIN_UIDS = [
  "fe96d864-d1fe-48e6-917b-651b9d906701",
  "5b40db88-bf96-4523-a290-182ab8406ebc",
];

function isAdminUser(userId: string) {
  return ADMIN_UIDS.includes(userId);
}

const DEFAULT_SERVICE_ITEMS = [
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

type ServiceItem = SiteContent["services"]["items"][number];

// ─── Section IDs ────────────────────────────────────────────────────────────
type SectionId =
  | "hero"
  | "services"
  | "fleet"
  | "cta"
  | "footer"
  | "general"
  | "promo";

const SECTIONS: { id: SectionId; label: string; icon: string }[] = [
  { id: "hero", label: "Hero", icon: "🖼" },
  { id: "services", label: "Servicios", icon: "⚡" },
  { id: "fleet", label: "Flotilla", icon: "🚛" },
  { id: "cta", label: "CTA Final", icon: "📣" },
  { id: "promo", label: "Promoción", icon: "🎯" },
  { id: "general", label: "General", icon: "⚙️" },
  { id: "footer", label: "Footer", icon: "📄" },
];

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);
  const [saving, setSaving] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState("");
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const serviceItems = useMemo(() => {
    if (content.services.items && content.services.items.length >= 6) {
      return content.services.items;
    }
    return DEFAULT_SERVICE_ITEMS;
  }, [content.services.items]);

  async function checkSession() {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setUserEmail(null);
      setIsAdmin(false);
      setLoading(false);
      return;
    }
    setUserEmail(user.email ?? null);
    setIsAdmin(isAdminUser(user.id));
    setLoading(false);
  }

  async function loadContent() {
    const siteContent = await getSiteContent();
    setContent(siteContent);
  }

  useEffect(() => {
    async function init() {
      await checkSession();
      await loadContent();
    }
    init();
  }, []);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoggingIn(true);
    setMessage("");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setMessage(error.message);
      setLoggingIn(false);
      return;
    }
    if (!isAdminUser(data.user.id)) {
      setMessage("Este usuario no tiene permisos de administrador.");
      await supabase.auth.signOut();
      setLoggingIn(false);
      return;
    }
    setMessage("Acceso correcto.");
    setEmail("");
    setPassword("");
    setLoggingIn(false);
    await checkSession();
    await loadContent();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setUserEmail(null);
    setIsAdmin(false);
  }

  function updateGeneral(field: keyof SiteContent["general"], value: string) {
    setContent((prev) => ({ ...prev, general: { ...prev.general, [field]: value } }));
  }
  function updateNav(field: keyof SiteContent["nav"], value: string) {
    setContent((prev) => ({ ...prev, nav: { ...prev.nav, [field]: value } }));
  }
  function updateHero(field: keyof SiteContent["hero"], value: string) {
    setContent((prev) => ({ ...prev, hero: { ...prev.hero, [field]: value } }));
  }
  function updateCta(field: keyof SiteContent["cta"], value: string) {
    setContent((prev) => ({ ...prev, cta: { ...prev.cta, [field]: value } }));
  }
  function updateFooter(field: keyof SiteContent["footer"], value: string) {
    setContent((prev) => ({ ...prev, footer: { ...prev.footer, [field]: value } }));
  }
  function updateServicesMeta(field: "eyebrow" | "title" | "description", value: string) {
    setContent((prev) => ({ ...prev, services: { ...prev.services, [field]: value } }));
  }
  function updateServiceItem(index: number, field: keyof ServiceItem, value: string) {
    setContent((prev) => {
      const baseItems =
        prev.services.items && prev.services.items.length >= 6
          ? prev.services.items
          : DEFAULT_SERVICE_ITEMS;
      const items = baseItems.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
      return { ...prev, services: { ...prev.services, items } };
    });
  }
  function updateFleet(field: keyof SiteContent["fleet"], value: string) {
    setContent((prev) => ({ ...prev, fleet: { ...prev.fleet, [field]: value } }));
  }
  function updatePromo(field: "title" | "subtitle" | "image" | "buttonText", value: string) {
    setContent((prev) => ({ ...prev, promo: { ...prev.promo, [field]: value } }));
  }
  function updatePromoEnabled(value: boolean) {
    setContent((prev) => ({ ...prev, promo: { ...prev.promo, enabled: value } }));
  }

  async function handleSave() {
    setSaving(true);
    const finalContent = { ...content, services: { ...content.services, items: serviceItems } };
    const { error } = await supabase
      .from("site_content")
      .update({ content: finalContent, updated_at: new Date().toISOString() })
      .eq("id", "main")
      .select();
    if (error) {
      setMessage(`Error al guardar: ${error.message}`);
      setSaving(false);
      return;
    }
    setContent(finalContent);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
    setSaving(false);
  }

  // ─── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080C14]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-red-500" />
          <p className="text-sm text-white/40">Cargando panel...</p>
        </div>
      </main>
    );
  }

  // ─── Login ────────────────────────────────────────────────────────────────
  if (!userEmail || !isAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080C14] px-4">
        <div className="w-full max-w-sm">
          {/* Logo area */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600/15 ring-1 ring-red-600/30">
              <span className="text-2xl">🚛</span>
            </div>
            <h1 className="text-2xl font-black text-white">Monster Van</h1>
            <p className="mt-1 text-sm text-white/40">Panel administrativo</p>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 backdrop-blur">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/50">
                  Correo
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition focus:border-red-500/60 focus:ring-1 focus:ring-red-500/20"
                  placeholder="admin@monstervan.com.mx"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/50">
                  Contraseña
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition focus:border-red-500/60 focus:ring-1 focus:ring-red-500/20"
                  placeholder="••••••••"
                />
              </div>
              {message && (
                <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                  {message}
                </p>
              )}
              <button
                type="submit"
                disabled={loggingIn}
                className="w-full rounded-xl bg-red-600 py-3 text-sm font-bold text-white transition hover:bg-red-500 disabled:opacity-50"
              >
                {loggingIn ? "Entrando..." : "Entrar al panel →"}
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  // ─── Main Panel ───────────────────────────────────────────────────────────
  return (
    <div className="flex h-screen overflow-hidden bg-[#080C14] text-white">
      {/* ── Left Sidebar: Section Nav ── */}
      <aside className="flex w-[220px] shrink-0 flex-col border-r border-white/8 bg-[#0A0F1A]">
        {/* Brand */}
        <div className="flex items-center gap-3 border-b border-white/8 px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600/20">
            <span className="text-sm">🚛</span>
          </div>
          <div>
            <p className="text-xs font-black leading-none text-white">Monster Van</p>
            <p className="mt-0.5 text-[10px] text-white/30">Admin</p>
          </div>
        </div>

        {/* Section tabs */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-white/25">
            Secciones
          </p>
          <div className="space-y-0.5">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveSection(s.id)}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                  activeSection === s.id
                    ? "bg-red-600/15 text-red-400 ring-1 ring-red-600/25"
                    : "text-white/50 hover:bg-white/5 hover:text-white/80"
                }`}
              >
                <span className="text-base leading-none">{s.icon}</span>
                {s.label}
                {activeSection === s.id && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-red-500" />
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* User / logout */}
        <div className="border-t border-white/8 p-3">
          <div className="mb-2 rounded-xl bg-white/[0.03] px-3 py-2">
            <p className="truncate text-[10px] text-white/30">{userEmail}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-xl border border-white/8 px-3 py-2 text-xs font-semibold text-white/40 transition hover:border-white/15 hover:text-white/70"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* ── Center: Editor ── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/8 px-6">
          <div className="flex items-center gap-2">
            <span className="text-lg">{SECTIONS.find((s) => s.id === activeSection)?.icon}</span>
            <h1 className="text-sm font-black text-white">
              {SECTIONS.find((s) => s.id === activeSection)?.label}
            </h1>
            <span className="ml-1 rounded-full bg-white/8 px-2 py-0.5 text-[10px] text-white/40">
              editando
            </span>
          </div>

          <div className="flex items-center gap-3">
            {saveSuccess && (
              <span className="flex items-center gap-1.5 rounded-full bg-green-500/15 px-3 py-1.5 text-xs font-semibold text-green-400 ring-1 ring-green-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                Guardado
              </span>
            )}
            {message && !saveSuccess && (
              <span className="text-xs text-red-400">{message}</span>
            )}
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="rounded-xl bg-red-600 px-5 py-2 text-sm font-black text-white transition hover:bg-red-500 disabled:opacity-50"
            >
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </header>

        {/* Split pane: form + preview */}
        <div className="flex flex-1 overflow-hidden">
          {/* Form panel */}
          <div className="w-[400px] shrink-0 overflow-y-auto border-r border-white/8 bg-[#090D17]">
            <div className="p-6">
              <EditorPanel
                section={activeSection}
                content={content}
                serviceItems={serviceItems}
                updateHero={updateHero}
                updateGeneral={updateGeneral}
                updateNav={updateNav}
                updateCta={updateCta}
                updateFooter={updateFooter}
                updateServicesMeta={updateServicesMeta}
                updateServiceItem={updateServiceItem}
                updateFleet={updateFleet}
                updatePromo={updatePromo}
                updatePromoEnabled={updatePromoEnabled}
              />
            </div>
          </div>

          {/* Live preview panel */}
          <div className="flex flex-1 flex-col overflow-y-auto bg-[#06090F]">
            {/* Preview label */}
            <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-white/8 bg-[#06090F]/90 px-6 py-3 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              <p className="text-xs font-semibold text-white/40">Vista previa en vivo</p>
              <span className="ml-auto text-[10px] text-white/20">
                Así se verá en el sitio
              </span>
            </div>

            <div className="flex-1 p-6">
              <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/8 shadow-2xl">
                {/* Simulated browser chrome */}
                <div className="flex items-center gap-1.5 border-b border-white/8 bg-[#0D1220] px-4 py-2.5">
                  <span className="h-3 w-3 rounded-full bg-red-500/40" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/40" />
                  <span className="h-3 w-3 rounded-full bg-green-500/40" />
                  <div className="mx-3 flex-1 rounded bg-white/5 px-3 py-1 text-[10px] text-white/20">
                    monstervan.com.mx
                  </div>
                </div>

                {/* Simulated nav */}
                <div className="flex items-center justify-between border-b border-white/8 bg-[#080C14] px-6 py-3">
                  <div className="flex items-center gap-2">
                    {content.general.logo ? (
                      <img src={content.general.logo} alt="logo" className="h-7 w-auto" />
                    ) : (
                      <div className="flex h-7 w-7 items-center justify-center rounded bg-red-600/30 text-xs font-black text-red-400">
                        MV
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-white/50">
                    <span>{content.nav.inicio}</span>
                    <span>{content.nav.nosotros}</span>
                    <span>{content.nav.servicios}</span>
                    <span>{content.nav.flotilla}</span>
                    <span>{content.nav.contacto}</span>
                  </div>
                  <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
                    {content.nav.cotizar}
                  </span>
                </div>

                {/* Section-specific preview */}
                <LivePreview
                  section={activeSection}
                  content={content}
                  serviceItems={serviceItems}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Editor Panel (left pane forms) ──────────────────────────────────────────
function EditorPanel({
  section,
  content,
  serviceItems,
  updateHero,
  updateGeneral,
  updateNav,
  updateCta,
  updateFooter,
  updateServicesMeta,
  updateServiceItem,
  updateFleet,
  updatePromo,
  updatePromoEnabled,
}: {
  section: SectionId;
  content: SiteContent;
  serviceItems: ServiceItem[];
  updateHero: (f: keyof SiteContent["hero"], v: string) => void;
  updateGeneral: (f: keyof SiteContent["general"], v: string) => void;
  updateNav: (f: keyof SiteContent["nav"], v: string) => void;
  updateCta: (f: keyof SiteContent["cta"], v: string) => void;
  updateFooter: (f: keyof SiteContent["footer"], v: string) => void;
  updateServicesMeta: (f: "eyebrow" | "title" | "description", v: string) => void;
  updateServiceItem: (i: number, f: keyof ServiceItem, v: string) => void;
  updateFleet: (f: keyof SiteContent["fleet"], v: string) => void;
  updatePromo: (f: "title" | "subtitle" | "image" | "buttonText", v: string) => void;
  updatePromoEnabled: (v: boolean) => void;
}) {
  if (section === "hero") {
    return (
      <EditorGroup>
        <GroupTitle>Hero principal</GroupTitle>
        <GroupDesc>Primera sección que ve el cliente.</GroupDesc>
        <Field label="Badge superior" value={content.hero.badge} onChange={(v) => updateHero("badge", v)} />
        <TextareaField label="Título principal" value={content.hero.title} onChange={(v) => updateHero("title", v)} />
        <Field label="Texto resaltado (en azul)" value={content.hero.highlight} onChange={(v) => updateHero("highlight", v)} help='Debe coincidir con una parte del título.' />
        <TextareaField label="Subtítulo" value={content.hero.subtitle} onChange={(v) => updateHero("subtitle", v)} />
        <Field label="Botón principal" value={content.hero.primaryButtonText} onChange={(v) => updateHero("primaryButtonText", v)} />
        <Field label="Botón secundario" value={content.hero.secondaryButtonText} onChange={(v) => updateHero("secondaryButtonText", v)} />
    
        <ImageUploadField
  label="Imagen de fondo"
  value={content.hero.backgroundImage}
  onChange={(v) => updateHero("backgroundImage", v)}
  folder="hero"
  help="Imagen de fondo principal del Hero."
/>

<ImageUploadField
  label="Imagen del camión"
  value={content.hero.truckImage}
  onChange={(v) => updateHero("truckImage", v)}
  folder="hero"
  help="Imagen principal de la tarjeta derecha."
/>
        <Divider label="Badges de estadísticas" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Badge 1 · título" value={content.hero.badgeOneTitle} onChange={(v) => updateHero("badgeOneTitle", v)} />
          <Field label="Badge 1 · subtítulo" value={content.hero.badgeOneSubtitle} onChange={(v) => updateHero("badgeOneSubtitle", v)} />
          <Field label="Badge 2 · título" value={content.hero.badgeTwoTitle} onChange={(v) => updateHero("badgeTwoTitle", v)} />
          <Field label="Badge 2 · subtítulo" value={content.hero.badgeTwoSubtitle} onChange={(v) => updateHero("badgeTwoSubtitle", v)} />
          <Field label="Badge 3 · título" value={content.hero.badgeThreeTitle} onChange={(v) => updateHero("badgeThreeTitle", v)} />
          <Field label="Badge 3 · subtítulo" value={content.hero.badgeThreeSubtitle} onChange={(v) => updateHero("badgeThreeSubtitle", v)} />
        </div>
      </EditorGroup>
    );
  }

  if (section === "services") {
    return (
      <EditorGroup>
        <GroupTitle>Servicios</GroupTitle>
        <GroupDesc>Cards de la sección "Lo que ofrecemos".</GroupDesc>
        <Field label="Etiqueta superior" value={content.services.eyebrow} onChange={(v) => updateServicesMeta("eyebrow", v)} />
        <Field label="Título" value={content.services.title} onChange={(v) => updateServicesMeta("title", v)} />
        <TextareaField label="Descripción" value={content.services.description} onChange={(v) => updateServicesMeta("description", v)} />
        <Divider label="Cards de servicios" />
        {serviceItems.map((service, index) => (
          <div key={`service-${index}`} className="rounded-xl border border-white/8 bg-black/20 p-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white/30">
              Servicio {index + 1}
            </p>
            <Field label="Título" value={service.title} onChange={(v) => updateServiceItem(index, "title", v)} />
            <div className="mt-3">
              <TextareaField label="Descripción" value={service.description} onChange={(v) => updateServiceItem(index, "description", v)} />
            </div>
            <div className="mt-3">
             <ImageUploadField
  label="Imagen"
  value={service.image}
  onChange={(v) => updateServiceItem(index, "image", v)}
  folder="servicios"
  help="Imagen de esta tarjeta de servicio."
/>
            </div>
          </div>
        ))}
      </EditorGroup>
    );
  }

  if (section === "fleet") {
    return (
      <EditorGroup>
        <GroupTitle>Flotilla vehicular</GroupTitle>
        <GroupDesc>Unidades y equipos de seguridad.</GroupDesc>
        <Field label="Etiqueta superior" value={content.fleet.eyebrow} onChange={(v) => updateFleet("eyebrow", v)} />
        <Field label="Título" value={content.fleet.title} onChange={(v) => updateFleet("title", v)} />
        <TextareaField label="Descripción" value={content.fleet.description} onChange={(v) => updateFleet("description", v)} />
        <Divider label="Vehículo 1 (Caady)" />
        <Field label="Título" value={content.fleet.vehicleOneTitle} onChange={(v) => updateFleet("vehicleOneTitle", v)} />
        <TextareaField label="Descripción" value={content.fleet.vehicleOneDescription} onChange={(v) => updateFleet("vehicleOneDescription", v)} />
       <ImageUploadField
  label="Imagen vehículo 1"
  value={content.fleet.vehicleOneImage}
  onChange={(v) => updateFleet("vehicleOneImage", v)}
  folder="flotilla"
  help="Imagen del vehículo 1."
/>
        <Divider label="Vehículo 2 (Plataforma)" />
        <Field label="Título" value={content.fleet.vehicleTwoTitle} onChange={(v) => updateFleet("vehicleTwoTitle", v)} />
        <TextareaField label="Descripción" value={content.fleet.vehicleTwoDescription} onChange={(v) => updateFleet("vehicleTwoDescription", v)} />
       <ImageUploadField
  label="Imagen vehículo 2"
  value={content.fleet.vehicleTwoImage}
  onChange={(v) => updateFleet("vehicleTwoImage", v)}
  folder="flotilla"
  help="Imagen del vehículo 2."
/>
        <Divider label="Seguridad del vehículo" />
        <Field label="Título" value={content.fleet.safetyTitle} onChange={(v) => updateFleet("safetyTitle", v)} />
        <TextareaField label="Descripción" value={content.fleet.safetyDescription} onChange={(v) => updateFleet("safetyDescription", v)} />
        <ImageUploadField
  label="Imagen seguridad vehículo"
  value={content.fleet.safetyImage}
  onChange={(v) => updateFleet("safetyImage", v)}
  folder="flotilla"
  help="Imagen de seguridad del vehículo."
/>
        <Divider label="EPP (Equipo de protección)" />
        <Field label="Título" value={content.fleet.eppTitle} onChange={(v) => updateFleet("eppTitle", v)} />
        <TextareaField label="Descripción" value={content.fleet.eppDescription} onChange={(v) => updateFleet("eppDescription", v)} />
       <ImageUploadField
  label="Imagen EPP"
  value={content.fleet.eppImage}
  onChange={(v) => updateFleet("eppImage", v)}
  folder="flotilla"
  help="Imagen del personal con EPP."
/>
      </EditorGroup>
    );
  }

  if (section === "cta") {
    return (
      <EditorGroup>
        <GroupTitle>CTA final</GroupTitle>
        <GroupDesc>Llamada a la acción antes del footer.</GroupDesc>
        <Field label="Título" value={content.cta.title} onChange={(v) => updateCta("title", v)} />
        <TextareaField label="Descripción" value={content.cta.description} onChange={(v) => updateCta("description", v)} />
        <Field label="Texto del botón" value={content.cta.buttonText} onChange={(v) => updateCta("buttonText", v)} />
      </EditorGroup>
    );
  }

  if (section === "promo") {
    return (
      <EditorGroup>
        <GroupTitle>Promoción / Carrusel</GroupTitle>
        <GroupDesc>Activa una slide promocional en el hero.</GroupDesc>
        <CheckboxField
          label="Activar promoción"
          checked={content.promo.enabled}
          onChange={updatePromoEnabled}
        />
        <Field label="Título" value={content.promo.title} onChange={(v) => updatePromo("title", v)} help="Ej: 30% de descuento en envíos locales" />
        <TextareaField label="Descripción" value={content.promo.subtitle} onChange={(v) => updatePromo("subtitle", v)} />
        <Field label="Texto del botón" value={content.promo.buttonText} onChange={(v) => updatePromo("buttonText", v)} />
        <ImageUploadField
  label="Imagen de promoción"
  value={content.promo.image}
  onChange={(v) => updatePromo("image", v)}
  folder="promociones"
  help="Puedes subir una imagen desde tu computadora o pegar una URL."
/>
      </EditorGroup>
    );
  }

  if (section === "general") {
    return (
      <EditorGroup>
        <GroupTitle>Información general</GroupTitle>
        <GroupDesc>Datos de contacto, marca y navegación.</GroupDesc>
        <Field label="Nombre de empresa" value={content.general.companyName} onChange={(v) => updateGeneral("companyName", v)} />
        <Field label="WhatsApp (sin +)" value={content.general.whatsapp} onChange={(v) => updateGeneral("whatsapp", v)} />
        <Field label="Teléfono visible" value={content.general.phone} onChange={(v) => updateGeneral("phone", v)} />
        <Field label="Correo" value={content.general.email} onChange={(v) => updateGeneral("email", v)} />
        <Field label="Dirección" value={content.general.address} onChange={(v) => updateGeneral("address", v)} />
       <ImageUploadField
  label="Logo"
  value={content.general.logo}
  onChange={(v) => updateGeneral("logo", v)}
  folder="logos"
  help="Sube el logo o pega una URL."
/>
        <Divider label="Menú de navegación" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Inicio" value={content.nav.inicio} onChange={(v) => updateNav("inicio", v)} />
          <Field label="Nosotros" value={content.nav.nosotros} onChange={(v) => updateNav("nosotros", v)} />
          <Field label="Servicios" value={content.nav.servicios} onChange={(v) => updateNav("servicios", v)} />
          <Field label="Flotilla" value={content.nav.flotilla} onChange={(v) => updateNav("flotilla", v)} />
          <Field label="Contacto" value={content.nav.contacto} onChange={(v) => updateNav("contacto", v)} />
          <Field label="Botón cotizar" value={content.nav.cotizar} onChange={(v) => updateNav("cotizar", v)} />
        </div>
      </EditorGroup>
    );
  }

  if (section === "footer") {
    return (
      <EditorGroup>
        <GroupTitle>Footer</GroupTitle>
        <GroupDesc>Textos inferiores de la página.</GroupDesc>
        <TextareaField label="Descripción" value={content.footer.description} onChange={(v) => updateFooter("description", v)} />
        <Field label="Derechos reservados" value={content.footer.rights} onChange={(v) => updateFooter("rights", v)} />
        <Field label="Botón volver arriba" value={content.footer.backToTop} onChange={(v) => updateFooter("backToTop", v)} />
        <Divider label="Etiquetas de contacto" />
        <Field label="Etiqueta teléfono" value={content.footer.phoneLabel} onChange={(v) => updateFooter("phoneLabel", v)} />
        <Field label="Etiqueta correo" value={content.footer.emailLabel} onChange={(v) => updateFooter("emailLabel", v)} />
        <Field label="Etiqueta ubicación" value={content.footer.addressLabel} onChange={(v) => updateFooter("addressLabel", v)} />
      </EditorGroup>
    );
  }

  return null;
}

// ─── Live Preview (right pane) ────────────────────────────────────────────────
function LivePreview({
  section,
  content,
  serviceItems,
}: {
  section: SectionId;
  content: SiteContent;
  serviceItems: ServiceItem[];
}) {
  if (section === "hero") {
    return (
      <div className="relative min-h-[400px] overflow-hidden bg-[#060A12]">
        {content.hero.backgroundImage && (
          <img
            src={content.hero.backgroundImage}
            alt="bg"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060A12] via-[#060A12]/80 to-transparent" />
        <div className="relative grid min-h-[400px] grid-cols-2 items-center gap-6 p-8">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              {content.hero.badge}
            </div>
            <h2 className="text-3xl font-black leading-tight text-white">
              {content.hero.highlight
                ? content.hero.title.split(content.hero.highlight).map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className="text-blue-400">{content.hero.highlight}</span>
                      )}
                    </span>
                  ))
                : content.hero.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60">{content.hero.subtitle}</p>
            <div className="mt-5 flex gap-3">
              <span className="rounded-full bg-red-600 px-4 py-2 text-xs font-black text-white">
                {content.hero.primaryButtonText} →
              </span>
              <span className="rounded-full border border-white/15 px-4 py-2 text-xs text-white/70">
                {content.hero.secondaryButtonText}
              </span>
            </div>
            <div className="mt-8 flex gap-4">
              {[
                { t: content.hero.badgeOneTitle, s: content.hero.badgeOneSubtitle },
                { t: content.hero.badgeTwoTitle, s: content.hero.badgeTwoSubtitle },
                { t: content.hero.badgeThreeTitle, s: content.hero.badgeThreeSubtitle },
              ].map((b, i) => (
                <div key={i}>
                  <p className="text-xl font-black text-white">{b.t}</p>
                  <p className="text-[10px] text-white/40">{b.s}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            {content.hero.truckImage ? (
              <img
                src={content.hero.truckImage}
                alt="truck"
                className="h-48 w-full rounded-xl object-cover"
              />
            ) : (
              <div className="grid h-48 place-items-center rounded-xl bg-white/5 text-xs text-white/30">
                Sin imagen del camión
              </div>
            )}
            <div className="mt-2 grid grid-cols-3 gap-2">
              {[
                { icon: "📦", t: content.hero.badgeOneTitle, s: content.hero.badgeOneSubtitle },
                { icon: "📍", t: content.hero.badgeTwoTitle, s: content.hero.badgeTwoSubtitle },
                { icon: "🕐", t: content.hero.badgeThreeTitle, s: content.hero.badgeThreeSubtitle },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-1.5 rounded-lg bg-white/5 px-2 py-1.5">
                  <span className="text-xs">{b.icon}</span>
                  <div>
                    <p className="text-[10px] font-black text-white">{b.t}</p>
                    <p className="text-[9px] text-white/40">{b.s}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (section === "services") {
    return (
      <div className="bg-[#060A12] p-8">
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400/80">
            {content.services.eyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-black text-white">{content.services.title}</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-white/50">
            {content.services.description}
          </p>
          <div className="mx-auto mt-2 h-0.5 w-8 bg-red-600" />
        </div>
        <div className="mt-8 grid grid-cols-3 gap-4">
          {serviceItems.map((s, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-white/8 bg-[#0A0F1A]">
              {s.image ? (
                <img src={s.image} alt={s.title} className="h-32 w-full object-cover" />
              ) : (
                <div className="grid h-32 place-items-center bg-white/5 text-xs text-white/20">
                  Sin imagen
                </div>
              )}
              <div className="p-3">
                <p className="text-sm font-black text-white">{s.title}</p>
                <p className="mt-1 text-[10px] leading-relaxed text-white/50">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (section === "fleet") {
  return (
    <div className="bg-[#060A12] p-8">
      <div className="text-center">
        <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400/80">
          {content.fleet.eyebrow}
        </p>

        <h2 className="mt-2 text-3xl font-black text-white">
          {content.fleet.title}
        </h2>

        <p className="mx-auto mt-2 max-w-sm text-sm text-white/50">
          {content.fleet.description}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        {/* Card 1: Vehículos */}
        <div className="rounded-2xl border border-white/8 bg-[#0A0F1A] p-4">
          <p className="mb-3 text-[9px] font-bold uppercase tracking-widest text-white/30">
            Vehículos
          </p>

          <div>
            <p className="text-sm font-black text-white">
              {content.fleet.vehicleOneTitle}
            </p>

            <p className="mt-1 text-[10px] text-white/50">
              {content.fleet.vehicleOneDescription}
            </p>

            {content.fleet.vehicleOneImage ? (
              <img
                src={content.fleet.vehicleOneImage}
                alt={content.fleet.vehicleOneTitle}
                className="mt-3 h-24 w-full rounded-xl object-cover"
              />
            ) : (
              <div className="mt-3 grid h-24 place-items-center rounded-xl bg-white/5 text-[10px] text-white/20">
                Sin imagen
              </div>
            )}
          </div>

          <div className="my-4 h-px w-full bg-white/10" />

          <div>
            <p className="text-sm font-black text-white">
              {content.fleet.vehicleTwoTitle}
            </p>

            <p className="mt-1 text-[10px] text-white/50">
              {content.fleet.vehicleTwoDescription}
            </p>

            {content.fleet.vehicleTwoImage ? (
              <img
                src={content.fleet.vehicleTwoImage}
                alt={content.fleet.vehicleTwoTitle}
                className="mt-3 h-24 w-full rounded-xl object-cover"
              />
            ) : (
              <div className="mt-3 grid h-24 place-items-center rounded-xl bg-white/5 text-[10px] text-white/20">
                Sin imagen
              </div>
            )}
          </div>
        </div>

        {/* Card 2: Seguridad */}
        <div className="rounded-2xl border border-white/8 bg-[#0A0F1A] p-4">
          <p className="text-[9px] font-bold uppercase tracking-widest text-white/30">
            Seguridad
          </p>

          <p className="mt-1 text-sm font-black text-white">
            {content.fleet.safetyTitle}
          </p>

          <p className="mt-1 text-[10px] text-white/50">
            {content.fleet.safetyDescription}
          </p>

          {content.fleet.safetyImage ? (
            <img
              src={content.fleet.safetyImage}
              alt={content.fleet.safetyTitle}
              className="mt-3 h-40 w-full rounded-xl object-contain"
            />
          ) : (
            <div className="mt-3 grid h-40 place-items-center rounded-xl bg-white/5 text-[10px] text-white/20">
              Sin imagen
            </div>
          )}
        </div>

        {/* Card 3: EPP */}
        <div className="rounded-2xl border border-white/8 bg-[#0A0F1A] p-4">
          <p className="text-[9px] font-bold uppercase tracking-widest text-white/30">
            EPP
          </p>

          <p className="mt-1 text-sm font-black text-white">
            {content.fleet.eppTitle}
          </p>

          <p className="mt-1 text-[10px] text-white/50">
            {content.fleet.eppDescription}
          </p>

          {content.fleet.eppImage ? (
            <img
              src={content.fleet.eppImage}
              alt={content.fleet.eppTitle}
              className="mt-3 h-40 w-full rounded-xl object-cover"
            />
          ) : (
            <div className="mt-3 grid h-40 place-items-center rounded-xl bg-white/5 text-[10px] text-white/20">
              Sin imagen
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

  if (section === "cta") {
    return (
      <div className="bg-[#060A12] p-8">
        <div className="rounded-2xl border border-white/8 bg-gradient-to-br from-[#0F1525] to-[#0A0F1A] p-12 text-center">
          <h2 className="text-4xl font-black text-white">{content.cta.title}</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/60">{content.cta.description}</p>
          <button className="mt-6 rounded-full bg-red-600 px-8 py-3 font-black text-white">
            {content.cta.buttonText} →
          </button>
        </div>
      </div>
    );
  }

  if (section === "promo") {
    return (
      <div className="bg-[#060A12] p-8">
        <div className="mb-4 flex items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              content.promo.enabled
                ? "bg-green-500/15 text-green-400"
                : "bg-red-500/15 text-red-400"
            }`}
          >
            {content.promo.enabled ? "● Activa" : "● Inactiva"}
          </span>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/8 bg-[#0A0F1A]">
          {content.promo.image ? (
            <img src={content.promo.image} alt="" className="h-48 w-full object-cover" />
          ) : (
            <div className="grid h-48 place-items-center bg-white/5 text-sm text-white/20">
              Sin imagen de promoción
            </div>
          )}
          <div className="p-6">
            <h3 className="text-2xl font-black text-white">
              {content.promo.title || "Título de la promoción"}
            </h3>
            <p className="mt-2 text-sm text-white/60">
              {content.promo.subtitle || "Descripción de la promoción"}
            </p>
            <button className="mt-4 rounded-full bg-red-600 px-5 py-2.5 text-sm font-black text-white">
              {content.promo.buttonText || "Solicitar Cotización"} →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (section === "general") {
    return (
      <div className="bg-[#060A12] p-8">
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/8 bg-[#0A0F1A] p-5">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-white/30">Marca</p>
            <div className="flex items-center gap-4">
              {content.general.logo ? (
                <img src={content.general.logo} alt="logo" className="h-10 w-auto" />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600/20 text-xs font-black text-red-400">
                  MV
                </div>
              )}
              <p className="text-xl font-black text-white">{content.general.companyName}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/8 bg-[#0A0F1A] p-5">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-white/30">Contacto</p>
            <div className="space-y-2 text-sm text-white/70">
              <p>📞 {content.general.phone}</p>
              <p>✉️ {content.general.email}</p>
              <p>📍 {content.general.address}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/8 bg-[#0A0F1A] p-5">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-white/30">Navegación</p>
            <div className="flex flex-wrap gap-2">
              {[
                content.nav.inicio,
                content.nav.nosotros,
                content.nav.servicios,
                content.nav.flotilla,
                content.nav.contacto,
              ].map((item, i) => (
                <span key={i} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">
                  {item}
                </span>
              ))}
              <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
                {content.nav.cotizar}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (section === "footer") {
    return (
      <div className="bg-[#04070D] p-8">
        <div className="grid grid-cols-4 gap-6 border-b border-white/8 pb-8">
          <div className="col-span-1">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-red-600/20 text-sm">
                🚛
              </div>
              <p className="text-sm font-black text-white">{content.general.companyName}</p>
            </div>
            <p className="text-xs leading-relaxed text-white/40">{content.footer.description}</p>
          </div>
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white/30">Secciones</p>
            <div className="space-y-2 text-xs text-white/50">
              {[content.nav.inicio, content.nav.nosotros, content.nav.servicios, content.nav.flotilla, content.nav.contacto].map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white/30">Contacto</p>
            <div className="space-y-2 text-xs text-white/50">
              <p>{content.footer.phoneLabel} {content.general.phone}</p>
              <p>{content.footer.emailLabel} {content.general.email}</p>
              <p>{content.footer.addressLabel} {content.general.address}</p>
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white/30">Legal</p>
            <div className="space-y-2 text-xs text-white/50">
              <p>Aviso de privacidad</p>
              <p>Términos y condiciones</p>
            </div>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <p className="text-[10px] text-white/30">{content.footer.rights}</p>
          <button className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-white/40">
            {content.footer.backToTop} ↑
          </button>
        </div>
      </div>
    );
  }

  return null;
}

// ─── Small UI components ─────────────────────────────────────────────────────

function EditorGroup({ children }: { children: React.ReactNode }) {
  return <div className="space-y-4">{children}</div>;
}

function GroupTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-base font-black text-white">{children}</h2>;
}

function GroupDesc({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-white/40">{children}</p>;
}

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">{label}</span>
      <div className="h-px flex-1 bg-white/8" />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  help,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  help?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-white/50">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/8 bg-black/30 px-3 py-2.5 text-sm text-white outline-none transition focus:border-red-500/50 focus:ring-1 focus:ring-red-500/10"
      />
      {help && <p className="mt-1 text-[10px] text-white/25">{help}</p>}
    </div>
  );
}

function TextareaField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-white/50">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full resize-none rounded-xl border border-white/8 bg-black/30 px-3 py-2.5 text-sm text-white outline-none transition focus:border-red-500/50 focus:ring-1 focus:ring-red-500/10"
      />
    </div>
  );
}

function CheckboxField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/8 bg-black/20 px-4 py-3">
      <span className="text-sm font-semibold text-white/70">{label}</span>
      <div
        onClick={() => onChange(!checked)}
        className={`relative h-5 w-9 rounded-full transition ${
          checked ? "bg-red-600" : "bg-white/10"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </div>
    </label>
  );
}

function ImageUploadField({
  label,
  value,
  onChange,
  help,
  folder = "uploads",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  help?: string;
  folder?: string;
}) {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Selecciona un archivo de imagen válido.");
      return;
    }

    const maxSizeMb = 8;
    const fileSizeMb = file.size / 1024 / 1024;

    if (fileSizeMb > maxSizeMb) {
      alert(`La imagen pesa demasiado. Máximo permitido: ${maxSizeMb} MB.`);
      return;
    }

    setUploading(true);

    const extension = file.name.split(".").pop() || "png";
    const cleanName = file.name
      .replace(/\.[^/.]+$/, "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const filePath = `${folder}/${Date.now()}-${cleanName}.${extension}`;

    const { error } = await supabase.storage
      .from("site-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Error subiendo imagen:", error);
      alert(`No se pudo subir la imagen: ${error.message}`);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("site-images")
      .getPublicUrl(filePath);

    onChange(data.publicUrl);

    alert("Imagen subida correctamente. Ahora da clic en Guardar cambios.");
    setUploading(false);

    event.target.value = "";
  }

  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-white/50">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/8 bg-black/30 px-3 py-2.5 text-sm text-white outline-none transition focus:border-red-500/50 focus:ring-1 focus:ring-red-500/10"
        placeholder="Ruta o URL de imagen"
      />

      {help && <p className="mt-1 text-[10px] text-white/25">{help}</p>}

      <div className="mt-3">
        <label className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-white/70 transition hover:bg-white/10 hover:text-white">
          {uploading ? "Subiendo imagen..." : "Subir imagen"}
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-black/30">
        {value ? (
          <img
            src={value}
            alt={label}
            className="h-40 w-full object-cover"
          />
        ) : (
          <div className="grid h-40 place-items-center text-xs text-white/30">
            Sin imagen seleccionada
          </div>
        )}
      </div>
    </div>
  );
}