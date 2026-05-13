import { lazy, Suspense } from 'react';

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const HeroCanvas = lazy(() => import('./HeroCanvas'));

interface HeroSectionProps {
  onScrollTo: (target: string) => void;
}

export default function HeroSection({ onScrollTo }: HeroSectionProps) {
  const marqueeText =
    'WEBSITES · PHOTOS · MENUS · SOCIAL PAGES · GOOGLE LISTINGS · BRAND CONSISTENCY · ';

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-black grain-overlay"
    >
      {/* Three.js Background Canvas — lazy loaded, skipped for reduced-motion */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 z-0">
          <Suspense fallback={null}>
            <HeroCanvas />
          </Suspense>
        </div>
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      <div
        className="absolute inset-0 z-[1] opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(244, 189, 3, 0.08) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto pt-24">
        {/* Availability badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm mb-10">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
          </span>
          <span className="font-grotesk text-[11px] tracking-[0.2em] text-white/70 uppercase">
            Available for new projects
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-clash font-semibold text-white text-[clamp(2.8rem,9vw,7rem)] leading-[0.92] tracking-[-0.03em] mb-7">
          I make local
          <br />
          businesses look
          <br />
          <span className="text-gold">better online.</span>
        </h1>

        {/* Subhead */}
        <p className="font-grotesk font-light text-[#c8c8c8] text-[clamp(1rem,2.2vw,1.25rem)] max-w-2xl leading-[1.7] mb-12">
          I clean up websites, photos, menus, social pages, and Google listings
          &mdash; plus basic consistency for businesses that do great work in real
          life but still look outdated online.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            onClick={() => onScrollTo('#contact')}
            className="group relative font-grotesk font-medium text-black bg-gold hover:bg-gold-hover text-[15px] tracking-[0.04em] px-10 py-4.5 rounded-full transition-all duration-300 hover:shadow-glow-lg overflow-hidden"
          >
            <span className="relative z-10">Get a free audit</span>
          </button>
          <button
            onClick={() => onScrollTo('#services')}
            className="group font-grotesk font-medium text-white/90 border border-white/15 hover:border-gold/50 hover:text-gold text-[15px] tracking-[0.04em] px-10 py-4.5 rounded-full transition-all duration-300 hover:bg-gold/[0.04]"
          >
            <span className="flex items-center justify-center gap-2">
              See services
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </button>
        </div>

        {/* Trust indicators */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {['No contracts', 'Clear pricing', 'Fast turnaround'].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 text-[13px] font-grotesk text-white/40"
            >
              <svg
                className="w-3.5 h-3.5 text-gold/60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Marquee */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/[0.04] py-4 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee will-change-transform">
          <span className="font-grotesk text-[11px] tracking-[0.35em] text-white/20 uppercase">
            {marqueeText.repeat(6)}
          </span>
          <span className="font-grotesk text-[11px] tracking-[0.35em] text-white/20 uppercase">
            {marqueeText.repeat(6)}
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="font-grotesk text-[10px] tracking-[0.3em] text-white/25 uppercase">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  );
}

