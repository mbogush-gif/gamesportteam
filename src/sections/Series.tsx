import { useState } from 'react';
import { EPISODES } from '../data';

function YtModal({ ytId, onClose }: { ytId: string; onClose: () => void }) {
  return (
    <div className="yt-modal open" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="yt-inner">
        <button className="close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6 L18 18 M18 6 L6 18"/>
          </svg>
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="GameSport series"
        />
      </div>
    </div>
  );
}

function Episode({ ep, big }: { ep: typeof EPISODES[number]; big?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${ep.yt}/maxresdefault.jpg`;

  return (
    <>
      <div className={`episode${big ? ' big' : ''} reveal`} onClick={() => setPlaying(true)} data-view>
        <div className="thumb" style={{ backgroundImage: `url('${thumb}')` }} />
        <div className="overlay" />
        <div className="ep-dur">{ep.dur}</div>
        <div className="play">
          <svg width={big ? 28 : 22} height={big ? 28 : 22} viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
      {playing && <YtModal ytId={ep.yt} onClose={() => setPlaying(false)} />}
    </>
  );
}

export function Series() {
  const [pilot, ...rest] = EPISODES;

  return (
    <section className="section" id="series">
      <div className="bg-num" style={{ top: 0, right: 0 }}>07</div>
      <div className="wrap">
        <div className="section-label reveal">
          <span className="num">07</span><span className="arrow">/</span><span>Highlights</span><span className="arrow">→</span><span>Лучшие моменты</span>
        </div>
        <h2 className="h-display h-section reveal">
          История <em>команды.</em>
        </h2>
        <div className="series-grid">
          <Episode ep={pilot} big />
          <div className="ep-grid">
            {rest.map(ep => <Episode key={ep.yt} ep={ep} />)}
          </div>
        </div>
        <div className="subscribe-cta reveal">
          <a href="https://www.youtube.com/@gamesport.official/videos" target="_blank" rel="noopener noreferrer" className="btn primary" data-magnet>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ position: 'relative', zIndex: 2 }}>
              <path d="M23.5 6.2c-.3-1-1-1.8-2-2.1C19.7 3.5 12 3.5 12 3.5s-7.7 0-9.5.6c-1 .3-1.7 1.1-2 2.1C0 8 0 12 0 12s0 4 .5 5.8c.3 1 1 1.8 2 2.1 1.8.6 9.5.6 9.5.6s7.7 0 9.5-.6c1-.3 1.7-1.1 2-2.1.5-1.8.5-5.8.5-5.8s0-4-.5-5.8zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z"/>
            </svg>
            <span className="lbl">Смотреть все хайлайты</span>
          </a>
        </div>
      </div>
    </section>
  );
}
