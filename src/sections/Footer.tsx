import { Logo } from '../components/Logo';

export function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-marquee" />
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#top" className="logo-link" data-magnet aria-label="GameSport — на главную">
              <Logo width={180} />
            </a>
          </div>
          <div>
            <h4>Navigate</h4>
            <a href="#about">О команде</a>
            <a href="#roster">Состав</a>
            <a href="#matches">Матчи</a>
            <a href="#league">Лига</a>
            <a href="#series">Сериал</a>
            <a href="#streams">Стримы</a>
          </div>
          <div>
            <h4>Press / Contacts</h4>
            <a href="mailto:offers@gamesport.com">offers@gamesport.com</a>
            <a href="#">Партнёрство</a>
            <a href="#">Карьера</a>
            <a href="#">Бренд-кит</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© <span className="red">GameSport</span> 2026 · ALL RIGHTS RESERVED</span>
        </div>
        <div className="footer-watermark" aria-hidden="true">GAMESPORT</div>
      </div>
    </footer>
  );
}
