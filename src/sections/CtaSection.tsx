export function CtaSection() {
  return (
    <section className="cta-section">
      <div className="bg-num" style={{ top: 0, left: '50%', transform: 'translateX(-50%)' }}>∞</div>
      <div className="wrap">
        <div className="cta-pre reveal">— Следи за командой</div>
        <h2 className="cta-text reveal">
          <span>JOIN<br />THE&nbsp;RIDE</span>
          <span className="layer l1" aria-hidden="true">JOIN<br />THE&nbsp;RIDE</span>
          <span className="layer l2" aria-hidden="true">JOIN<br />THE&nbsp;RIDE</span>
        </h2>
        <div className="cta-socials reveal-stagger">
          <a href="#" aria-label="Telegram">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M9.04 15.34l-.39 5.5c.56 0 .8-.24 1.1-.53l2.63-2.5 5.45 3.99c1 .55 1.7.26 1.97-.92l3.57-16.7c.3-1.42-.5-1.98-1.5-1.6L1.84 9.02C.4 9.6.42 10.4 1.6 10.78l5.13 1.6L18.6 4.86c.55-.36 1.05-.16.64.2"/></svg>
          </a>
          <a href="#" aria-label="YouTube">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2c-.3-1-1-1.8-2-2.1C19.7 3.5 12 3.5 12 3.5s-7.7 0-9.5.6c-1 .3-1.7 1.1-2 2.1C0 8 0 12 0 12s0 4 .5 5.8c.3 1 1 1.8 2 2.1 1.8.6 9.5.6 9.5.6s7.7 0 9.5-.6c1-.3 1.7-1.1 2-2.1.5-1.8.5-5.8.5-5.8s0-4-.5-5.8zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z"/></svg>
          </a>
          <a href="#" aria-label="Twitch">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M11.571 4.714h1.715v5.143h-1.715zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg>
          </a>
          <a href="#" aria-label="VK">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12.78 17.39h1.45s.44-.05.66-.29c.2-.21.2-.62.2-.62s-.03-1.96.88-2.25c.9-.28 2.05 1.9 3.27 2.74.92.64 1.62.5 1.62.5l3.27-.05s1.71-.1.9-1.46c-.07-.1-.47-1-2.43-2.83-2.05-1.92-1.78-1.6.7-4.9 1.5-2.02 2.1-3.25 1.92-3.78-.18-.5-1.3-.37-1.3-.37l-3.68.02s-.27-.04-.47.08c-.2.12-.33.4-.33.4s-.59 1.58-1.38 2.92c-1.66 2.83-2.33 2.98-2.6 2.81-.63-.4-.47-1.62-.47-2.5 0-2.71.4-3.85-.8-4.14-.4-.1-.69-.16-1.7-.17-1.3-.01-2.4 0-3.02.3-.41.2-.73.65-.54.68.24.04.78.15 1.07.54.37.5.36 1.62.36 1.62s.21 3.13-.5 3.51c-.5.27-1.16-.27-2.64-2.83-.76-1.31-1.33-2.76-1.33-2.76s-.11-.27-.31-.41c-.24-.18-.58-.23-.58-.23l-3.49.02s-.52.02-.71.25c-.18.2-.01.62-.01.62s2.74 6.4 5.83 9.62c2.84 2.95 6.07 2.76 6.07 2.76z"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
