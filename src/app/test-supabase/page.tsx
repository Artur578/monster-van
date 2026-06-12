import { getSiteContent } from "@/lib/siteContent";

export const dynamic = "force-dynamic";

export default async function TestSupabasePage() {
  const content = await getSiteContent();

  return (
    <main className="min-h-screen bg-slate-950 p-10 text-white">
      <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-8">
        <p className="mb-4 text-sm font-semibold text-green-400">
          Conexión a Supabase funcionando
        </p>

        <h1 className="text-4xl font-black">
          {content.hero.title}
        </h1>

        <p className="mt-4 text-lg text-white/70">
          {content.hero.subtitle}
        </p>

        <div className="mt-8 rounded-xl bg-black/30 p-4">
          <p>
            <strong>WhatsApp:</strong> {content.general.whatsapp}
          </p>
          <p>
            <strong>Correo:</strong> {content.general.email}
          </p>
          <p>
            <strong>Logo:</strong> {content.general.logo}
          </p>
        </div>
      </div>
    </main>
  );
}