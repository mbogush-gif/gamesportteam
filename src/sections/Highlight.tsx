import { useEffect, useRef, useState } from 'react';
import { asset } from '../lib/asset';
import { Logo } from '../components/Logo';

type Quote = {
  t: string;
  caster: string;
  line: string;
};

const QUOTES: Quote[] = [
  { t: '00:04', caster: 'CASTER · ru', line: 'Он остался один против троих, у него только дигл…' },
  { t: '00:09', caster: 'CO-CASTER',   line: 'СНЯЛ! СНЯЛ ВТОРОГО! Это уже не клатч, это казнь.' },
  { t: '00:13', caster: 'CASTER · ru', line: 'Поверить нельзя — три фрага в дигл за пять секунд.' },
  { t: '00:17', caster: 'CO-CASTER',   line: 'Запомните этот раунд. Мувик сезона.' },
];

const VIDEO_SRC = asset('movies/highlight.mp4')!;
const INTRO_MS = 1100;

type Phase = 'cover' | 'intro' | 'playing' | 'outro';

export function Highlight() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const introTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [phase, setPhase] = useState<Phase>('cover');
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const armed = phase !== 'cover';

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => setTime(v.currentTime);
    const onMeta = () => setDuration(v.duration || 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnd = () => { setPlaying(false); setPhase('outro'); };
    v.addEventListener('timeupdate', onTime);
    v.addEventListener('loadedmetadata', onMeta);
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    v.addEventListener('ended', onEnd);
    return () => {
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('loadedmetadata', onMeta);
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
      v.removeEventListener('ended', onEnd);
      if (introTimerRef.current) clearTimeout(introTimerRef.current);
    };
  }, []);

  const startVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    setMuted(false);
    v.play().catch(() => {
      v.muted = true;
      setMuted(true);
      v.play().catch(() => {});
    });
  };

  const arm = () => {
    if (phase !== 'cover') return;
    setPhase('intro');
    if (introTimerRef.current) clearTimeout(introTimerRef.current);
    introTimerRef.current = setTimeout(() => {
      setPhase('playing');
      startVideo();
    }, INTRO_MS);
  };

  const replay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    setPhase('intro');
    if (introTimerRef.current) clearTimeout(introTimerRef.current);
    introTimerRef.current = setTimeout(() => {
      setPhase('playing');
      startVideo();
    }, INTRO_MS);
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    v.currentTime = Math.max(0, Math.min(duration, ratio * duration));
  };

  const fmt = (s: number) => {
    if (!Number.isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    const ss = Math.floor(s % 60);
    return `${m}:${String(ss).padStart(2, '0')}`;
  };

  const activeIdx = (() => {
    const cur = time;
    const toSec = (t: string) => {
      const [m, s] = t.split(':').map(Number);
      return m * 60 + s;
    };
    let idx = -1;
    for (let i = 0; i < QUOTES.length; i++) {
      if (cur >= toSec(QUOTES[i].t)) idx = i;
    }
    return idx;
  })();

  const progress = duration > 0 ? (time / duration) * 100 : 0;

  return (
    <section className="section highlight" id="highlight">
      <div className="bg-num" style={{ top: 0, right: 0 }}>★</div>
      <div className="wrap">
        <div className="hl-head">
          <div className="hl-kicker reveal">
            <span className="dot" />
            <span>INTERLUDE</span>
            <span className="sep">/</span>
            <span>CLUTCH OF THE SEASON</span>
          </div>
          <h2 className="h-display h-section reveal">
            Мувик <em>сезона.</em>
          </h2>
          <p className="hl-sub reveal">
            1v3 в дигл на Mirage. Слушай, как каст теряет голос — это не нарезка, это документ.
          </p>
        </div>

        <div className="hl-stage reveal">
          <div
            className={`hl-player ${armed ? 'armed' : ''}`}
            onClick={phase === 'cover' ? arm : phase === 'outro' ? replay : undefined}
            role={phase === 'cover' || phase === 'outro' ? 'button' : undefined}
            tabIndex={phase === 'cover' || phase === 'outro' ? 0 : -1}
            onKeyDown={phase === 'cover' || phase === 'outro' ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); phase === 'cover' ? arm() : replay(); } } : undefined}
            aria-label={phase === 'cover' ? 'Запустить мувик сезона' : phase === 'outro' ? 'Пересмотреть' : undefined}
            data-view={phase === 'cover' || phase === 'outro' ? true : undefined}
          >
            <video
              ref={videoRef}
              className="hl-video"
              src={VIDEO_SRC}
              preload="metadata"
              playsInline
            />

            <span className="hl-bracket tl" />
            <span className="hl-bracket tr" />
            <span className="hl-bracket bl" />
            <span className="hl-bracket br" />

            {phase === 'cover' && (
              <div className="hl-cover">
                <div className="hl-cover-grid" aria-hidden="true" />
                <div className="hl-cover-scan" aria-hidden="true" />

                <div className="hl-cover-tag">
                  <span className="rec" /> REC · MIRAGE · 1v3
                </div>

                <div className="hl-cover-center">
                  <div className="hl-play">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <div className="hl-cover-title">МУВИК · СЕЗОНА</div>
                  <div className="hl-cover-sub">CLICK TO PLAY · WITH SOUND</div>
                </div>

                <div className="hl-cover-foot">
                  <span>FACEIT · CS2</span>
                  <span className="dot" />
                  <span>HD · 1080p</span>
                  <span className="dot" />
                  <span>00:23</span>
                </div>
              </div>
            )}

            {phase === 'intro' && (
              <div className="hl-stinger hl-stinger--intro" key="intro">
                <span className="hl-stinger-scan" aria-hidden="true" />
                <div className="hl-stinger-mark">
                  <Logo width={220} />
                  <span className="hl-stinger-line" />
                  <div className="hl-stinger-tag">PRESENTS · CLUTCH OF THE SEASON</div>
                </div>
              </div>
            )}

            {phase === 'outro' && (
              <div className="hl-stinger hl-stinger--outro" key="outro">
                <span className="hl-stinger-scan" aria-hidden="true" />
                <div className="hl-stinger-mark">
                  <Logo width={220} />
                  <span className="hl-stinger-line" />
                  <div className="hl-stinger-tag">GAMESPORT · CS2 · 2025</div>
                  <button
                    className="hl-stinger-replay"
                    onClick={(e) => { e.stopPropagation(); replay(); }}
                    aria-label="Пересмотреть мувик"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" />
                    </svg>
                    <span>ПЕРЕСМОТРЕТЬ</span>
                  </button>
                </div>
              </div>
            )}

            {phase === 'playing' && (
              <div className="hl-controls" onClick={(e) => e.stopPropagation()}>
                <button className="hl-btn" onClick={togglePlay} aria-label={playing ? 'Пауза' : 'Воспроизвести'}>
                  {playing ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" /><rect x="14" y="5" width="4" height="14" /></svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                  )}
                </button>

                <div className="hl-time">{fmt(time)}</div>

                <div className="hl-bar" onClick={seek} role="slider" aria-label="Перемотка" aria-valuenow={Math.round(progress)}>
                  <span className="hl-bar-fill" style={{ width: `${progress}%` }} />
                  <span className="hl-bar-knob" style={{ left: `${progress}%` }} />
                </div>

                <div className="hl-time hl-time-dur">{fmt(duration)}</div>

                <button className="hl-btn" onClick={toggleMute} aria-label={muted ? 'Включить звук' : 'Выключить звук'}>
                  {muted ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5 6 9H3v6h3l5 4zM23 9l-6 6M17 9l6 6"/></svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5 6 9H3v6h3l5 4zM16 8a5 5 0 0 1 0 8M19.5 5a9 9 0 0 1 0 14"/></svg>
                  )}
                </button>
              </div>
            )}
          </div>

          <aside className="hl-quotes">
            <div className="hl-quotes-head">
              <span className="kicker">CASTERS · LIVE</span>
              <h3>Что говорил каст</h3>
            </div>
            <ol className="hl-quotes-list">
              {QUOTES.map((q, i) => (
                <li
                  key={q.t}
                  className={`hl-quote ${i === activeIdx ? 'active' : ''} ${i < activeIdx ? 'past' : ''}`}
                >
                  <div className="hl-quote-meta">
                    <span className="hl-quote-time">{q.t}</span>
                    <span className="hl-quote-caster">{q.caster}</span>
                  </div>
                  <div className="hl-quote-line">«{q.line}»</div>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </div>
    </section>
  );
}
