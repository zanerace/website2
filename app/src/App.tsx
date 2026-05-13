import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import StatementSection from './sections/StatementSection';
import ProcessSection from './sections/ProcessSection';
import ServiceShowcaseSection from './sections/ServiceShowcaseSection';
import TestimonialsSection from './sections/TestimonialsSection';
import PricingSection from './sections/PricingSection';
import AuditFooterSection from './sections/AuditFooterSection';
import FooterSection from './sections/FooterSection';
import { useCustomCursor } from './hooks/useCustomCursor';
import './App.css';

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useCustomCursor();

  const scrollTo = (target: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { duration: 1.2, offset: -80 });
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <Navigation lenisRef={lenisRef as React.MutableRefObject<any>} />
      <main>
        <HeroSection onScrollTo={scrollTo} />
        <StatementSection />
        <ProcessSection />
        <ServiceShowcaseSection />
        <TestimonialsSection />
        <PricingSection onScrollTo={scrollTo} />
        <AuditFooterSection />
      </main>
      <FooterSection onScrollTo={scrollTo} />
    </div>
  );
}
