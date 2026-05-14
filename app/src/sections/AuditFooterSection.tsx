import { useRef, useState, memo } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FORMSPREE_ID = (import.meta.env.VITE_FORMSPREE_ID ?? '').trim();
const CONTACT_EMAIL =
  (import.meta.env.VITE_CONTACT_EMAIL ?? 'hello@racedigital.com').trim();

export default memo(function AuditFooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const elements = sectionRef.current.querySelectorAll('.reveal-audit');
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
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    if (!FORMSPREE_ID) {
      setError(
        `Form is not connected yet. Add VITE_FORMSPREE_ID in Vercel (see .env.example), or email ${CONTACT_EMAIL} directly.`,
      );
      setSubmitting(false);
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      const json = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (res.ok && json?.ok !== false) {
        setSubmitted(true);
        form.reset();
      } else {
        const msg =
          typeof json?.error === 'string' && json.error
            ? json.error
            : 'Something went wrong. Please try again or email directly.';
        setError(msg);
      }
    } catch {
      setError('Network error. Please try again or email directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClasses =
    'w-full bg-white/[0.03] border border-white/[0.08] focus:border-gold/60 focus:bg-white/[0.05] text-white font-grotesk font-light text-base py-4 px-5 rounded-xl outline-none transition-all duration-300 placeholder:text-white/20';

  return (
    <section ref={sectionRef} id="contact" className="relative py-24 sm:py-32 md:py-44 bg-black">
      <div className="section-divider absolute top-0 inset-x-0" />

      {/* Gold gradient glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 60% 40% at 30% 30%, rgba(244, 189, 3, 0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-12 lg:gap-20">
          {/* Left - Copy */}
          <div>
            <div className="reveal-audit flex items-center gap-3 mb-6">
              <span className="font-grotesk text-[11px] tracking-[0.3em] text-gold font-medium">
                06
              </span>
              <span className="h-px w-10 bg-gold/40" />
              <span className="font-grotesk text-[11px] tracking-[0.3em] text-gold/80 font-medium uppercase">
                Quick Audit
              </span>
            </div>

            <h2 className="reveal-audit font-clash font-semibold text-white text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.08] tracking-[-0.02em] mb-6 max-w-xl">
              Send your business name, link, and what feels broken.
            </h2>

            <p className="reveal-audit font-grotesk font-light text-white/50 text-lg leading-relaxed mb-10">
              I'll give you a blunt first-pass audit and tell you what I'd fix
              first. Free, no obligation.
            </p>

            {/* What you get card */}
            <div className="reveal-audit glass-surface rounded-xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span className="font-grotesk font-medium text-gold text-[11px] tracking-[0.2em] uppercase">
                  What You Get
                </span>
              </div>
              <p className="font-grotesk font-light text-white/40 text-[15px] leading-relaxed">
                A direct list of what looks outdated, what hurts trust, and the
                first fixes I'd make. Most forms take under a minute.
              </p>
            </div>

            {/* Trust signals */}
            <div className="reveal-audit flex flex-wrap gap-4">
              {['Free audit', 'No commitment', '24h response'].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-[13px] font-grotesk text-white/30"
                >
                  <svg
                    className="w-3.5 h-3.5 text-gold/50"
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

          {/* Right - Form */}
          <div className="reveal-audit">
            {submitted ? (
              <div className="glass-surface-strong rounded-2xl p-8 md:p-10 min-h-[min(72dvh,520px)] sm:min-h-[420px] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-gold/[0.08] border border-gold/20 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-clash font-semibold text-white text-2xl mb-3">
                  Audit request sent!
                </h3>
                <p className="font-grotesk font-light text-white/40 text-base max-w-sm">
                  I'll review your online presence and get back to you within 24
                  hours with actionable feedback.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="relative glass-surface-strong rounded-2xl p-6 sm:p-7 md:p-9 min-h-[min(72dvh,520px)] sm:min-h-[420px] flex flex-col"
              >
                {!FORMSPREE_ID && (
                  <p className="mb-4 rounded-xl border border-gold/25 bg-gold/[0.06] px-4 py-3 font-grotesk text-sm text-white/70">
                    To receive submissions here, add{' '}
                    <code className="text-gold/90">VITE_FORMSPREE_ID</code> in
                    Vercel env vars (from{' '}
                    <a
                      href="https://formspree.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold underline underline-offset-2 hover:text-gold-hover"
                    >
                      Formspree
                    </a>
                    ). Until then, use{' '}
                    <a
                      href={`mailto:${CONTACT_EMAIL}?subject=Quick%20audit%20request`}
                      className="text-gold underline underline-offset-2 hover:text-gold-hover"
                    >
                      {CONTACT_EMAIL}
                    </a>
                    .
                  </p>
                )}

                {/* Gold accent */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

                <div className="flex items-center justify-between mb-6">
                  <p className="font-grotesk font-light text-white/40 text-sm">
                    Takes under a minute
                  </p>
                  <span className="w-8 h-8 rounded-lg bg-gold/[0.06] border border-gold/15 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-gold/60"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                      />
                    </svg>
                  </span>
                </div>

                <div className="space-y-4 flex-1">
                  <input type="hidden" name="_subject" value="Quick audit — Race Digital" />

                  <div>
                    <label className="font-grotesk font-medium text-white/50 text-[11px] tracking-[0.2em] uppercase mb-2 block">
                      Your Name <span className="text-gold/60">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Smith"
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label className="font-grotesk font-medium text-white/50 text-[11px] tracking-[0.2em] uppercase mb-2 block">
                      Business Name <span className="text-gold/60">*</span>
                    </label>
                    <input
                      type="text"
                      name="business"
                      placeholder="Your Business"
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label className="font-grotesk font-medium text-white/50 text-[11px] tracking-[0.2em] uppercase mb-2 block">
                      Website / Social / Google Link{' '}
                      <span className="text-gold/60">*</span>
                    </label>
                    <input
                      type="text"
                      name="link"
                      placeholder="https://your-site.com or @instagram"
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label className="font-grotesk font-medium text-white/50 text-[11px] tracking-[0.2em] uppercase mb-2 block">
                      What feels broken?
                    </label>
                    <textarea
                      name="needs"
                      placeholder="Old website, blurry photos, outdated menu, inactive social page..."
                      rows={3}
                      className={`${inputClasses} resize-none`}
                    />
                  </div>

                  <div>
                    <label className="font-grotesk font-medium text-white/50 text-[11px] tracking-[0.2em] uppercase mb-2 block">
                      Best Contact Email <span className="text-gold/60">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@email.com"
                      required
                      className={inputClasses}
                    />
                  </div>
                </div>

                {error && (
                  <p className="font-grotesk text-red-400 text-sm mt-4">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting || !FORMSPREE_ID}
                  className="mt-6 w-full font-grotesk font-medium text-black bg-gold hover:bg-gold-hover text-[15px] tracking-wide py-4 min-h-[48px] rounded-full transition-all duration-300 hover:shadow-glow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none inline-flex items-center justify-center"
                >
                  {submitting
                    ? 'Sending...'
                    : FORMSPREE_ID
                      ? 'Get my free audit'
                      : 'Connect form to submit'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
})
