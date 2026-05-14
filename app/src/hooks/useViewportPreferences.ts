import { useEffect, useState } from 'react';

function getReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getCoarsePointer(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches;
}

/** Industry standard: respect OS “reduce motion” for vestibular / accessibility. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(getReducedMotion);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

/** Touch-first devices: prefer native scroll + fewer GPU-heavy effects. */
export function useCoarsePointer(): boolean {
  const [coarse, setCoarse] = useState(getCoarsePointer);
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const onChange = () => setCoarse(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return coarse;
}

/**
 * Cap Three.js DPR on phones / tablets to save GPU and battery.
 * Retina still looks sharp at ~1.25–1.5; desktop allows up to 2.
 */
export function useResponsiveCanvasDpr(): number {
  const [maxDpr, setMaxDpr] = useState(1.5);

  useEffect(() => {
    const mqNarrow = window.matchMedia('(max-width: 768px)');
    const mqTablet = window.matchMedia('(max-width: 1024px)');
    const update = () => {
      const ratio = window.devicePixelRatio || 1;
      const narrow = mqNarrow.matches;
      const tablet = mqTablet.matches;
      const cap = narrow ? 1.25 : tablet ? 1.5 : 2;
      setMaxDpr(Math.min(ratio, cap));
    };
    update();
    window.addEventListener('resize', update);
    mqNarrow.addEventListener('change', update);
    mqTablet.addEventListener('change', update);
    return () => {
      window.removeEventListener('resize', update);
      mqNarrow.removeEventListener('change', update);
      mqTablet.removeEventListener('change', update);
    };
  }, []);

  return maxDpr;
}
