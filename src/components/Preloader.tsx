import { useEffect, useState } from 'react';
import { Logo } from './Logo';

export function Preloader({ onDone }: { onDone: () => void }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setDone(true);
      setTimeout(onDone, 600);
    }, 1400);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className={`preloader${done ? ' done' : ''}`}>
      <div className="pl-logo-wrap">
        <Logo width={280} className="pl-logo-svg" />
      </div>
      <div className="pl-bar" />
      <div className="pl-meta">LOADING SYSTEM · CS2 · ESEA SEASON 57</div>
    </div>
  );
}
