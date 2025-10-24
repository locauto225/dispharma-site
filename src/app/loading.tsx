

// src/app/loading.tsx
export default function GlobalLoading() {
  return (
    <main className="min-h-dvh grid place-items-center bg-white text-neutral-900" aria-busy="true" aria-live="polite">
      <div className="relative">
        {/* Halo dégradé animé */}
        <div className="absolute -inset-10 bg-gradient-to-r from-orange-100 via-orange-200 to-orange-100 rounded-full blur-2xl opacity-60 motion-safe:animate-pulse" />

        {/* Carte centrale */}
        <div className="relative z-10 flex flex-col items-center justify-center rounded-2xl border bg-white/80 backdrop-blur p-8 shadow-sm">
          {/* Pictogramme pilule (charte Dispharma) */}
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-orange-600" aria-hidden="true">
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0" stopColor="#fb923c" />
                  <stop offset="1" stopColor="#ea580c" />
                </linearGradient>
              </defs>
              <path d="M4.5 13.5l5-5a4.243 4.243 0 116 6l-5 5a4.243 4.243 0 11-6-6z" fill="url(#g)" />
            </svg>
          </div>

          {/* Spinner double anneau */}
          <div className="relative" role="status" aria-label="Chargement en cours">
            <div className="h-10 w-10 rounded-full border-2 border-orange-200" />
            <div className="absolute inset-0 h-10 w-10 rounded-full border-2 border-orange-500 border-t-transparent motion-safe:animate-spin" />
          </div>

          <p className="mt-4 text-sm text-neutral-600">Chargement…</p>
        </div>
      </div>

      {/* Barre de progression top */}
      <div className="fixed left-0 right-0 top-0 z-50">
        <div className="h-0.5 w-full overflow-hidden bg-transparent">
          <div className="h-0.5 w-1/3 motion-safe:animate-[loading_1.2s_ease-in-out_infinite] bg-gradient-to-r from-orange-400 to-orange-600" />
        </div>
      </div>

      {/* Keyframes & prefers-reduced-motion guard */}
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(50%); }
          100% { transform: translateX(120%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .motion-safe\\:animate-spin,
          .motion-safe\\:animate-pulse,
          .motion-safe\\:animate-[loading_1.2s_ease-in-out_infinite] {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}