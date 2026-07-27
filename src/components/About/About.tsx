import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import {
  GraduationCap, Sparkles, Target, Compass,
  Code2, Brain, BarChart3, Terminal,
} from 'lucide-react';

const bioHighlights = [
  { icon: Code2,    label: 'Python Ecosystem',   detail: 'Django, Flask, FastAPI, Pandas, Scikit-learn' },
  { icon: Brain,    label: 'Machine Learning & AI', detail: 'Regression, Random Forest, Feature Eng., LLM' },
  { icon: BarChart3,label: 'Data Analytics',      detail: 'Power BI, SQL, NumPy, Matplotlib, Seaborn' },
  { icon: Terminal, label: 'Problem Solving',     detail: 'Clean Architecture, Modular Code, Deployment' },
];

const cardFade = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const About: React.FC = () => (
  <section id="about" className="py-24 relative z-10">
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

      {/* ── Header ────────────────────────────────────────── */}
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#38BDF8]/40 mb-3 text-[#38BDF8] text-xs font-semibold uppercase tracking-widest"
        >
          <Sparkles className="w-4 h-4" />
          <span>Discover My Journey</span>
        </motion.div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight text-glow">
          About <span className="text-[#38BDF8]">P. Moneesh Raj</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#2563EB] to-[#38BDF8] rounded-full mt-4" />
      </div>

      {/* ── Body Grid ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* Profile Card */}
        <div className="lg:col-span-4 flex justify-center">
          <Tilt
            tiltMaxAngleX={12} tiltMaxAngleY={12} perspective={1000}
            glareEnable glareMaxOpacity={0.25} glareColor="#38BDF8" glarePosition="all"
            className="w-full max-w-xs"
          >
            <div className="rounded-3xl p-[2px] bg-gradient-to-tr from-[#2563EB] via-[#38BDF8] to-[#1E40AF] shadow-[0_0_50px_rgba(56,189,248,0.25)]">
              <div className="rounded-[22px] glass-card p-6 flex flex-col items-center text-center">

                {/* Avatar */}
                <div className="w-44 h-52 rounded-2xl overflow-hidden mb-5 border-2 border-[#38BDF8]/50 shadow-[0_0_30px_rgba(56,189,248,0.35)]">
                  <img
                    src="/images/profile.jpg"
                    alt="P. Moneesh Raj"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <h3 className="text-xl font-bold text-white mb-0.5">P. Moneesh Raj</h3>
                <p className="text-xs text-[#38BDF8] font-semibold mb-3">M.Sc Computer Science Graduate</p>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-5">
                  Kancheepuram, Tamil Nadu, India · AI &amp; ML Engineer
                </p>

                {/* Availability Badge */}
                <div className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-900/80 border border-emerald-500/30 text-[11px] text-slate-300">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Open to Work
                  </span>
                  <span className="text-emerald-400 font-bold">AI / ML Roles</span>
                </div>
              </div>
            </div>
          </Tilt>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-8 flex flex-col gap-6">

          {/* Bio Card */}
          <motion.div
            variants={cardFade} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="p-8 rounded-3xl glass-card border border-[#38BDF8]/25"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#2563EB]/20 flex items-center justify-center text-[#38BDF8]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">Academic &amp; Professional Background</h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Holding a Master of Science (M.Sc) in Computer Science from the prestigious{' '}
              <strong className="text-[#38BDF8]">University of Madras</strong>, I have extensive hands-on
              expertise in building predictive Machine Learning systems, data visualisation dashboards,
              and high-performance backend microservices.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bioHighlights.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-3 hover:border-[#38BDF8]/40 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-[#2563EB]/20 text-[#38BDF8] shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-0.5">{item.label}</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                icon: Target,
                title: 'My Mission',
                text: 'Harness statistical modelling, ML, and clean software architecture to solve complex enterprise problems and deliver actionable business intelligence.',
              },
              {
                icon: Compass,
                title: 'My Vision',
                text: 'Push boundaries in AI and Full-Stack Data Science — engineering autonomous intelligent agents and real-time analytical systems.',
              },
            ].map(({ icon: Icon, title, text }, i) => (
              <motion.div
                key={i}
                variants={cardFade} initial="hidden" whileInView="show" viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-3xl glass-card border border-[#38BDF8]/20 flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#2563EB]/20 text-[#38BDF8] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white">{title}</h4>
                </div>
                <p className="text-[12px] text-slate-400 leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  </section>
);
