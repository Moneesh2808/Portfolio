import { useEffect } from 'react';
import Lenis from 'lenis';
import { CanvasBackground } from './components/Background/CanvasBackground';
import { CustomCursor } from './components/Cursor/CustomCursor';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { Skills } from './components/Skills/Skills';
import { Projects } from './components/Projects/Projects';
import { Experience } from './components/Experience/Experience';
import { Education } from './components/Education/Education';
import { Certificates } from './components/Certificates/Certificates';
import { Achievements } from './components/Achievements/Achievements';
import { ResumeViewer } from './components/Resume/ResumeViewer';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';

export function App() {
  useEffect(() => {
    try {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });
      const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
      return () => lenis.destroy();
    } catch {
      /* smooth scroll not available */
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#020617] text-white overflow-x-hidden font-sans selection:bg-[#38BDF8]/30 selection:text-white">

      {/* Universe 2D Canvas background */}
      <ErrorBoundary fallback={null}>
        <CanvasBackground />
      </ErrorBoundary>

      {/* Custom cursor (desktop only) */}
      <ErrorBoundary fallback={null}>
        <CustomCursor />
      </ErrorBoundary>

      {/* Top navigation */}
      <ErrorBoundary fallback={null}>
        <Navbar />
      </ErrorBoundary>

      {/* Main content — full width, no sidebar offset */}
      <main className="relative z-10">
        <ErrorBoundary><Hero /></ErrorBoundary>

        <div className="section-divider my-2" />
        <ErrorBoundary><About /></ErrorBoundary>

        <div className="section-divider my-2" />
        <ErrorBoundary><Skills /></ErrorBoundary>

        <div className="section-divider my-2" />
        <ErrorBoundary><Projects /></ErrorBoundary>

        <div className="section-divider my-2" />
        <ErrorBoundary><Experience /></ErrorBoundary>

        <div className="section-divider my-2" />
        <ErrorBoundary><Education /></ErrorBoundary>

        <div className="section-divider my-2" />
        <ErrorBoundary><Certificates /></ErrorBoundary>

        <div className="section-divider my-2" />
        <ErrorBoundary><Achievements /></ErrorBoundary>

        <div className="section-divider my-2" />
        <ErrorBoundary><ResumeViewer /></ErrorBoundary>

        <div className="section-divider my-2" />
        <ErrorBoundary><Contact /></ErrorBoundary>
      </main>

      <ErrorBoundary><Footer /></ErrorBoundary>
    </div>
  );
}

export default App;
