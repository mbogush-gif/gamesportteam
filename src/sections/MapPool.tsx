// src/sections/MapPool.tsx
import { useEffect, useState } from 'react';
import { getTeamStats, parseMapStats, type MapStat } from '../lib/faceit';

type State =
  | { kind: 'loading' }
  | { kind: 'ok'; maps: MapStat[]; total: number; wins: number }
  | { kind: 'error'; message: string };

export function MapPool() {
  const [state, setState] = useState<State>({ kind: 'loading' });

  useEffect(() => {
    let cancelled = false;
    getTeamStats()
      .then((s) => {
        if (cancelled) return;
        const maps = parseMapStats(s);
        const total = Number(s.lifetime?.['Matches'] ?? 0);
        const winsRaw = s.lifetime?.['Wins'];
        const wins = winsRaw != null ? Number(winsRaw) : maps.reduce((a, m) => a + m.wins, 0);
        setState({ kind: 'ok', maps, total, wins });
      })
      .catch((e: Error) => {
        if (!cancelled) setState({ kind: 'error', message: e.message });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="section" id="mappool">
      <div className="bg-num" style={{ top: 0, left: 0 }}>05</div>
      <div className="wrap">
        <div className="section-label reveal">
          <span className="num">05</span>
          <span className="arrow">/</span>
          <span>Map Pool</span>
          <span className="arrow">→</span>
          <span>Карты и win-rate</span>
        </div>
        <div className="mappool-head reveal">
          <h2 className="h-display h-section reveal">Где мы <em>сильны.</em></h2>
          <div className="meta">
            FACEIT · CS2<br />
            {state.kind === 'ok'
              ? `${state.total} matches · ${state.wins}W`
              : state.kind === 'loading'
              ? 'Загрузка…'
              : 'Нет данных'}
          </div>
        </div>

        {state.kind === 'loading' && (
          <div className="mappool-empty">Загрузка статистики FACEIT…</div>
        )}

        {state.kind === 'error' && (
          <div className="mappool-empty">
            Не удалось получить данные FACEIT ({state.message}).<br />
            Проверь FACEIT_API_KEY в .env и перезапусти dev-сервер.
          </div>
        )}

        {state.kind === 'ok' && state.maps.length === 0 && (
          <div className="mappool-empty">Команда ещё не наиграла карт в CS2.</div>
        )}

        {state.kind === 'ok' && state.maps.length > 0 && (
          <div className="mappool-grid reveal-stagger">
            {state.maps.map((m) => {
              const wrClass = m.winRate >= 55 ? 'good' : m.winRate < 45 ? 'bad' : '';
              return (
                <div key={m.label} className={`map-card ${m.winRate < 45 ? 'low' : ''}`}>
                  <div className="mc-head">
                    <span className="short">{m.short}</span>
                    <span>{m.matches} maps</span>
                  </div>
                  <div className="mc-name">{m.label.replace(/^de_/, '')}</div>
                  <div className="mc-bar">
                    <span style={{ width: `${m.winRate}%` }} />
                  </div>
                  <div className="mc-meta">
                    <span>
                      {m.wins}W / {m.matches - m.wins}L
                    </span>
                    <span className={`wr ${wrClass}`}>{m.winRate}% WR</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
