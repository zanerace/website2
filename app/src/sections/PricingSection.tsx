import { useRef, memo } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PricingTier {
  name: string;
  price: string;
  decisionTag: string;
  fit: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Starter Cleanup',
    price: '$500–$900',
    decisionTag: 'LOW-RISK START',
    fit: 'Best if you need the basics fixed fast',
    description:
      'Get the basics fixed fast so your business stops looking outdated online.',
    features: [
      'Simple landing page or site refresh',
      'Basic visual cleanup',
      'Social profile refresh',
      'Google Business polish',
    ],
    cta: 'Choose starter',
  },
  {
    name: 'Full Cleanup',
    price: '$1,000–$2,000',
    decisionTag: 'MAIN RESET',
    fit: 'Best for a full first-impression reset',
    description:
      'The full first-impression reset: website, visuals, menus, social pages, and listing polish.',
    features: [
      'Website or landing page',
      'Photos or video',
      'Menu / flyer cleanup',
      'Social visuals',
      'Google Business polish',
      'Basic brand consistency',
    ],
    highlighted: true,
    cta: 'Choose full cleanup',
  },
  {
    name: 'Monthly Support',
    price: '$100–$500/mo',
    decisionTag: 'OPTIONAL ONGOING',
    fit: 'Best for keeping everything current month to month',
    description:
      'Keep everything from going stale again with ongoing light updates each month.',
    features: [
      'Posts and graphics',
      'Edits and promos',
      'Website tweaks',
      'Seasonal refreshes',
    ],
    cta: 'Choose monthly support',
  },
];

interface PricingSectionProps {
  onScrollTo: (target: string) => void;
}

export default memo(function PricingSection({ onScrollTo }: PricingSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const headerEls = sectionRef.current.querySelectorAll('.reveal-header');
      headerEls.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        );
      });

      const cards = sectionRef.current.querySelectorAll('.pricing-card');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
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
      id="pricing"
      className="relative py-32 md:py-44 bg-black overflow-hidden"
    >
      <div className="section-divider absolute top-0 inset-x-0" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="reveal-header flex items-center justify-center gap-3 mb-5">
            <span className="font-grotesk text-[11px] tracking-[0.3em] text-gold font-medium">
              05
            </span>
            <span className="h-px w-10 bg-gold/40" />
            <span className="font-grotesk text-[11px] tracking-[0.3em] text-gold/80 font-medium uppercase">
              Pricing
            </span>
          </div>
          <h2 className="reveal-header font-clash font-semibold text-white text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.08] tracking-[-0.02em] mb-5">
            Pick the level of cleanup you need.
          </h2>
          <p className="reveal-header font-grotesk font-light text-white/40 text-lg max-w-lg mx-auto">
            Starter = basics fixed. Full Cleanup = full reset. Monthly = keep it
            fresh.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-start">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`pricing-card group relative rounded-2xl p-7 md:p-8 transition-all duration-500 ${
                tier.highlighted
                  ? 'glass-surface-strong border-gold/30 hover:border-gold/50 hover:shadow-glow md:scale-[1.03] md:-my-3'
                  : 'glass-surface hover:border-white/15 hover:bg-white/[0.05]'
              }`}
            >
              {/* Popular badge */}
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="font-grotesk font-medium text-black bg-gold text-[10px] tracking-[0.2em] px-4 py-1.5 rounded-full shadow-glow">
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Gold top accent for highlighted */}
              {tier.highlighted && (
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
              )}

              <p className="font-grotesk font-medium text-white/35 text-[11px] tracking-[0.2em] uppercase mb-4">
                {tier.decisionTag}
              </p>

              <h3 className="font-clash font-semibold text-white text-xl md:text-2xl tracking-tight mb-2">
                {tier.name}
              </h3>

              <p className="font-clash font-semibold text-gold text-3xl md:text-4xl mb-4">
                {tier.price}
              </p>

              <p className="font-grotesk font-medium text-white/70 text-sm mb-1.5">
                {tier.fit}
              </p>

              <p className="font-grotesk font-light text-white/35 text-sm leading-relaxed mb-7">
                {tier.description}
              </p>

              <div className="h-px bg-white/[0.06] mb-6" />

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="font-grotesk font-light text-white/60 text-[14px] flex items-start gap-3"
                  >
                    <svg
                      className="w-4 h-4 text-gold/70 flex-shrink-0 mt-0.5"
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
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onScrollTo('#contact')}
                className={`w-full font-grotesk font-medium text-[15px] tracking-wide py-4 px-6 rounded-full transition-all duration-300 ${
                  tier.highlighted
                    ? 'bg-gold text-black hover:bg-gold-hover hover:shadow-glow-lg'
                    : 'bg-white/[0.04] text-white/80 hover:bg-white/[0.08] hover:text-white border border-white/[0.08] hover:border-white/15'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="reveal-header text-center mt-14">
          <p className="font-grotesk font-light text-white/25 text-sm">
            No bloated retainers. No mystery packages. Scope first, then price.
          </p>
        </div>
      </div>
    </section>
  );
})
