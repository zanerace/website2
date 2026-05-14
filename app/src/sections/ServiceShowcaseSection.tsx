import { useRef, useEffect, lazy, Suspense, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { usePrefersReducedMotion } from '../hooks/useViewportPreferences';

gsap.registerPlugin(ScrollTrigger);

const CarouselCanvas = lazy(() => import('./CarouselCanvas'));

const problems = [
  'Outdated website or landing page',
  'Weak or blurry storefront and food/service photos',
  'Messy menu, flyer, or promo visuals',
  'Stale social page with inconsistent posts',
  'Thin Google listing with missing trust signals',
  'Mismatched look across key customer touchpoints',
];

const serviceFixes = [
  {
    title: 'Website / Landing Cleanup',
    detail:
      'Tighten layout, copy, and mobile basics so people trust what they see fast.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
  },
  {
    title: 'Photo + Video Refresh',
    detail:
      'Replace weak visuals with current shots that match your real in-person quality.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
      </svg>
    ),
  },
  {
    title: 'Menu + Flyer Cleanup',
    detail:
      'Clean design, readable hierarchy, and consistent promo pieces customers can scan.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    title: 'Social Page Cleanup',
    detail:
      'Fix profile polish, visual consistency, and post structure so the page looks active.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
  {
    title: 'Google Business Polish',
    detail:
      'Improve listing visuals, basics, and trust cues customers check before visiting.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    title: 'Consistency + Monthly Updates',
    detail:
      'Keep everything aligned and current so your presence does not go stale again.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M21.015 4.356v4.992" />
      </svg>
    ),
  },
];

export default memo(function ServiceShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollSpeedRef = useRef(0);
  const lastScrollRef = useRef(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    let dampenId: number;
    const onScroll = () => {
      const currentScroll = window.scrollY;
      scrollSpeedRef.current = currentScroll - lastScrollRef.current;
      lastScrollRef.current = currentScroll;
    };
    const dampen = () => {
      scrollSpeedRef.current *= 0.95;
      if (Math.abs(scrollSpeedRef.current) < 0.01) scrollSpeedRef.current = 0;
      dampenId = requestAnimationFrame(dampen);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    dampenId = requestAnimationFrame(dampen);
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(dampenId);
    };
  }, [prefersReducedMotion]);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const elements = sectionRef.current.querySelectorAll('.reveal-item');
      elements.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-24 sm:py-32 md:py-44 bg-black overflow-hidden"
    >
      {/* Section divider */}
      <div className="section-divider absolute top-0 inset-x-0" />

      {/* Background: WebGL carousel or lightweight static fallback */}
      <div className="absolute inset-0 z-0">
        {!prefersReducedMotion ? (
          <Suspense fallback={null}>
            <CarouselCanvas scrollSpeedRef={scrollSpeedRef} />
          </Suspense>
        ) : (
          <div
            className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-black to-black"
            aria-hidden
          />
        )}
      </div>

      {/* Overlay — slightly stronger when no WebGL so panels stay readable */}
      <div
        className={`absolute inset-0 z-[1] ${prefersReducedMotion ? 'bg-black/75' : 'bg-black/55'}`}
      />

      {/* Content */}
      <div className="relative z-10 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Problems panel */}
          <div className="flex items-center justify-center min-h-[min(70dvh,560px)] sm:min-h-[60vh] mb-16 sm:mb-20">
            <div className="glass-surface-strong rounded-2xl p-6 sm:p-8 md:p-12 max-w-2xl w-full">
              <div className="reveal-item flex items-center gap-3 mb-6">
                <span className="font-grotesk text-[11px] tracking-[0.3em] text-gold font-medium">
                  03
                </span>
                <span className="h-px w-10 bg-gold/40" />
                <span className="font-grotesk text-[11px] tracking-[0.3em] text-gold/80 font-medium uppercase">
                  Visual Audit
                </span>
              </div>

              <h3 className="reveal-item font-clash font-semibold text-white text-[clamp(1.5rem,3.5vw,2.25rem)] leading-tight tracking-tight mb-4">
                These are the screens
                <br />
                making customers hesitate.
              </h3>

              <p className="reveal-item font-grotesk font-light text-white/60 text-base md:text-lg leading-relaxed mb-8">
                Before people visit, they judge your website, photos, menus,
                social pages, and Google listing. If those look stale, trust
                drops.
              </p>

              <ul className="space-y-3.5">
                {problems.map((problem) => (
                  <li
                    key={problem}
                    className="reveal-item font-grotesk font-light text-white/80 text-[15px] md:text-base leading-relaxed flex items-center gap-3"
                  >
                    <span className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0" />
                    {problem}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Service fixes grid */}
          <div className="reveal-item glass-surface rounded-2xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-grotesk text-[11px] tracking-[0.3em] text-gold font-medium">
                03
              </span>
              <span className="h-px w-10 bg-gold/40" />
              <span className="font-grotesk text-[11px] tracking-[0.3em] text-gold/80 font-medium uppercase">
                Service Menu
              </span>
            </div>

            <h3 className="font-clash font-semibold text-white text-[clamp(1.7rem,3vw,2.3rem)] leading-tight tracking-tight mb-3">
              Simple fixes, not bloated agency packages.
            </h3>
            <p className="font-grotesk font-light text-white/40 text-base md:text-lg leading-relaxed mb-10">
              I fix websites, photos, menus, social pages, Google Business
              details, and basic consistency.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {serviceFixes.map((item) => (
                <div
                  key={item.title}
                  className="group glass-surface rounded-xl p-6 transition-all duration-500 hover:border-gold/20 hover:bg-white/[0.05]"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold/[0.07] border border-gold/15 flex items-center justify-center text-gold/70 mb-5 group-hover:bg-gold/[0.12] group-hover:text-gold transition-all duration-300">
                    {item.icon}
                  </div>
                  <p className="font-grotesk font-medium text-white text-lg mb-2 tracking-tight">
                    {item.title}
                  </p>
                  <p className="font-grotesk font-light text-white/40 text-[14px] leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
})
