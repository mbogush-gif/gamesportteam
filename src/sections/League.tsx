import { useEffect, useMemo, useState } from 'react';
import { SEASONS } from '../data';
import { Logo } from '../components/Logo';

const NEXT_MATCH = new Date('2026-04-28T19:00:00+03:00');

function pad(n: number) { return String(n).padStart(2, '0'); }

export function League() {
  const [seasonId, setSeasonId] = useState(SEASONS.find(s => s.current)?.id ?? SEASONS[0].id);
  const season = useMemo(() => SEASONS.find(s => s.id === seasonId) ?? SEASONS[0], [seasonId]);
  const [cd, setCd] = useState({ d: '00', h: '00', m: '00', s: '00' });

  const visibleStandings = useMemo(() => {
    const TOP = 9;
    const all = season.standings;
    if (all.length <= TOP) return { rows: all, gap: false, us: null as typeof all[number] | null };
    const top = all.slice(0, TOP);
    const us = all.find(s => s.us) ?? null;
    if (us && top.some(s => s.us)) return { rows: top, gap: false, us: null };
    return { rows: top, gap: true, us };
  }, [season]);

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, NEXT_MATCH.getTime() - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCd({ d: pad(d), h: pad(h), m: pad(m), s: pad(s) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="section" id="league">
      <div className="bg-num" style={{ top: 0, left: 0 }}>05</div>
      <div className="wrap">
        <div className="section-label reveal">
          <span className="num">05</span><span className="arrow">/</span><span>League</span><span className="arrow">→</span><span>{season.name} — {season.label}</span>
        </div>
        <h2 className="h-display h-section reveal">
          Турнирная <em>таблица.</em>
        </h2>
        <div className="season-tabs reveal" role="tablist" aria-label="Сезоны">
          {SEASONS.map(s => (
            <button
              key={s.id}
              role="tab"
              aria-selected={s.id === season.id}
              className={`season-tab${s.id === season.id ? ' active' : ''}`}
              onClick={() => setSeasonId(s.id)}
            >
              <span className="st-short">{s.short}</span>
              <span className="st-name">{s.name}</span>
              {s.current && <span className="st-dot" aria-label="current" />}
            </button>
          ))}
        </div>
        <div className="league-wrap">
          <div className="standings reveal">
            <div className="row head">
              <div className="cell">#</div>
              <div className="cell">Команда</div>
              <div className="cell" style={{ textAlign: 'center' }}>W</div>
              <div className="cell rd-cell" style={{ textAlign: 'center' }}>RD</div>
              <div className="cell" style={{ textAlign: 'center' }}>PTS</div>
            </div>
            {visibleStandings.rows.map(s => (
              <div key={`${season.id}-${s.pos}`} className={`row${s.us ? ' us' : ''}`}>
                <div className="pos">{s.pos}</div>
                <div className="team">
                  <div className="lp">
                    {s.logo ? <img src={s.logo} alt={s.team} loading="lazy" /> : s.tag}
                  </div>
                  {s.team}
                </div>
                <div className="num-cell">{s.w}–{s.l}</div>
                <div className="num-cell rd-cell">{s.rd}</div>
                <div className="num-cell pts">{s.pts}</div>
              </div>
            ))}
            {visibleStandings.gap && visibleStandings.us && (
              <>
                <div className="row gap" aria-hidden="true">
                  <div className="pos">…</div>
                  <div className="team">…</div>
                  <div className="num-cell">·</div>
                  <div className="num-cell rd-cell">·</div>
                  <div className="num-cell pts">·</div>
                </div>
                <div className="row us">
                  <div className="pos">{visibleStandings.us.pos}</div>
                  <div className="team">
                    <div className="lp">
                      {visibleStandings.us.logo
                        ? <img src={visibleStandings.us.logo} alt={visibleStandings.us.team} loading="lazy" />
                        : visibleStandings.us.tag}
                    </div>
                    {visibleStandings.us.team}
                  </div>
                  <div className="num-cell">{visibleStandings.us.w}–{visibleStandings.us.l}</div>
                  <div className="num-cell rd-cell">{visibleStandings.us.rd}</div>
                  <div className="num-cell pts">{visibleStandings.us.pts}</div>
                </div>
              </>
            )}
          </div>

          <div className="next-match reveal">
            <div className="nm-label"><span className="live-dot" /> Next match</div>
            <div className="nm-vs">
              <div className="nm-team us">
                <div className="lp" style={{ width: 'auto', minWidth: 96, background: 'transparent', border: 'none' }}>
                  <Logo width={96} />
                </div>
                <div className="nick-sm">GameSport</div>
              </div>
              <div className="vs">VS</div>
              <div className="nm-team">
                <div className="lp">
                  {season.nextMatch?.oppLogo
                    ? <img src={season.nextMatch.oppLogo} alt={season.nextMatch.opp} loading="lazy" />
                    : season.nextMatch?.oppShort ?? 'TBD'}
                </div>
                <div className="nick-sm">{season.nextMatch?.opp ?? 'TBD'}</div>
              </div>
            </div>
            <div className="nm-tour">{season.name} · {season.label} · 19:00 MSK</div>
            <div className="countdown">
              <div><b>{cd.d}</b><span>Дни</span></div>
              <div><b>{cd.h}</b><span>Часы</span></div>
              <div><b>{cd.m}</b><span>Мин</span></div>
              <div><b>{cd.s}</b><span>Сек</span></div>
            </div>
            <a
              className="nm-watch"
              href="https://www.twitch.tv/gamesport_stream"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Смотреть на Twitch"
            >
              <span className="nm-watch-ico" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.571 4.714h1.715v5.143h-1.715zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg>
              </span>
              <span className="nm-watch-lbl">Смотреть</span>
              <span className="nm-watch-host">twitch.tv/gamesport_stream</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
