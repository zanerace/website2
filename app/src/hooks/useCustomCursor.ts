import { useEffect, useRef } from 'react';

const isTouchDevice =
  typeof window !== 'undefined' &&
  (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window);

export function useCustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isTouchDevice) return;

    const cursor = document.createElement('div');
    cursor.style.cssText =
      'position:fixed;top:0;left:0;width:12px;height:12px;background:white;border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width .3s,height .3s,background .3s;mix-blend-mode:difference;will-change:left,top;';
    document.body.appendChild(cursor);
    cursorRef.current = cursor;

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor-hover], input, textarea')) {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
        cursor.style.background = '#f4bd03';
        cursor.style.mixBlendMode = 'normal';
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor-hover], input, textarea')) {
        cursor.style.width = '12px';
        cursor.style.height = '12px';
        cursor.style.background = 'white';
        cursor.style.mixBlendMode = 'difference';
      }
    };

    let rafId: number;
    let running = true;

    const animate = () => {
      if (!running) return;
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.15;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.15;
      cursor.style.left = `${posRef.current.x}px`;
      cursor.style.top = `${posRef.current.y}px`;
      rafId = requestAnimationFrame(animate);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafId);
      } else {
        running = true;
        rafId = requestAnimationFrame(animate);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);
    rafId = requestAnimationFrame(animate);

    return () => {
      running = false;
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      cancelAnimationFrame(rafId);
      cursor.remove();
    };
  }, []);
}
