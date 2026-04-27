import { STATS, MAPS } from '../data';
import { asset } from '../lib/asset';

const METRICS: { k: string; v: string; sub: string }[] = [
  { k: 'K/D', v: STATS.kd, sub: 'Kill / Death' },
  { k: 'K/R', v: STATS.kr, sub: 'Kill / Round' },
  { k: 'HS%', v: `${STATS.hsPercent}%`, sub: 'Headshot ratio' },
  { k: 'HS / match', v: String(STATS.hsPerMatch), sub: 'В среднем за матч' },
  { k: 'Entry rate', v: `${STATS.entryRate}%`, sub: 'Первый контакт' },
  { k: 'Entry success', v: `${STATS.entrySuccess}%`, sub: 'Победный entry' },
  { k: 'Clutch 1v1', v: `${STATS.clutch1v1}%`, sub: 'Win rate' },
  { k: 'Clutch 1v2', v: `${STATS.clutch1v2}%`, sub: 'Win rate' },
  { k: 'Flash success', v: `${STATS.flashSuccess}%`, sub: 'Полезные флешки' },
  { k: 'Util DMG / round', v: STATS.utilDmgPerRound.toFixed(1), sub: 'Урон гранатами' },
  { k: 'Sniper kills', v: `${STATS.sniperKillRate}%`, sub: 'Доля от всех фрагов' },
  { k: 'Longest streak', v: `${STATS.longestStreak}W`, sub: 'Серия побед' },
];

const sortedMaps = [...MAPS].sort((a, b) => b.matches - a.matches);

export function Stats() {
  return (
    <section className="section" id="stats">
      <div className="bg-num" style={{ top: 0, left: 0 }}>06</div>
      <div className="wrap">
        <div className="section-label reveal">
          <span className="num">06</span>
          <span className="arrow">/</span>
          <span>Статистика</span>
          <span className="arrow">→</span>
          <span>FACEIT · CS2 · Lifetime</span>
        </div>

        <h2 className="h-display h-section reveal">
          Цифры <em>команды.</em>
        </h2>

        <div className="stats-overview reveal">
          <div className="so-record">
            <div className="so-record-label">Lifetime record</div>
            <div className="so-record-line">
              <b className="so-record-num">{STATS.totalMatches}</b>
              <span className="so-record-sub">matches</span>
            </div>
            <div className="so-record-wl">
              <span className="wl-w">{STATS.wins}<i>W</i></span>
              <span className="wl-sep">·</span>
              <span className="wl-l">{STATS.losses}<i>L</i></span>
            </div>
          </div>

          <div className="so-winrate">
            <div className="so-winrate-label">Win rate</div>
            <div className="so-winrate-num">{STATS.winRate}<span>%</span></div>
            <div className="so-winrate-bar">
              <span style={{ width: `${STATS.winRate}%` }} />
            </div>
            <div className="so-winrate-foot">
              Лучшая серия — {STATS.longestStreak} побед подряд
            </div>
          </div>

          <div className="so-form">
            <div className="so-form-label">Последние 5 матчей</div>
            <div className="so-form-dots">
              {STATS.recent.map((w, i) => (
                <span key={i} className={`form-dot ${w ? 'win' : 'loss'}`}>
                  {w ? 'W' : 'L'}
                </span>
              ))}
            </div>
            <div className="so-form-foot">
              {STATS.recent.filter(Boolean).length}W / {STATS.recent.filter(v => !v).length}L · последние 5
            </div>
          </div>
        </div>

        <div className="stats-block-head reveal">
          <h3>Winrate по картам</h3>
          <div className="meta">{MAPS.length} карт · {MAPS.reduce((a, m) => a + m.matches, 0)} matches</div>
        </div>

        <div className="mappool-grid reveal-stagger">
          {sortedMaps.map((m) => {
            const wrClass = m.winRate >= 55 ? 'good' : m.winRate < 45 ? 'bad' : '';
            const slug = m.label.toLowerCase().replace(/^de_/, '');
            return (
              <div
                key={m.short}
                className={`map-card ${m.winRate < 45 ? 'low' : ''}`}
                style={{ ['--map-bg' as string]: `url('${asset(`/maps/${slug}.jpg`)}')` } as Record<string, string>}
              >
                <div className="mc-bg" aria-hidden="true" />
                <div className="mc-head">
                  <span className="short">{m.short}</span>
                  <span>{m.matches} maps</span>
                </div>
                <div className="mc-name">{m.label.replace(/^de_/, '')}</div>
                <div className="mc-bar">
                  <span style={{ width: `${m.winRate}%` }} />
                </div>
                <div className="mc-meta">
                  <span>{m.wins}W / {m.matches - m.wins}L</span>
                  <span className={`wr ${wrClass}`}>{m.winRate}% Winrate</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="stats-block-head reveal" style={{ marginTop: 48 }}>
          <h3>Ключевые показатели</h3>
          <div className="meta">Lifetime · CS2</div>
        </div>

        <div className="stats-grid reveal-stagger">
          {METRICS.map((m) => (
            <div key={m.k} className="stat-card">
              <div className="sc-key">{m.k}</div>
              <div className="sc-val">{m.v}</div>
              <div className="sc-sub">{m.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
