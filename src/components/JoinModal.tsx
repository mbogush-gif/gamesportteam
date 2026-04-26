import { useEffect, useRef, useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
}

type Status = 'idle' | 'sending' | 'sent';

export function JoinModal({ open, onClose }: Props) {
  const [nick, setNick] = useState('');
  const [tg, setTg] = useState('');
  const [about, setAbout] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    setStatus('idle');
    setTimeout(() => firstFieldRef.current?.focus(), 350);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const valid = nick.trim().length >= 2 && tg.trim().length >= 2 && about.trim().length >= 10;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || status !== 'idle') return;
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 900);
  }

  function reset() {
    setNick(''); setTg(''); setAbout(''); setStatus('idle');
  }

  return (
    <div
      className="modal open join-modal"
      aria-modal="true"
      role="dialog"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-inner join-inner">
        <button className="close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6 L18 18 M18 6 L6 18" />
          </svg>
        </button>

        <div className="join-grid">
          <aside className="join-side">
            <div className="join-side-tag">
              <span className="dot" /> RECRUITMENT · OPEN
            </div>
            <h3 className="join-title">
              JOIN<br />THE<br /><em>SQUAD</em>
            </h3>
            <p className="join-lede">
              Ищем рифлеров и AWP&#8209;еров с FACEIT&nbsp;3000+, дисциплиной
              на скриме и желанием жить турнирной сеткой. Открытый кастинг —
              без агентов и понтов.
            </p>
            <ul className="join-bullets">
              <li><span className="num">01</span> CS2 · 1.5k+ часов в&nbsp;competitive</li>
              <li><span className="num">02</span> ESEA / FACEIT уровень Lv.10</li>
              <li><span className="num">03</span> Готовность 6&nbsp;скримов в&nbsp;неделю</li>
              <li><span className="num">04</span> Микрофон, тишина, RU/EN коллы</li>
            </ul>
            <div className="join-side-foot">
              SEASON 57 · TRYOUTS<br />
              <strong>RESPONSE WITHIN 48H</strong>
            </div>
          </aside>

          <div className="join-form-wrap">
            {status === 'sent' ? (
              <div className="join-success">
                <div className="join-success-mark">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 12 l5 5 L20 6" />
                  </svg>
                </div>
                <div className="join-success-title">SIGNAL RECEIVED</div>
                <p>
                  Заявка ушла менеджеру. Если профиль зайдёт — вернёмся
                  в&nbsp;течение 48&nbsp;часов в&nbsp;Telegram.<br />
                  GLHF, <strong>{nick.toUpperCase()}</strong>.
                </p>
                <div className="join-success-actions">
                  <button type="button" className="join-submit ghost" onClick={() => { reset(); }}>
                    Отправить ещё
                  </button>
                  <button type="button" className="join-submit" onClick={onClose}>
                    Закрыть
                  </button>
                </div>
              </div>
            ) : (
              <form className="join-form" onSubmit={submit} noValidate>
                <header className="join-form-head">
                  <span className="join-form-tag">FORM_03 / TRYOUT</span>
                  <h4>Заявка в&nbsp;состав</h4>
                  <p>Заполни три поля. Без воды — только то, что важно.</p>
                </header>

                <label className="join-field">
                  <span className="lbl"><span className="k">01</span> Ник / Nickname</span>
                  <input
                    ref={firstFieldRef}
                    type="text"
                    value={nick}
                    onChange={e => setNick(e.target.value)}
                    placeholder="например, n0vasky"
                    maxLength={32}
                    required
                  />
                </label>

                <label className="join-field">
                  <span className="lbl"><span className="k">02</span> Telegram</span>
                  <input
                    type="text"
                    value={tg}
                    onChange={e => setTg(e.target.value.replace(/^@+/, ''))}
                    placeholder="@username"
                    maxLength={48}
                    required
                  />
                  <span className="hint">мы напишем сюда. Без открытого Telegram заявку не рассматриваем.</span>
                </label>

                <label className="join-field">
                  <span className="lbl"><span className="k">03</span> О себе</span>
                  <textarea
                    value={about}
                    onChange={e => setAbout(e.target.value)}
                    placeholder="Возраст, город, ELO, амплуа (IGL / AWP / Rifler / Support), часы в CS2, любимые карты, опыт в командах. Что умеешь делать лучше всех."
                    maxLength={800}
                    rows={6}
                    required
                  />
                  <span className="hint">{about.length}/800</span>
                </label>

                <div className="join-form-foot">
                  <span className="join-disclaimer">
                    Отправляя форму, ты соглашаешься, что мы свяжемся в&nbsp;Telegram.
                  </span>
                  <button
                    type="submit"
                    className="join-submit"
                    disabled={!valid || status === 'sending'}
                  >
                    {status === 'sending' ? 'TRANSMITTING…' : 'SEND APPLICATION →'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
