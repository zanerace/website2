import { useRef, memo } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default memo(function StatementSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const elements = sectionRef.current.querySelectorAll('.reveal-text');
      elements.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 md:py-44 bg-black overflow-hidden">
      {/* Subtle top glow */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(244,189,3,0.15), transparent)',
        }}
      />

      <div className="max-w-6xl mx-auto pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] sm:px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left eyebrow column */}
          <div className="lg:col-span-4">
            <div className="reveal-text flex items-center gap-3 mb-8 lg:mb-0">
              <span className="font-grotesk text-[11px] tracking-[0.3em] text-gold font-medium">
                01
              </span>
              <span className="h-px w-10 bg-gold/40" />
              <span className="font-grotesk text-[11px] tracking-[0.3em] text-gold/80 font-medium uppercase">
                The Reality
              </span>
            </div>

            {/* Principles — no unverified statistics */}
            <div className="reveal-text hidden lg:flex flex-col gap-8 mt-12">
              {[
                {
                  title: 'People skim first',
                  body: 'Your website, photos, listing, and social are usually judged before a phone call or visit.',
                },
                {
                  title: 'Consistency builds trust',
                  body: 'When those touchpoints look mismatched or neglected, doubt creeps in fast.',
                },
                {
                  title: 'You stay focused on the shop',
                  body: 'I handle the visible online cleanup so it matches how good you already are in person.',
                },
              ].map((item) => (
                <div key={item.title} className="flex flex-col gap-2">
                  <span className="font-grotesk font-medium text-gold/90 text-sm tracking-wide">
                    {item.title}
                  </span>
                  <span className="font-grotesk font-light text-white/40 text-sm leading-snug max-w-[240px]">
                    {item.body}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right content column */}
          <div className="lg:col-span-8">
            <h2 className="reveal-text font-clash font-semibold text-white text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.08] tracking-[-0.02em] mb-8">
              You are great at what you do.
              <br />
              <span className="text-white/50">People judge you online first.</span>
            </h2>

            <div className="reveal-text h-px w-16 bg-gold/40 mb-8" />

            <p className="reveal-text font-grotesk font-light text-[#b0b0b0] text-lg md:text-xl leading-[1.75] max-w-2xl">
              Before people call, book, order, or walk in, they check your website,
              photos, menus, social pages, and Google listing. If those look stale
              or inconsistent, trust drops before you ever get the chance to win
              them over.
            </p>

            <p className="reveal-text font-grotesk font-light text-white/30 text-base leading-[1.75] max-w-2xl mt-6">
              Most owners are busy running the business. That's where I come in
              &mdash; I fix what customers actually see.
            </p>

            {/* Mobile: same ideas, compact */}
            <div className="reveal-text lg:hidden flex flex-col gap-5 mt-10 pt-8 border-t border-white/[0.06]">
              {[
                { title: 'Skim first', body: 'Site, photos, listing, social — judged early.' },
                { title: 'Consistency', body: 'Mismatched visuals cost trust fast.' },
                { title: 'You run the business', body: 'I clean up what customers see online.' },
              ].map((item) => (
                <div key={item.title} className="flex flex-col gap-1">
                  <span className="font-grotesk font-medium text-gold/90 text-sm">{item.title}</span>
                  <span className="font-grotesk font-light text-white/35 text-sm leading-snug">
                    {item.body}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
})
