import { useEffect, useRef } from 'react';

export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    const observe = () => {
      document.querySelectorAll('.reveal:not(.in), .reveal-stagger:not(.in)').forEach(el => io.observe(el));
    };
    observe();
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
}

export function useScrollIndicator() {
  useEffect(() => {
    const fill = document.getElementById('scrollFill');
    if (!fill) return;
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      fill.style.height = pct + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

export function useActiveNav() {
  useEffect(() => {
    const sections = document.querySelectorAll('section[id], footer[id]');
    const links = document.querySelectorAll('.nav a[data-target]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(a => {
            a.classList.toggle('active', (a as HTMLElement).dataset.target === e.target.id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);
}
