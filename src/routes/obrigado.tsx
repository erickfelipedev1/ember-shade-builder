import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import logo4s from "@/assets/logo-4s.png.asset.json";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export const Route = createFileRoute("/obrigado")({
  head: () => ({
    meta: [
      { title: "Obrigado! | Jornada 4S" },
      {
        name: "description",
        content:
          "Recebemos seu contato com sucesso. Nossa equipe da Jornada 4S vai falar com você em breve. Siga a gente no Instagram @jornada4s.",
      },
      { property: "og:title", content: "Obrigado! | Jornada 4S" },
      {
        property: "og:description",
        content:
          "Recebemos seu contato com sucesso. Nossa equipe da Jornada 4S vai falar com você em breve. Siga a gente no Instagram @jornada4s.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Obrigado! | Jornada 4S" },
      {
        name: "twitter:description",
        content:
          "Recebemos seu contato com sucesso. Siga a gente no Instagram @jornada4s.",
      },
    ],
  }),
  component: ObrigadoPage,
});

function ObrigadoPage() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "lead_gerado" });
  }, []);
  return (
    <main className="min-h-screen bg-[#040D1E] text-white flex flex-col items-center justify-center px-4 py-16">
      <img
        src={logo4s.url}
        alt="Jornada 4S"
        className="h-14 sm:h-16 w-auto mb-8"
        width={120}
        height={56}
      />

      <div className="text-center max-w-xl">
        <span className="inline-block text-[#FF8A5C] font-semibold text-xs sm:text-sm uppercase tracking-wider mb-4 border border-[#FF4B12]/30 rounded-full px-4 py-1.5 bg-[#FF4B12]/10">
          Contato recebido
        </span>

        <h1 className="font-display text-3xl sm:text-4xl font-extrabold leading-tight">
          Obrigado pelo seu contato!
        </h1>

        <p className="mt-4 text-white/70 text-base sm:text-lg leading-relaxed">
          Recebemos sua mensagem com sucesso. Nossa equipe da{" "}
          <span className="text-white font-semibold">Jornada 4S</span> vai falar
          com você em breve para dar o próximo passo da sua importação.
        </p>

        <p className="mt-3 text-white/60 text-sm">
          Enquanto isso, acompanhe a gente no Instagram e fique por dentro de
          conteúdos sobre importação da China.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://instagram.com/jornada4s"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#FF4B12] to-[#FF8A5C] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#FF4B12]/20 transition-transform hover:scale-105"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.248 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.248-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.248-2.242-1.31-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.248 3.608-1.31 1.266-.058 1.646-.07 4.85-.07zM12 0C8.741 0 8.332.014 7.052.072 5.775.13 4.602.396 3.635 1.363 2.668 2.33 2.402 3.503 2.344 4.78.014 8.332 0 8.741 0 12s.014 3.668.072 4.948c.058 1.277.324 2.45 1.291 3.417.967.967 2.14 1.233 3.417 1.291C8.332 21.986 8.741 22 12 22s3.668-.014 4.948-.072c1.277-.058 2.45-.324 3.417-1.291.967-.967 1.233-2.14 1.291-3.417.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.058-1.277-.324-2.45-1.291-3.417-.967-.967-2.14-1.233-3.417-1.291C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            Seguir @jornada4s
          </a>

          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/5"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </main>
  );
}
