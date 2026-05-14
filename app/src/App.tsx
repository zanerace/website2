import { useCallback, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import StatementSection from './sections/StatementSection';
import ProcessSection from './sections/ProcessSection';
import ServiceShowcaseSection from './sections/ServiceShowcaseSection';
import PricingSection from './sections/PricingSection';
import AuditFooterSection from './sections/AuditFooterSection';
import FooterSection from './sections/FooterSection';
import { useCustomCursor } from './hooks/useCustomCursor';
import { useCoarsePointer, usePrefersReducedMotion } from './hooks/useViewportPreferences';
import './App.css';

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const coarsePointer = useCoarsePointer();

  useEffect(() => {
    const useLenis = !prefersReducedMotion && !coarsePointer;
    if (!useLenis) {
      lenisRef.current = null;
      return;
    }

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion, coarsePointer]);

  useEffect(() => {
    const refresh = () => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    window.addEventListener('resize', refresh, { passive: true });
    window.addEventListener('orientationchange', refresh, { passive: true });
    refresh();
    return () => {
      window.removeEventListener('resize', refresh);
      window.removeEventListener('orientationchange', refresh);
    };
  }, []);

  useCustomCursor();

  const scrollTo = useCallback(
    (target: string) => {
      const el = document.querySelector<HTMLElement>(target);
      if (!el) return;

      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { duration: 1.2, offset: -80 });
        return;
      }

      el.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    },
    [prefersReducedMotion],
  );

  return (
    <div className="bg-black min-h-screen min-h-[100dvh] w-full text-white antialiased">
      <Navigation onNavigate={scrollTo} />
      <main className="relative w-full max-w-[100vw] overflow-x-clip">
        <HeroSection onScrollTo={scrollTo} />
        <StatementSection />
        <ProcessSection />
        <ServiceShowcaseSection />
        <PricingSection onScrollTo={scrollTo} />
        <AuditFooterSection />
      </main>
      <FooterSection onScrollTo={scrollTo} />
    </div>
  );
}
