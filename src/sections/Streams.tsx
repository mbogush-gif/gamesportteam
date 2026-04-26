import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PLAYERS, PLAYER_CLIPS, FLAGS, type PlayerClip } from '../data';
import { asset } from '../lib/asset';

type Player = typeof PLAYERS[number];
type Phase = 'idle' | 'loading' | 'clips';

const LOADING_MS = 1700;

export function Streams() {
  const [selected, setSelected] = useState<Player | null>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    document.body.style.overflow = '';
  }, []);

  const handleSelect = (p: Player) => {
    if (phase !== 'idle') return;
    document.body.style.overflow = 'hidden';
    setSelected(p);
    setPhase('loading');
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setPhase('clips');
      document.body.style.overflow = '';
    }, LOADING_MS);
  };

  const handleBack = () => {
    setPhase('idle');
    setTimeout(() => setSelected(null), 480);
  };

  return (
    <section className="section" id="streams">
      <div className="bg-num" style={{ top: 0, left: 0 }}>08</div>
      <div className="wrap">
        <div className="moments-head">
          <div>
            <div className="section-label reveal">
              <span className="num">08</span><span className="arrow">/</span><span>Лучшие</span><span className="arrow">→</span><span>Моменты</span>
            </div>
            <h2 className="h-display h-section reveal">
              Лучшие <em>моменты.</em>
            </h2>
            <p className="moments-sub reveal">
              Выбери игрока — откроется его подборка из трёх лучших кадров сезона.
            </p>
          </div>
          {phase === 'clips' && selected && (
            <button className="moments-back" onClick={handleBack} aria-label="К списку игроков">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 6 L9 12 L15 18"/>
              </svg>
              <span>Назад · к составу</span>
            </button>
          )}
        </div>

        <div className="moments-stage">
          {phase === 'idle' && (
            <PlayerGrid onSelect={handleSelect} />
          )}

          <AnimatePresence>
            {phase === 'loading' && selected && (
              <LoadingOverlay player={selected} />
            )}
          </AnimatePresence>

          {phase === 'clips' && selected && (
            <ClipsView player={selected} onBack={handleBack} />
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- player grid ---------- */

function PlayerGrid({ onSelect }: { onSelect: (p: Player) => void }) {
  return (
    <div className="pmoments-grid reveal-stagger">
      {PLAYERS.map((p, i) => (
        <motion.button
          key={p.nick}
          className="pmoment-card"
          onClick={() => onSelect(p)}
          whileTap={{ scale: 0.97 }}
          data-view
          aria-label={`Лучшие моменты · ${p.nick}`}
        >
          <PlayerCardInner player={p} index={i} />
        </motion.button>
      ))}
    </div>
  );
}

function PlayerCardInner({ player: p, index, big = false }: { player: Player; index: number; big?: boolean }) {
  const clips = PLAYER_CLIPS[p.nick] ?? [];
  return (
    <>
      <div className="pmoment-photo">
        <img src={asset(p.photo)} alt={p.nick} loading="lazy" />
        <div className="pmoment-num">#{String(index + 1).padStart(2, '0')}</div>
        <div className="pmoment-flag" dangerouslySetInnerHTML={{ __html: FLAGS[p.country] || '' }} />
        <div className="pmoment-count">{clips.length} клипа</div>
      </div>
      <div className="pmoment-body">
        <div className="pmoment-nick">{p.nick}</div>
        <div className="pmoment-role">{p.role}</div>
        {!big && (
          <div className="pmoment-action">
            <span>VIEW</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </div>
        )}
      </div>
      <span className="pmoment-trace t" />
      <span className="pmoment-trace r" />
      <span className="pmoment-trace b" />
      <span className="pmoment-trace l" />
    </>
  );
}

/* ---------- loading overlay ---------- */

function LoadingOverlay({ player }: { player: Player }) {
  const [pct, setPct] = useState(0);
  const idx = PLAYERS.indexOf(player);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const e = Math.min(1, (t - start) / LOADING_MS);
      setPct(Math.floor(e * 100));
      if (e < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      className="moments-loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="moments-loader-bg" aria-hidden="true">
        <span className="grid" />
        <span className="scan" />
      </div>

      <motion.div
        className="pmoment-card pmoment-card--center"
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <PlayerCardInner player={player} index={idx} big />
        <Sunglasses />
        <div className="pmoment-loader-overlay">
          <span className="bracket tl" /><span className="bracket tr" />
          <span className="bracket bl" /><span className="bracket br" />
          <span className="sweep" />
        </div>
      </motion.div>

      <div className="moments-loader-hud">
        <div className="hud-row">
          <span className="hud-key">› ARCHIVE</span>
          <span className="hud-val">{player.nick.toUpperCase()}.DEMO</span>
        </div>
        <div className="hud-bar">
          <span style={{ transform: `scaleX(${pct / 100})` }} />
        </div>
        <div className="hud-row">
          <span className="hud-key">› DECRYPT</span>
          <span className="hud-val">
            {pct < 35 && 'CONNECT TO FACEIT NODE'}
            {pct >= 35 && pct < 70 && 'PARSING DEMO TIMELINE'}
            {pct >= 70 && pct < 100 && 'BUILDING HIGHLIGHT REEL'}
            {pct === 100 && 'READY'}
          </span>
        </div>
        <div className="hud-row hud-pct">
          <span>{String(pct).padStart(3, '0')}%</span>
          <span className="hud-dot" />
          <span>3 / 3 CLIPS LOCATED</span>
        </div>
      </div>
    </motion.div>
  );
}

function Sunglasses() {
  return (
    <motion.div
      className="pmoment-shades"
      initial={{ x: '-50%', y: -180, opacity: 0, rotate: -8 }}
      animate={{ x: '-50%', y: 0, opacity: 1, rotate: 0 }}
      transition={{ delay: 0.55, duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 220 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lensGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1a1d" />
            <stop offset="60%" stopColor="#0a0a0b" />
            <stop offset="100%" stopColor="#000" />
          </linearGradient>
          <linearGradient id="shineGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F5333F" stopOpacity="0" />
            <stop offset="40%" stopColor="#F5333F" stopOpacity=".8" />
            <stop offset="60%" stopColor="#FF1F2D" stopOpacity=".4" />
            <stop offset="100%" stopColor="#F5333F" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 22 L18 22 L22 16 L96 16 L102 22 L118 22 L124 16 L198 16 L202 22 L220 22 L220 28 L208 30 Q204 60 168 62 Q124 60 116 30 L104 30 Q96 60 56 62 Q20 60 14 30 L0 28 Z" fill="#0a0a0b" />
        <ellipse cx="58" cy="38" rx="44" ry="22" fill="url(#lensGrad)" stroke="#1F1F23" strokeWidth="1.5" />
        <ellipse cx="162" cy="38" rx="44" ry="22" fill="url(#lensGrad)" stroke="#1F1F23" strokeWidth="1.5" />
        <ellipse cx="58" cy="38" rx="44" ry="22" fill="url(#shineGrad)" opacity=".55">
          <animate attributeName="opacity" values=".25;.7;.25" dur="1.6s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="162" cy="38" rx="44" ry="22" fill="url(#shineGrad)" opacity=".55">
          <animate attributeName="opacity" values=".7;.25;.7" dur="1.6s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="50" cy="30" rx="14" ry="5" fill="#fff" opacity=".08" />
        <ellipse cx="154" cy="30" rx="14" ry="5" fill="#fff" opacity=".08" />
      </svg>
    </motion.div>
  );
}

/* ---------- clips view ---------- */

function ClipsView({ player, onBack }: { player: Player; onBack: () => void }) {
  const clips = PLAYER_CLIPS[player.nick] ?? [];
  const idx = PLAYERS.indexOf(player);

  return (
    <motion.div
      className="moments-clips"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, delay: 0.1 }}
    >
      <motion.div
        className="pmoment-card pmoment-card--side"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        onClick={onBack}
        role="button"
        aria-label="Вернуться к составу"
      >
        <PlayerCardInner player={player} index={idx} big />
      </motion.div>

      <div className="clip-list">
        <div className="clip-list-head">
          <div className="clip-list-title">
            <span className="kicker">PLAYER · {player.nick.toUpperCase()}</span>
            <h3>Топ-3 за сезон</h3>
          </div>
          <div className="clip-list-meta">
            <span>{clips.length} CLIPS</span>
            <span className="dot" />
            <span>HD · MR12</span>
          </div>
        </div>

        <div className="clip-grid">
          {clips.map((c, i) => (
            <motion.article
              key={c.id}
              className="clip-card"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              data-view
            >
              <ClipCard clip={c} index={i} />
            </motion.article>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ClipCard({ clip, index }: { clip: PlayerClip; index: number }) {
  return (
    <>
      <div className="clip-thumb" aria-hidden="true">
        <span className="clip-noise" />
        <span className="clip-glow" />
        <span className="clip-soon">VIDEO · SOON</span>
      </div>

      <div className="clip-tag">CLIP {String(index + 1).padStart(2, '0')}</div>
      <div className="clip-dur">{clip.dur}</div>

      <div className="clip-play">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </div>

      <div className="clip-info">
        <div className="clip-meta">
          <span className="badge">{clip.tag}</span>
          <span>{clip.map}</span>
          <span className="dot" />
          <span>{clip.vs}</span>
        </div>
        <div className="clip-title">{clip.title}</div>
        <div className="clip-foot">
          <span>{clip.date}</span>
          <span className="clip-cta">ОТКРЫТЬ <em>↗</em></span>
        </div>
      </div>

      <span className="pmoment-trace t" />
      <span className="pmoment-trace r" />
      <span className="pmoment-trace b" />
      <span className="pmoment-trace l" />
    </>
  );
}
