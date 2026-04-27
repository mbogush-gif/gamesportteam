import { useState } from 'react';
import { PLAYERS, STAFF, FLAGS } from '../data';
import { PlayerModal, type PersonForModal } from '../components/PlayerModal';
import { JoinModal } from '../components/JoinModal';
import { asset } from '../lib/asset';

type Player = typeof PLAYERS[number];
type Staff = typeof STAFF[number];

interface CardPerson {
  nick: string;
  name: string;
  role: string;
  city: string;
  country: string;
  photo: string;
}

function PersonCard({
  person,
  idx,
  gridIdx,
  badge,
  onClick,
  socials,
}: {
  person: CardPerson;
  idx: number;
  gridIdx?: number;
  badge: { lbl: string; value: string };
  onClick: () => void;
  socials: Player['socials'];
}) {
  const cls = gridIdx !== undefined ? `player p${gridIdx}` : 'player';
  return (
    <div
      className={cls}
      onClick={onClick}
      data-view
      tabIndex={0}
      role="button"
      aria-label={`Открыть профиль ${person.nick}`}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
    >
      <div className="silhouette">
        <img className="player-photo" src={asset(person.photo)} alt={person.nick} />
      </div>
      <div className="num">#{String(idx + 1).padStart(2, '0')}</div>
      <div className="elo-badge">
        <span className="lbl">{badge.lbl}</span>
        {badge.value}
      </div>
      <div className="info">
        <div className="nick">{person.nick}</div>
        <div className="name">{person.name}</div>
        <div className="role"><span className="dot" />{person.role}</div>
        <div className="geo">
          <span dangerouslySetInnerHTML={{ __html: FLAGS[person.country] || '' }} />
          {person.city}
        </div>
      </div>
      <div className="progress" />
      <div className="socials-flyout">
        {socials.faceit && <a href={`https://${socials.faceit}`} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} aria-label="FACEIT">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd"><path fillRule="evenodd" d="M0 0v24h24V0H0zm12.487 18.424-4.952-4.952 4.952-4.952 1.274 1.275-3.678 3.677 3.678 3.677-1.274 1.275zm4.03-1.275-3.678-3.677 3.678-3.677 1.275-1.275 4.952 4.952-4.952 4.952-1.275-1.275z"/></svg>
        </a>}
        {socials.steam && <a href={`https://${socials.steam}`} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} aria-label="Steam">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.187.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.252 0-2.265-1.014-2.265-2.265z"/></svg>
        </a>}
        {socials.twitch && <a href={`https://${socials.twitch}`} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} aria-label="Twitch">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg>
        </a>}
        {socials.telegram && <a href={`https://${socials.telegram}`} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} aria-label="Telegram">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
        </a>}
      </div>
    </div>
  );
}

function JoinCard({ idx, onClick }: { idx: number; onClick: () => void }) {
  return (
    <div
      className="player player-join"
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label="Открыть форму заявки в команду"
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
    >
      <div className="silhouette join-silhouette" />
      <div className="num">#{String(idx + 1).padStart(2, '0')}</div>
      <div className="elo-badge join-badge">
        <span className="lbl">ROLE</span>
        OPEN
      </div>

      <div className="join-plus" aria-hidden="true">
        <span className="ring r1" />
        <span className="ring r2" />
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M12 4 v16 M4 12 h16" />
        </svg>
      </div>

      <div className="join-scan" />

      <div className="info join-info">
        <div className="nick">JOIN<br />THE&nbsp;SQUAD</div>
        <div className="name">CS2 · MAIN B · TRYOUT OPEN</div>
        <div className="role"><span className="dot" />ОТКРЫТЫЙ КАСТИНГ</div>
        <div className="geo">RESPONSE · 48H</div>
      </div>
      <div className="progress" />
    </div>
  );
}

export function Roster() {
  const [active, setActive] = useState<PersonForModal | null>(null);
  const [joinOpen, setJoinOpen] = useState(false);

  return (
    <>
      <section className="section" id="roster">
        <div className="bg-num" style={{ top: 0, left: 0 }}>03</div>
        <div className="wrap">
          <div className="section-label reveal">
            <span className="num">03</span><span className="arrow">/</span><span>Roster</span><span className="arrow">→</span><span>Состав</span>
          </div>
          <div className="roster-head">
            <h2 className="h-display h-section reveal">Состав <em>команды</em></h2>
            <div className="meta reveal">
              ESEA SEASON 57<br />
              <strong>MAIN B</strong> · CIS<br />
              UPDATED 25.04.2026
            </div>
          </div>

          <div className="roster-grid" id="rosterGrid">
            {PLAYERS.map((p, i) => (
              <PersonCard
                key={p.nick}
                person={p}
                idx={i}
                gridIdx={i}
                badge={{ lbl: 'ELO', value: p.elo.toLocaleString() }}
                onClick={() => setActive({ kind: 'player', data: p })}
                socials={p.socials}
              />
            ))}
          </div>

          <div className="roster-head" style={{ marginTop: 56 }}>
            <h2 className="h-display h-section reveal">Тренерский <em>штаб</em></h2>
            <div className="meta reveal">
              COACHING · MANAGEMENT · TRYOUTS<br />
              <strong>{STAFF.length} ЧЕЛОВЕКА · 1 СЛОТ</strong>
            </div>
          </div>

          <div className="roster-grid staff-grid">
            {STAFF.map((s: Staff, i: number) => (
              <PersonCard
                key={s.nick}
                person={s}
                idx={i}
                badge={s.badge}
                onClick={() => setActive({ kind: 'staff', data: s })}
                socials={s.socials}
              />
            ))}
            <JoinCard idx={STAFF.length} onClick={() => setJoinOpen(true)} />
          </div>
        </div>
      </section>

      <PlayerModal person={active} onClose={() => setActive(null)} />
      <JoinModal open={joinOpen} onClose={() => setJoinOpen(false)} />
    </>
  );
}
