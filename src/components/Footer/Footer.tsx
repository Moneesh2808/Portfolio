import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#020617] border-t border-[#38BDF8]/20 pt-16 pb-8 overflow-hidden z-10">
      
      {/* Animated Wave Top Divider */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent shadow-[0_0_15px_#38BDF8]" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800 text-center md:text-left">
          
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start">
            <div
              onClick={scrollToTop}
              className="flex items-center gap-3 cursor-pointer group mb-4"
            >
              <div className="w-12 h-12 rounded-full bg-white p-1 flex items-center justify-center shadow-[0_0_20px_#38BDF8] border-2 border-[#38BDF8] group-hover:scale-105 transition-transform overflow-hidden shrink-0">
                <img src="/images/logo.png" alt="Moneesh Raj Logo" className="w-full h-full object-contain" />
              </div>
              <div className="text-left">
                <h3 className="font-extrabold text-xl text-white group-hover:text-[#38BDF8] transition-colors">
                  P. Moneesh Raj
                </h3>
                <p className="text-xs text-[#38BDF8] tracking-widest uppercase">
                  3D AI &amp; DATA PORTFOLIO
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-sm mb-6 leading-relaxed text-center md:text-left">
              Engineering high-accuracy Machine Learning models, predictive data pipelines, and full-stack Python solutions. Dedicated to creating high-impact AI technology.
            </p>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <a
                href="https://github.com/Moneesh2808"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:border-[#38BDF8] hover:text-[#38BDF8] transition-all"
              >
                <FaGithub className="w-5 h-5" />
              </a>

              <a
                href="https://www.linkedin.com/in/moneesh2808"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:border-[#38BDF8] hover:text-[#38BDF8] transition-all"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>

              <a
                href="mailto:moneesh2808@gmail.com"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:border-[#38BDF8] hover:text-[#38BDF8] transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 text-[#38BDF8]">
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-slate-400 w-full max-w-xs md:max-w-none text-center md:text-left">
              <button onClick={() => scrollTo('about')} className="hover:text-[#38BDF8] transition-colors md:text-left">
                About
              </button>
              <button onClick={() => scrollTo('skills')} className="hover:text-[#38BDF8] transition-colors md:text-left">
                Skills
              </button>
              <button onClick={() => scrollTo('projects')} className="hover:text-[#38BDF8] transition-colors md:text-left">
                Projects
              </button>
              <button onClick={() => scrollTo('experience')} className="hover:text-[#38BDF8] transition-colors md:text-left">
                Experience
              </button>
              <button onClick={() => scrollTo('education')} className="hover:text-[#38BDF8] transition-colors md:text-left">
                Education
              </button>
              <button onClick={() => scrollTo('certifications')} className="hover:text-[#38BDF8] transition-colors md:text-left">
                Certifications
              </button>
              <button onClick={() => scrollTo('achievements')} className="hover:text-[#38BDF8] transition-colors md:text-left">
                Achievements
              </button>
              <button onClick={() => scrollTo('contact')} className="hover:text-[#38BDF8] transition-colors md:text-left">
                Contact
              </button>
            </div>
          </div>

          {/* Direct Contact info */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 text-[#38BDF8]">
              Location &amp; Contact
            </h4>
            <div className="space-y-2 text-xs text-slate-400 text-center md:text-left">
              <p>Kancheepuram, Tamil Nadu, India</p>
              <p>Phone: +91 8124567215</p>
              <p>Email: moneesh2808@gmail.com</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Back to top button */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center">
          <p>© {new Date().getFullYear()} P. Moneesh Raj. All rights reserved.</p>

          <motion.button
            whileHover={{ scale: 1.1, boxShadow: '0 0 20px #38BDF8' }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass-panel border border-[#38BDF8]/40 text-[#38BDF8] font-bold text-xs hover:bg-[#38BDF8]/20 transition-all"
          >
            <span>Back To Top</span>
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>

      </div>
    </footer>
  );
};
