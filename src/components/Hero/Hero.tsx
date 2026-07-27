import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import {
  Download, FolderGit2, Send,
  ChevronDown, BrainCircuit,
} from 'lucide-react';
import { Hero3DScene } from './Hero3DScene';
import { downloadResumePDF } from '../../utils/downloadResume';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-20 pb-12 overflow-hidden"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: Text ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            {/* Badge */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[#38BDF8]/40 mb-6 text-[#38BDF8] text-xs font-semibold tracking-widest uppercase shadow-[0_0_20px_rgba(56,189,248,0.18)]"
            >
              <BrainCircuit className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Next-Gen AI &amp; Data Portfolio</span>
            </motion.div>

            {/* Name */}
            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold text-white tracking-tight mb-4 leading-[1.05]">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-[#38BDF8] via-[#60A5FA] to-[#2563EB] bg-clip-text text-transparent text-glow-lg block mt-1">
                P. Moneesh Raj
              </span>
            </h1>

            {/* Typing Animation */}
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6 h-12 text-xl sm:text-2xl font-bold text-slate-300">
              <span className="text-[#38BDF8]">I am a</span>
              <TypeAnimation
                sequence={[
                  'Python Developer',   2200,
                  'Data Analyst',       2000,
                  'ML Engineer',        2200,
                  'AI Enthusiast',      2000,
                  'Data Scientist',     2200,
                ]}
                wrapper="span"
                speed={52}
                repeat={Infinity}
                className="text-[#38BDF8] underline decoration-[#2563EB] decoration-2 underline-offset-8"
              />
            </div>

            {/* Bio */}
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl mb-10 text-center lg:text-left">
              M.Sc Computer Science graduate specialising in Python, Scikit-learn, SQL,
              Power BI, and Deep Learning. Engineering intelligent predictive algorithms,
              automated analytics pipelines, and ultra-scalable web platforms.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <motion.button
                whileHover={{ scale: 1.06, boxShadow: '0 0 28px #38BDF8' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => downloadResumePDF()}
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#38BDF8] text-white font-bold text-sm shadow-[0_4px_20px_rgba(37,99,235,0.45)] transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => scrollTo('projects')}
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl glass-panel border border-[#38BDF8]/40 text-[#38BDF8] font-bold text-sm hover:bg-[#38BDF8]/10 transition-all cursor-pointer"
              >
                <FolderGit2 className="w-4 h-4" />
                View Projects
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => scrollTo('contact')}
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-slate-900/70 border border-slate-700 text-slate-200 font-bold text-sm hover:border-[#38BDF8] transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-[#38BDF8]" />
                Hire Me
              </motion.button>
            </div>
          </motion.div>

          {/* ── Right: 3D Dashboard Card Scene ──────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative rounded-3xl p-[2px] bg-gradient-to-br from-[#38BDF8]/40 via-[#2563EB]/20 to-transparent shadow-[0_0_60px_rgba(37,99,235,0.35)]">
              <div className="rounded-3xl glass-card overflow-hidden">
                <Hero3DScene />
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-slate-500 hover:text-[#38BDF8] transition-colors z-10 cursor-pointer"
        onClick={() => scrollTo('about')}
      >
        <span className="text-[10px] tracking-widest uppercase mb-1">Scroll</span>
        <ChevronDown className="w-5 h-5" />
      </motion.button>
    </section>
  );
};
