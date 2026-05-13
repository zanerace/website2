import { useRef, useState, memo } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Race Digital took our outdated website and turned it into something I'm actually proud to share. Customers started commenting on how professional we look within the first week.",
    name: 'Sarah Mitchell',
    role: 'Owner, Mitchell\'s Bakery',
    initials: 'SM',
  },
  {
    quote:
      "I was spending hours trying to fix my own Google listing and social pages. Race handled everything in a few days and the difference was night and day. Simple, fast, no BS.",
    name: 'James Torres',
    role: 'Manager, Torres Auto Care',
    initials: 'JT',
  },
  {
    quote:
      "The before and after of our menu design alone was worth it. But they also fixed our website, cleaned up our Instagram, and polished our Google page. Everything finally matches.",
    name: 'Priya Sharma',
    role: 'Co-owner, Spice Route Kitchen',
    initials: 'PS',
  },
  {
    quote:
      "I kept putting off fixing our online presence because every agency quoted me $10k+. Race gave me a clear price, did the work fast, and it actually looks premium. Best money I've spent this year.",
    name: 'Mike Chen',
    role: 'Owner, Chen\'s Martial Arts',
    initials: 'MC',
  },
];

export default memo(function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const elements = sectionRef.current.querySelectorAll('.reveal-test');
      elements.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  const active = testimonials[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-32 md:py-44 bg-black overflow-hidden"
    >
      <div className="section-divider absolute top-0 inset-x-0" />

      {/* Subtle gold glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(244, 189, 3, 0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto px-6 relative">
        {/* Header */}
        <div className="reveal-test text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="font-grotesk text-[11px] tracking-[0.3em] text-gold font-medium">
              04
            </span>
            <span className="h-px w-10 bg-gold/40" />
            <span className="font-grotesk text-[11px] tracking-[0.3em] text-gold/80 font-medium uppercase">
              Testimonials
            </span>
          </div>
          <h2 className="font-clash font-semibold text-white text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.08] tracking-[-0.02em] mb-5">
            What business owners say.
          </h2>
          <p className="font-grotesk font-light text-white/40 text-lg max-w-lg mx-auto">
            Real results from real local businesses.
          </p>
        </div>

        {/* Featured quote */}
        <div className="reveal-test glass-surface rounded-2xl p-8 md:p-12 lg:p-16 text-center relative">
          {/* Gold accent line */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

          {/* Quote mark */}
          <div className="mb-8">
            <span className="font-clash font-semibold text-gold/20 text-7xl md:text-8xl leading-none select-none">
              &ldquo;
            </span>
          </div>

          {/* Quote text */}
          <p
            className="font-grotesk font-light text-white/80 text-lg md:text-xl lg:text-2xl leading-[1.65] max-w-3xl mx-auto mb-10 transition-opacity duration-300"
            key={activeIndex}
          >
            {active.quote}
          </p>

          {/* Author */}
          <div className="flex flex-col items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-full bg-gold/[0.1] border border-gold/20 flex items-center justify-center">
              <span className="font-grotesk font-medium text-gold text-sm">
                {active.initials}
              </span>
            </div>
            <div className="text-center">
              <p className="font-grotesk font-medium text-white text-base">
                {active.name}
              </p>
              <p className="font-grotesk text-white/35 text-sm">{active.role}</p>
            </div>
          </div>

          {/* Dot navigation */}
          <div className="flex items-center justify-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`View testimonial ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  i === activeIndex
                    ? 'w-8 h-2 bg-gold'
                    : 'w-2 h-2 bg-white/15 hover:bg-white/25'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className="reveal-test mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '50+', label: 'Projects completed' },
            { value: '24h', label: 'Avg response time' },
            { value: '98%', label: 'Client satisfaction' },
            { value: '2wk', label: 'Avg delivery time' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center py-6 px-4 rounded-xl border border-white/[0.04] bg-white/[0.01]"
            >
              <p className="font-clash font-semibold text-gold text-2xl md:text-3xl mb-1">
                {stat.value}
              </p>
              <p className="font-grotesk text-white/30 text-xs tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
})
