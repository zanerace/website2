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
    <section ref={sectionRef} className="relative py-32 md:py-44 bg-black overflow-hidden">
      {/* Subtle top glow */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(244,189,3,0.15), transparent)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
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

            {/* Stats on desktop */}
            <div className="reveal-text hidden lg:flex flex-col gap-8 mt-12">
              {[
                { stat: '75%', label: 'of consumers judge credibility by website design' },
                { stat: '3s', label: 'to make a first impression online' },
                { stat: '88%', label: 'won’t return after a bad experience' },
              ].map((item) => (
                <div key={item.stat} className="flex items-start gap-4">
                  <span className="font-clash font-semibold text-gold text-3xl leading-none">
                    {item.stat}
                  </span>
                  <span className="font-grotesk font-light text-white/40 text-sm leading-snug max-w-[200px]">
                    {item.label}
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

            {/* Mobile stats */}
            <div className="reveal-text lg:hidden flex flex-wrap gap-6 mt-10 pt-8 border-t border-white/[0.06]">
              {[
                { stat: '75%', label: 'judge by design' },
                { stat: '3s', label: 'first impression' },
                { stat: '88%', label: 'won’t return' },
              ].map((item) => (
                <div key={item.stat} className="flex items-center gap-3">
                  <span className="font-clash font-semibold text-gold text-2xl">
                    {item.stat}
                  </span>
                  <span className="font-grotesk font-light text-white/35 text-xs leading-tight">
                    {item.label}
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
