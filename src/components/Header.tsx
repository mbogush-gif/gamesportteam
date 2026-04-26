import { useEffect, useState } from 'react';
import { Logo } from './Logo';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <header className={`hdr${scrolled ? ' scrolled' : ''}`} id="hdr">
        <a href="#top" className="logo-link" data-magnet aria-label="GameSport — на главную">
          <Logo width={132} />
        </a>

        <nav className="nav" id="nav">
          <a href="#about" data-magnet data-target="about">Состав команды</a>
          <a href="#roster" data-magnet data-target="roster">Игроки</a>
          <a href="#matches" data-magnet data-target="matches">Матчи</a>
          <a href="#league" data-magnet data-target="league">Лига</a>
          <a href="#series" data-magnet data-target="series">Сериал</a>
          <a href="#streams" data-magnet data-target="streams">Стримы</a>
          <a href="#footer" data-magnet data-target="footer">Контакты</a>
        </nav>

        <div className="hdr-right">
          <div className="social-mini">
            <a href="https://t.me/yagagarin52" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9.04 15.34l-.39 5.5c.56 0 .8-.24 1.1-.53l2.63-2.5 5.45 3.99c1 .55 1.7.26 1.97-.92l3.57-16.7c.3-1.42-.5-1.98-1.5-1.6L1.84 9.02C.4 9.6.42 10.4 1.6 10.78l5.13 1.6L18.6 4.86c.55-.36 1.05-.16.64.2"/></svg>
            </a>
            <a href="https://www.youtube.com/@gamesport.official" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2c-.3-1-1-1.8-2-2.1C19.7 3.5 12 3.5 12 3.5s-7.7 0-9.5.6c-1 .3-1.7 1.1-2 2.1C0 8 0 12 0 12s0 4 .5 5.8c.3 1 1 1.8 2 2.1 1.8.6 9.5.6 9.5.6s7.7 0 9.5-.6c1-.3 1.7-1.1 2-2.1.5-1.8.5-5.8.5-5.8s0-4-.5-5.8zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z"/></svg>
            </a>
            <a href="https://www.twitch.tv/gamesport_stream" target="_blank" rel="noopener noreferrer" aria-label="Twitch">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.571 4.714h1.715v5.143h-1.715zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg>
            </a>
          </div>
          <button className={`burger${open ? ' open' : ''}`} id="burger" aria-label="Menu" onClick={() => setOpen(v => !v)}>
            <span /><span /><span />
          </button>
        </div>
      </header>

      <div className={`mob-overlay${open ? ' open' : ''}`} id="mobOverlay">
        <a href="#about" onClick={close}>Состав</a>
        <a href="#matches" onClick={close}>Матчи</a>
        <a href="#league" onClick={close}>Лига</a>
        <a href="#series" onClick={close}>Сериал</a>
        <a href="#streams" onClick={close}>Стримы</a>
      </div>
    </>
  );
}
