import { useEffect, useState } from 'react';
import { Cursor } from './components/Cursor';
import { Preloader } from './components/Preloader';
import { Header } from './components/Header';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Roster } from './sections/Roster';
import { Matches } from './sections/Matches';
import { League } from './sections/League';
import { Series } from './sections/Series';
import { Stats } from './sections/Stats';
import { Highlight } from './sections/Highlight';
import { Streams } from './sections/Streams';
import { CtaSection } from './sections/CtaSection';
import { Footer } from './sections/Footer';
import { useReveal, useScrollIndicator, useActiveNav } from './hooks/useReveal';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useReveal();
  useScrollIndicator();
  useActiveNav();

  return (
    <>
      <Preloader onDone={() => setLoaded(true)} />

      <div className="grain" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg">
          <filter id="n">
            <feTurbulence baseFrequency=".9" numOctaves={3} stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#n)"/>
        </svg>
      </div>

      <Cursor />

      <div className="scroll-indicator" aria-hidden="true">
        <span id="scrollFill" />
      </div>

      <Header />

      <main>
        <Hero />
        <div className="divider" />
        <About />
        <div className="divider" />
        <Roster />
        <div className="divider" />
        <Matches />
        <div className="divider" />
        <League />
        <div className="divider" />
        <Highlight />
        <div className="divider" />
        <Stats />
        <div className="divider" />
        <Series />
        <div className="divider" />
        <Streams />
        <div className="divider" />
        <CtaSection />
      </main>

      <Footer />
    </>
  );
}
