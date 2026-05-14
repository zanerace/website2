import { useRef, memo } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Quick Audit',
    description:
      'Send me your website, social page, or Google listing. I review everything a customer sees and send you a blunt first-pass report.',
    detail: 'Free, no commitment',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Scope & Price',
    description:
      'We pick the fixes that matter most. I quote a clear price — no mystery packages, no bloated retainers. You approve before anything starts.',
    detail: 'Transparent pricing',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'I Fix It',
    description:
      'I clean up your website, visuals, menus, social pages, or listing. You get progress updates and revisions until it looks right.',
    detail: '1–2 week turnaround',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1m0 0L11.42 4.97m-5.1 5.1H21M3 21h18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'You Look Sharp',
    description:
      'Your online presence matches your real-life quality. Customers trust what they see before they even walk in.',
    detail: 'Ongoing support optional',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
];

export default memo(function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const elements = sectionRef.current.querySelectorAll('.reveal-process');
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

      const line = sectionRef.current.querySelector('.timeline-line');
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          },
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-24 sm:py-32 md:py-44 bg-black overflow-hidden"
    >
      {/* Section divider */}
      <div className="section-divider absolute top-0 inset-x-0" />

      <div className="max-w-6xl mx-auto pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] sm:px-6">
        {/* Header */}
        <div className="reveal-process text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="font-grotesk text-[11px] tracking-[0.3em] text-gold font-medium">
              02
            </span>
            <span className="h-px w-10 bg-gold/40" />
            <span className="font-grotesk text-[11px] tracking-[0.3em] text-gold/80 font-medium uppercase">
              How It Works
            </span>
          </div>
          <h2 className="font-clash font-semibold text-white text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.08] tracking-[-0.02em] mb-5">
            Four steps to looking sharp online.
          </h2>
          <p className="font-grotesk font-light text-white/40 text-lg max-w-xl mx-auto">
            No mystery process. No drawn-out timelines. Simple, direct, and done.
          </p>
        </div>

        {/* Steps grid */}
        <div className="relative">
          {/* Vertical timeline line — desktop only */}
          <div className="timeline-line hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/30 via-gold/15 to-transparent origin-top" />

          <div className="grid gap-8 lg:gap-0">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={step.number}
                  className={`reveal-process relative lg:grid lg:grid-cols-2 lg:gap-16 ${
                    i > 0 ? 'lg:mt-[-2rem]' : ''
                  }`}
                >
                  {/* Timeline dot — desktop */}
                  <div className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 z-10 w-10 h-10 rounded-full bg-black border border-gold/40 items-center justify-center">
                    <span className="w-3 h-3 rounded-full bg-gold/60" />
                  </div>

                  {/* Card */}
                  <div
                    className={`group ${
                      isEven
                        ? 'lg:col-start-1 lg:pr-16'
                        : 'lg:col-start-2 lg:pl-16'
                    }`}
                  >
                    <div className="glass-surface rounded-2xl p-7 md:p-9 transition-all duration-500 hover:border-gold/20 hover:shadow-card-hover">
                      {/* Top row */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gold/[0.07] border border-gold/15 flex items-center justify-center text-gold/70 group-hover:bg-gold/[0.12] group-hover:text-gold transition-all duration-300">
                          {step.icon}
                        </div>
                        <span className="font-clash font-semibold text-white/10 text-5xl leading-none group-hover:text-gold/15 transition-colors duration-500">
                          {step.number}
                        </span>
                      </div>

                      <h3 className="font-clash font-semibold text-white text-2xl md:text-[1.75rem] tracking-tight mb-3">
                        {step.title}
                      </h3>
                      <p className="font-grotesk font-light text-white/50 text-[15px] leading-[1.7] mb-5">
                        {step.description}
                      </p>

                      {/* Detail badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/20 bg-gold/[0.04]">
                        <span className="w-1 h-1 rounded-full bg-gold" />
                        <span className="font-grotesk text-[11px] tracking-[0.15em] text-gold/80 uppercase">
                          {step.detail}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
})
