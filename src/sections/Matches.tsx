import { MATCHES } from '../data';

export function Matches() {
  return (
    <section className="section" id="matches">
      <div className="bg-num" style={{ top: 0, right: 0 }}>04</div>
      <div className="wrap">
        <div className="section-label reveal">
          <span className="num">04</span><span className="arrow">/</span><span>Результаты</span><span className="arrow">→</span><span>Последние матчи</span>
        </div>
        <h2 className="h-display h-section reveal">
          Последние <em>матчи.</em>
        </h2>
        <div className="matches reveal-stagger">
          {MATCHES.map((m, i) => (
            <div className="match" key={i}>
              <div className="m-date">{m.date}</div>
              <div className="m-tour">{m.tour}</div>
              <div className="m-opp">
                <div className="logo-ph">
                  {m.oppLogo
                    ? <img src={m.oppLogo} alt={m.opp} loading="lazy" />
                    : m.oppShort}
                </div>
                <div className="name">
                  {m.opp}
                  <b>{m.tour.split('·')[0].trim()}</b>
                </div>
              </div>
              <div className="m-score">
                {m.maps.map((mp, j) => (
                  <div key={j} className={`map ${mp.win ? 'win' : 'loss'}`}>
                    <span className="map-name">{mp.name}</span>
                    {mp.score}
                  </div>
                ))}
              </div>
              <div className={`m-result ${m.win ? 'win' : 'loss'}`}>{m.result}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
