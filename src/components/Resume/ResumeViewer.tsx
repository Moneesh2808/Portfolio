import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Download, Sparkles, FileText } from 'lucide-react';
import { downloadResumePDF } from '../../utils/downloadResume';

export const ResumeViewer: React.FC = () => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    await downloadResumePDF();
    setTimeout(() => setDownloading(false), 1000);
  };

  return (
    <section id="resume" className="py-24 relative z-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#38BDF8]/40 mb-3 text-[#38BDF8] text-xs font-semibold uppercase tracking-widest"
          >
            <Sparkles className="w-4 h-4" />
            <span>Interactive Document</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight text-glow">
            3D Resume <span className="text-[#38BDF8]">Viewer</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mt-3">
            Preview the full 2-page curriculum vitae below or download a high-definition PDF directly to your device.
          </p>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px #38BDF8' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            disabled={downloading}
            className="mt-6 flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#38BDF8] text-white font-bold text-base shadow-xl shadow-[#2563EB]/40 transition-all duration-300 cursor-pointer"
          >
            <Download className={`w-5 h-5 ${downloading ? 'animate-bounce' : ''}`} />
            <span>{downloading ? 'Generating PDF...' : 'Download Resume PDF'}</span>
          </motion.button>
        </div>

        {/* 3D Paper Resume Preview Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* Page 1 Card */}
          <Tilt
            tiltMaxAngleX={6}
            tiltMaxAngleY={6}
            glareEnable={true}
            glareMaxOpacity={0.2}
            glareColor="#38BDF8"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-4 rounded-3xl glass-card border border-[#38BDF8]/40 shadow-[0_0_30px_rgba(37,99,235,0.2)] group"
            >
              <div className="flex items-center justify-between px-4 py-2 mb-3 border-b border-[#38BDF8]/20 text-xs text-slate-300 font-mono">
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#38BDF8]" />
                  Resume Page 1
                </span>
                <span className="text-[#38BDF8]">P. Moneesh Raj</span>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-white shadow-2xl">
                <img
                  src="/images/resume_page1.jpg"
                  alt="Resume Page 1"
                  className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </motion.div>
          </Tilt>

          {/* Page 2 Card */}
          <Tilt
            tiltMaxAngleX={6}
            tiltMaxAngleY={6}
            glareEnable={true}
            glareMaxOpacity={0.2}
            glareColor="#38BDF8"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-4 rounded-3xl glass-card border border-[#38BDF8]/40 shadow-[0_0_30px_rgba(37,99,235,0.2)] group"
            >
              <div className="flex items-center justify-between px-4 py-2 mb-3 border-b border-[#38BDF8]/20 text-xs text-slate-300 font-mono">
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#38BDF8]" />
                  Resume Page 2
                </span>
                <span className="text-[#38BDF8]">P. Moneesh Raj</span>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-white shadow-2xl">
                <img
                  src="/images/resume_page2.jpg"
                  alt="Resume Page 2"
                  className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </motion.div>
          </Tilt>

        </div>

      </div>
    </section>
  );
};
