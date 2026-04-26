import { useEffect, useState } from 'react';
import { PLAYERS, FLAGS, MATCHES, type StaffMember } from '../data';
import { asset } from '../lib/asset';

type Player = typeof PLAYERS[number];

export type PersonForModal =
  | { kind: 'player'; data: Player }
  | { kind: 'staff'; data: StaffMember };

interface Props {
  person: PersonForModal | null;
  onClose: () => void;
}

export function PlayerModal({ person, onClose }: Props) {
  const isPlayer = person?.kind === 'player';
  const [tab, setTab] = useState<'stats' | 'setup' | 'matches'>('stats');

  useEffect(() => {
    if (!person) return;
    setTab('stats');
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [person, onClose]);

  if (!person) return null;

  const p = person.data;
  const idx = isPlayer ? PLAYERS.indexOf(person.data) : -1;
  const numLabel = isPlayer ? `#${String(idx + 1).padStart(2, '0')}` : person.data.badge.value;

  return (
    <div className={`modal open`} aria-modal="true" role="dialog" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-inner">
        <button className="close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6 L18 18 M18 6 L6 18"/>
          </svg>
        </button>

        <div className="modal-grid">
          <div className="modal-photo">
            <img className="player-photo-modal" src={asset(p.photo)} alt={p.nick} />
            <div className="modal-num">{numLabel}</div>
            {isPlayer ? (
              <div className="modal-elo">
                <span className="lbl">FACEIT ELO</span>
                <span className="v">{person.data.elo.toLocaleString()}</span>
              </div>
            ) : (
              <div className="modal-elo">
                <span className="lbl">{person.data.badge.lbl}</span>
                <span className="v">{person.data.badge.value}</span>
              </div>
            )}
            <div className="modal-watermark">{p.nick.toUpperCase()}</div>
          </div>

          <div className="modal-info">
            <div className="header">
              <h3>{p.nick}</h3>
              <div className="name">{p.name} · {p.age} лет · {p.city}</div>
              <div className="role">{p.role}</div>
            </div>

            <div className="tabs">
              <button className={tab === 'stats' ? 'active' : ''} onClick={() => setTab('stats')}>Профиль</button>
              <button className={tab === 'setup' ? 'active' : ''} onClick={() => setTab('setup')}>Сетап</button>
              {isPlayer && (
                <button className={tab === 'matches' ? 'active' : ''} onClick={() => setTab('matches')}>Матчи</button>
              )}
            </div>

            {tab === 'stats' && (
              <div className="tab-content active">
                <div className="profile-grid">
                  {isPlayer ? (
                    <>
                      <div className="item"><div className="lbl">FACEIT ELO</div><div className="val">{person.data.elo.toLocaleString()}</div></div>
                      <div className="item"><div className="lbl">Возраст</div><div className="val">{p.age}</div></div>
                      <div className="item"><div className="lbl">Дата рождения</div><div className="val sm">{person.data.birth}</div></div>
                    </>
                  ) : (
                    <>
                      {person.data.stats.map((s, i) => (
                        <div className="item" key={i}><div className="lbl">{s.k}</div><div className="val">{s.v}</div></div>
                      ))}
                    </>
                  )}
                  <div className="item"><div className="lbl">Город</div><div className="val sm">{p.city}</div></div>
                  <div className="item"><div className="lbl">Роль</div><div className="val sm">{p.role}</div></div>
                  <div className="item">
                    <div className="lbl">Страна</div>
                    <div className="val sm" dangerouslySetInnerHTML={{ __html: FLAGS[p.country] || p.country }} />
                  </div>
                </div>
              </div>
            )}

            {tab === 'setup' && (
              <div className="tab-content active">
                <div className="setup-list">
                  <div className="item">
                    <div className="ico">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M3 12h1M20 12h1M12 3v1M12 20v1"/></svg>
                    </div>
                    <div className="label"><b>Мышь</b>{p.setup.mouse}</div>
                    <div className="tag">INPUT</div>
                  </div>
                  <div className="item">
                    <div className="ico">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="10" rx="1"/><path d="M8 7v10M16 7v10M2 12h20"/></svg>
                    </div>
                    <div className="label"><b>Клавиатура</b>{p.setup.keyboard}</div>
                    <div className="tag">INPUT</div>
                  </div>
                  <div className="item">
                    <div className="ico">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
                    </div>
                    <div className="label"><b>Гарнитура</b>{p.setup.headset}</div>
                    <div className="tag">AUDIO</div>
                  </div>
                </div>
              </div>
            )}

            {tab === 'matches' && isPlayer && (
              <div className="tab-content active">
                <div className="matches-mini">
                  {MATCHES.map((m, i) => (
                    <div className="row" key={i}>
                      <span style={{ color: 'var(--mute)' }}>{m.date}</span>
                      <span>{m.opp}</span>
                      <span style={{ color: 'var(--mute)', fontSize: 10 }}>{m.tour.split('·')[0]}</span>
                      <span className={`res ${m.win ? 'win' : 'loss'}`}>{m.result}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="modal-socials">
              {p.socials.faceit && (
                <a href={`https://${p.socials.faceit}`} target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M0 0v24h24V0zm12.487 18.424-4.952-4.952 4.952-4.952 1.274 1.275-3.678 3.677 3.678 3.677zm4.03-1.275-3.678-3.677 3.678-3.677 1.275-1.275 4.952 4.952-4.952 4.952z"/></svg>
                  FACEIT
                </a>
              )}
              {p.socials.steam && (
                <a href={`https://${p.socials.steam}`} target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.187.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.252 0-2.265-1.014-2.265-2.265z"/></svg>
                  STEAM
                </a>
              )}
              {'telegram' in p.socials && p.socials.telegram && (
                <a href={`https://${p.socials.telegram}`} target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                  TELEGRAM
                </a>
              )}
              {p.socials.twitch && (
                <a href={`https://${p.socials.twitch}`} target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg>
                  TWITCH
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
