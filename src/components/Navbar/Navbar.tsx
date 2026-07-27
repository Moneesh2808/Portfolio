import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  User,
  Cpu,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Award,
  Trophy,
  FileText,
  Mail,
  Menu,
  X,
} from 'lucide-react';

const navItems = [
  { id: 'hero',          label: 'Home',          icon: Home },
  { id: 'about',         label: 'About',         icon: User },
  { id: 'skills',        label: 'Skills',        icon: Cpu },
  { id: 'projects',      label: 'Projects',      icon: FolderGit2 },
  { id: 'experience',    label: 'Experience',    icon: Briefcase },
  { id: 'education',     label: 'Education',     icon: GraduationCap },
  { id: 'certifications',label: 'Certs',         icon: Award },
  { id: 'achievements',  label: 'Achievements',  icon: Trophy },
  { id: 'resume',        label: 'Resume',        icon: FileText },
  { id: 'contact',       label: 'Contact',       icon: Mail },
];

export const Navbar: React.FC = () => {
  const [active, setActive] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const pos = window.scrollY + 120;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(navItems[i].id);
        if (el && el.offsetTop <= pos) {
          setActive(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Top Navigation Bar ─────────────────────────────── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'navbar-scrolled' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">

            {/* ── Logo ───────────────────────────────────────── */}
            <button
              onClick={() => go('hero')}
              className="flex items-center gap-3 group shrink-0"
            >
              <div className="w-11 h-11 rounded-full bg-white p-1 flex items-center justify-center shadow-[0_0_20px_#38BDF8] border-2 border-[#38BDF8] group-hover:scale-110 group-hover:shadow-[0_0_30px_#38BDF8] transition-all duration-300 overflow-hidden shrink-0">
                <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <span className="hidden sm:block text-base font-bold text-white group-hover:text-[#38BDF8] transition-colors tracking-wide">
                Moneesh <span className="text-[#38BDF8]">Raj</span>
              </span>
            </button>

            {/* ── Desktop Nav Links ──────────────────────────── */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map(({ id, label, icon: Icon }) => {
                const isActive = active === id;
                return (
                  <button
                    key={id}
                    onClick={() => go(id)}
                    className={`relative px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-250 flex items-center gap-1.5 ${
                      isActive
                        ? 'text-[#38BDF8] bg-[#38BDF8]/10'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="navUnderline"
                        className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-gradient-to-r from-[#2563EB] to-[#38BDF8] shadow-[0_0_8px_#38BDF8]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* ── CTA + Hamburger ────────────────────────────── */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => go('contact')}
                className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#2563EB] to-[#38BDF8] text-white text-xs font-bold tracking-wide shadow-[0_0_18px_rgba(37,99,235,0.5)] hover:shadow-[0_0_28px_#38BDF8] hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Hire Me
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-slate-900/80 border border-[#38BDF8]/30 text-[#38BDF8] hover:border-[#38BDF8] transition-all"
                aria-label="Toggle Menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Menu ────────────────────────────────────── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-[#020a1f]/95 backdrop-blur-2xl border-b border-[#38BDF8]/15 px-4 py-5"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-w-lg mx-auto">
                {navItems.map(({ id, label, icon: Icon }) => {
                  const isActive = active === id;
                  return (
                    <button
                      key={id}
                      onClick={() => go(id)}
                      className={`flex items-center gap-2.5 p-3 rounded-2xl border text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? 'bg-[#2563EB]/25 border-[#38BDF8]/70 text-[#38BDF8] shadow-[0_0_12px_rgba(56,189,248,0.25)]'
                          : 'border-slate-800 text-slate-300 hover:border-[#38BDF8]/40 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#38BDF8] shrink-0" />
                      <span>{label}</span>
                    </button>
                  );
                })}

                <button
                  onClick={() => go('contact')}
                  className="col-span-2 sm:col-span-3 py-3 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#38BDF8] text-white text-sm font-bold shadow-lg mt-1 hover:shadow-[0_0_20px_#38BDF8] transition-all"
                >
                  Hire Me
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};
