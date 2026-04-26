import { useEffect, useRef, useState } from 'react';

const LINES = [
  'CS2 · ESEA MAIN B · SEASON 57',
  'СРЕДНИЙ ELO 3572 · 5 ИГРОКОВ + ТРЕНЕР',
  'ВИНРЕЙТ 68% · 247 МАТЧЕЙ',
  'ЦЕЛЬ — ADVANCED & TIER-1 QUALI',
];

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const rocketRef = useRef<SVGSVGElement>(null);
  const [subText, setSubText] = useState('');
  const [titleIn, setTitleIn] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setTitleIn(true), 200);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const rocket = rocketRef.current;
    if (!hero || !rocket) return;
    if (window.matchMedia('(hover:none)').matches) return;
    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 24;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 18;
    };
    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      rocket.style.setProperty('--px', `${cx.toFixed(2)}px`);
      rocket.style.setProperty('--py', `${cy.toFixed(2)}px`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    hero.addEventListener('mousemove', onMove);
    return () => { cancelAnimationFrame(raf); hero.removeEventListener('mousemove', onMove); };
  }, []);

  useEffect(() => {
    if (!titleIn) return;
    let lineIdx = 0, charIdx = 0;
    let text = '';
    const tick = () => {
      const line = LINES[lineIdx];
      if (charIdx <= line.length) {
        text = line.slice(0, charIdx++);
        setSubText(text);
        setTimeout(tick, 38);
      } else {
        setTimeout(() => {
          lineIdx = (lineIdx + 1) % LINES.length;
          charIdx = 0;
          text = '';
          setTimeout(tick, 200);
        }, 2200);
      }
    };
    const t = setTimeout(tick, 800);
    return () => clearTimeout(t);
  }, [titleIn]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const pts: { x: number; y: number; vx: number; vy: number }[] = [];

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
      pts.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4 });
    }

    let raf: number;
    function draw() {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas!.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas!.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(245,51,63,.6)';
        ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(245,51,63,${(1 - d / 120) * .15})`;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  const title = 'GAMESPORT';

  return (
    <section className="hero" id="top" ref={heroRef}>
      <canvas ref={canvasRef} />
      <div className="hero-grid-bg" />
      <div className="hero-scanline" aria-hidden="true" />

      <svg ref={rocketRef} className="rocket-bg" viewBox="0 0 100 160" fill="none" aria-hidden="true">
        {/* mascot character */}
        <path className="rb-body" d="M0.119 130.757C-0.382 133.011 0.62 137.52 4.627 138.522C4.627 138.522 4.877 138.522 5.128 138.522C10.387 139.524 14.644 136.267 16.647 135.015C26.915 128.753 31.673 124.995 35.93 123.492C41.69 121.488 47.7 122.24 51.707 122.991C55.464 124.244 61.224 126.498 65.23 131.257C68.236 134.764 70.49 140.526 76.249 151.046C77.502 153.05 79.505 158.06 84.514 159.814C84.514 159.814 84.764 159.814 85.014 159.814C89.021 160.815 92.026 157.559 92.778 155.305C94.03 151.547 99.79 121.739 99.038 114.475C98.788 109.715 96.284 104.204 91.526 100.447C92.527 92.431 91.025 86.67 89.021 79.406C92.778 75.899 95.532 71.39 96.784 66.13C98.788 59.367 97.786 52.353 95.032 46.341C96.033 21.542 85.014 0 85.014 0C85.014 0 64.73 13.026 52.709 35.319C47.2 39.077 43.193 44.838 41.189 51.601C39.687 56.862 39.937 62.372 41.189 67.132C35.68 72.392 31.673 76.65 28.417 83.915C22.658 84.416 17.899 88.173 15.145 91.93C10.887 98.193 1.121 126.999 0.119 130.757ZM71.992 96.94C67.735 96.69 63.477 96.189 59.471 94.936C55.464 93.934 51.457 92.181 47.7 90.177C47.45 86.42 47.45 82.412 47.7 77.903C51.457 81.911 56.215 85.167 61.724 86.67C67.484 88.173 73.244 87.923 78.503 86.169C76.249 90.177 74.246 93.934 71.992 96.94ZM61.474 31.311C63.978 27.554 66.733 24.047 69.488 21.041L88.019 26.051C88.771 30.059 89.522 34.317 89.773 39.077C86.266 35.57 82.009 32.814 76.75 31.311C71.491 29.808 66.232 30.059 61.474 31.311ZM75.248 36.321C87.769 39.828 95.282 52.603 91.776 65.128C88.27 77.652 75.498 85.167 62.977 81.66C50.455 78.153 42.942 65.378 46.448 52.854C49.704 40.329 62.726 33.065 75.248 36.321Z" fill="currentColor"/>
        {/* flame */}
        <path className="rb-flame" d="M56.214 132.761C54.962 137.269 49.452 140.776 46.447 144.033C45.445 139.524 42.44 133.763 43.442 129.254C43.442 128.753 43.943 128.001 44.193 127.5C41.439 128.753 39.185 131.258 38.433 134.264C36.43 142.029 40.687 151.547 42.19 159.062C47.198 153.301 55.963 147.54 57.967 139.774C58.718 136.518 57.967 133.512 56.214 131.007C56.464 131.508 56.214 132.26 56.214 132.761Z" fill="currentColor" opacity=".55"/>
        {/* scope */}
        <path className="rb-scope" d="M72.492 46.591C79.504 48.595 83.511 55.609 81.758 62.372C79.754 69.386 72.742 73.394 65.981 71.641C59.219 69.887 54.962 62.623 56.715 55.86C58.468 48.846 65.48 44.587 72.492 46.591Z" fill="currentColor"/>
        {/* hud rings */}
        <g className="rb-rings" stroke="currentColor" fill="none">
          <circle cx="68.5" cy="59" r="18" strokeWidth=".4" className="rb-ring r1"/>
          <circle cx="68.5" cy="59" r="26" strokeWidth=".3" className="rb-ring r2"/>
          <circle cx="68.5" cy="59" r="36" strokeWidth=".25" className="rb-ring r3"/>
          <line x1="68.5" y1="20" x2="68.5" y2="98" strokeWidth=".25" strokeDasharray="2 3"/>
          <line x1="30" y1="59" x2="107" y2="59" strokeWidth=".25" strokeDasharray="2 3"/>
        </g>
      </svg>

      <div className="hero-hud" aria-hidden="true">
        <span className="hud-line"><span className="hud-key">LAT</span><span className="hud-val">55°45′N</span></span>
        <span className="hud-line"><span className="hud-key">LON</span><span className="hud-val">37°37′E</span></span>
        <span className="hud-line"><span className="hud-key">SYS</span><span className="hud-val">ONLINE</span></span>
        <span className="hud-line"><span className="hud-key">PWR</span><span className="hud-val hud-bar"><span/></span></span>
      </div>

      <div className="hero-meta-top">
        <span className="red">01</span>/<span>TEAM</span>
      </div>

      <div className="hero-content">
        <h1 className="hero-title">
          {title.split('').map((ch, i) => (
            <span
              key={i}
              className={`ch${titleIn ? ' in' : ''}`}
              style={{ transitionDelay: titleIn ? `${i * 0.06}s` : '0s' }}
            >{ch}</span>
          ))}
        </h1>
        <div className="hero-sub">
          {subText}<span className="cursor-blink" aria-hidden="true" />
        </div>
        <div className="hero-cta">
          <a href="#roster" className="btn primary" data-magnet><span className="lbl">Состав команды →</span></a>
          <a href="#series" className="btn" data-magnet><span className="lbl">Смотреть сериал</span></a>
        </div>
      </div>

      <div className="hero-bottom">
        <div className="status">
          <span className="dot" />
          <span>STATUS: ACTIVE · CS2 · ESEA SEASON 57 · MAIN B</span>
        </div>
        <div className="scroll-indicator-2">
          <span>SCROLL TO EXPLORE</span>
          <span className="line" />
        </div>
      </div>
    </section>
  );
}
