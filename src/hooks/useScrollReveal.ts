import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            (entry.target as HTMLElement).dataset.revealed = 'true';
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: '0px 0px 60px 0px',
      }
    );

    // Observe all reveal elements and immediately reveal any in the viewport on mount
    const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
    const vh = window.innerHeight;
    revealEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < vh && rect.bottom > 0) {
        el.classList.add('in-view');
        (el as HTMLElement).dataset.revealed = 'true';
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}

export function useCountUp() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const targetText = el.getAttribute('data-count') || '0';
            const suffix = el.getAttribute('data-suffix') || '';
            const prefix = el.getAttribute('data-prefix') || '';
            
            // Parse the number (handle ranges like "15–25")
            const match = targetText.match(/(\d+)/);
            if (!match) return;
            
            const target = parseInt(match[1], 10);
            const duration = 1800;
            const step = (timestamp: number, startTime: number, startValue: number) => {
              const progress = Math.min((timestamp - startTime) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
              const current = Math.floor(eased * (target - startValue) + startValue);
              
              // Reconstruct the original format
              if (targetText.includes('–')) {
                const parts = targetText.split('–');
                const high = parseInt(parts[1], 10);
                const lowDone = Math.floor(eased * (target - 0));
                const highDone = Math.floor(eased * (high - 0));
                el.textContent = `${prefix}${lowDone}–${highDone}${suffix}`;
              } else {
                el.textContent = `${prefix}${current}${suffix}`;
              }
              
              if (progress < 1) {
                requestAnimationFrame((ts) => step(ts, startTime, startValue));
              } else {
                el.textContent = `${prefix}${targetText}${suffix}`;
              }
            };
            
            requestAnimationFrame((ts) => step(ts, ts, 0));
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    const countEls = document.querySelectorAll('[data-count]');
    countEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
