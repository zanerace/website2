import { useCallback, useEffect, useState } from 'react';

interface NavigationProps {
  lenisRef: React.MutableRefObject<any>;
}

export default function Navigation({ lenisRef }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = useCallback(
    (target: string) => {
      setMobileOpen(false);
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { duration: 1.2, offset: -80 });
      }
    },
    [lenisRef],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  const navLinks = [
    { label: 'SERVICES', target: '#services' },
    { label: 'PROCESS', target: '#process' },
    { label: 'PRICING', target: '#pricing' },
    { label: 'TESTIMONIALS', target: '#testimonials' },
    { label: 'CONTACT', target: '#contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || mobileOpen
            ? 'bg-black/70 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_1px_0_0_rgba(255,255,255,0.02)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-6 lg:px-12">
          {/* Logo */}
          <button
            onClick={() => scrollTo('#hero')}
            className="flex items-center gap-3 group"
          >
            <span className="w-8 h-8 rounded-md bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
              <span className="font-clash font-semibold text-gold text-sm">R</span>
            </span>
            <span className="font-grotesk font-bold text-white text-sm tracking-[0.25em] group-hover:text-gold transition-colors duration-300">
              RACE DIGITAL
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.target)}
                className="font-grotesk font-medium text-[#999] text-[13px] tracking-[0.12em] px-4 py-2 rounded-md hover:text-white hover:bg-white/[0.04] transition-all duration-300"
              >
                {link.label}
              </button>
            ))}
            <div className="w-px h-6 bg-white/10 mx-3" />
            <button
              onClick={() => scrollTo('#contact')}
              className="font-grotesk font-medium text-black bg-gold hover:bg-gold-hover text-[13px] tracking-[0.08em] px-6 py-2.5 rounded-full transition-all duration-300 hover:shadow-glow"
            >
              GET AUDIT
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden flex items-center justify-center w-11 h-11 rounded-md hover:bg-white/5 transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span className="relative w-5 h-4 flex flex-col justify-between">
              <span
                className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${
                  mobileOpen ? 'translate-y-[7px] rotate-45' : ''
                }`}
              />
              <span
                className={`block h-[1.5px] bg-white rounded-full transition-all duration-200 ${
                  mobileOpen ? 'opacity-0 scale-x-0' : ''
                }`}
              />
              <span
                className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${
                  mobileOpen ? '-translate-y-[7px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile drawer */}
      <div
        className={`fixed top-20 right-0 bottom-0 z-40 w-full max-w-sm bg-[#0a0a0a]/95 backdrop-blur-2xl border-l border-white/[0.06] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-8">
          <nav className="flex flex-col gap-1 flex-1">
            {navLinks.map((link, i) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.target)}
                className="flex items-center justify-between py-4 border-b border-white/[0.06] group"
                style={{
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? 'translateX(0)' : 'translateX(24px)',
                  transition: `opacity 0.4s ease ${i * 0.06 + 0.15}s, transform 0.4s ease ${i * 0.06 + 0.15}s`,
                }}
              >
                <span className="flex items-center gap-4">
                  <span className="font-grotesk text-[11px] tracking-[0.3em] text-gold/70 w-6">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-grotesk font-medium text-white text-lg tracking-wide group-hover:text-gold transition-colors">
                    {link.label}
                  </span>
                </span>
                <span className="text-white/30 group-hover:text-gold transition-colors text-sm">
                  &rarr;
                </span>
              </button>
            ))}
          </nav>

          <button
            onClick={() => scrollTo('#contact')}
            className="mt-8 w-full font-grotesk font-medium text-black bg-gold hover:bg-gold-hover text-base tracking-wide py-4 rounded-full transition-all duration-300"
            style={{
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.4s ease 0.5s, transform 0.4s ease 0.5s',
            }}
          >
            GET YOUR FREE AUDIT
          </button>
        </div>
      </div>
    </>
  );
}
