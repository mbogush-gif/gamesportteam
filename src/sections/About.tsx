import { useEffect, useRef } from 'react';

function CountUp({ target, duration = 1400 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const tick = () => {
          const p = Math.min((Date.now() - start) / duration, 1);
          el.textContent = String(Math.round(p * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return <span ref={ref}>0</span>;
}

export function About() {
  return (
    <section className="section" id="about">
      <div className="bg-num" style={{ top: 0, right: 0 }}>02</div>
      <div className="wrap">
        <div className="section-label reveal">
          <span className="num">02</span><span className="arrow">/</span><span>About</span><span className="arrow">→</span><span>О команде</span>
        </div>
        <div className="about-grid">
          <div className="about-text reveal">
            <h2 className="h-display h-section">Растём <em>в&nbsp;тир-1.</em><br />Побеждаем&nbsp;<em>вместе.</em></h2>
            <p><strong>GameSport</strong> — российская организация в&nbsp;Counter-Strike&nbsp;2, собранная вокруг идеи прозрачного и&nbsp;осмысленного развития. Состав молодой, голодный до&nbsp;побед: средний возраст 21&nbsp;год.</p>
            <p>За&nbsp;год команда прошла путь с&nbsp;ESEA Open до&nbsp;<strong>Main B</strong>, дважды попадала в&nbsp;плей-офф LAN-кубков СНГ и&nbsp;держит на&nbsp;FACEIT 56%&nbsp;винрейта при серии до&nbsp;8&nbsp;побед подряд. Цель ближайших шести месяцев&nbsp;— Advanced.</p>
          </div>
          <div>
            <div className="about-stats-grid reveal-stagger">
              <div className="stat">
                <div className="stat-label"><span>Avg ELO</span><span className="corner" /></div>
                <div className="stat-value"><CountUp target={3532} /></div>
                <div className="stat-foot">FACEIT · LVL 10</div>
              </div>
              <div className="stat">
                <div className="stat-label"><span>Roster</span><span className="corner" /></div>
                <div className="stat-value"><CountUp target={5} /><span className="stat-suffix">+1</span></div>
                <div className="stat-foot">5 PLAYERS · 1 COACH</div>
              </div>
              <div className="stat">
                <div className="stat-label"><span>Matches</span><span className="corner" /></div>
                <div className="stat-value"><CountUp target={99} /></div>
                <div className="stat-foot">FACEIT · 56% WIN RATE</div>
              </div>
              <div className="stat">
                <div className="stat-label"><span>League</span><span className="corner" /></div>
                <div className="stat-value" style={{ fontSize: 'clamp(48px,5vw,76px)' }}>MAIN&nbsp;B</div>
                <div className="stat-foot">ESEA SEASON 57</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
