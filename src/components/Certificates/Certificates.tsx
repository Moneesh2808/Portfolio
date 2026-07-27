import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Award, Sparkles, CheckCircle } from 'lucide-react';

interface CertificateItem {
  title: string;
  issuer: string;
  period: string;
  badge: string;
}

const certs: CertificateItem[] = [
  {
    title: 'Data Analytics with AI',
    issuer: 'Sololearn',
    period: 'Verified Certificate',
    badge: 'AI & Analytics',
  },
  {
    title: 'SQL Certification',
    issuer: 'Scalar / Simplilearn',
    period: 'Verified Certificate',
    badge: 'Database & SQL',
  },
  {
    title: 'AI & Full Stack Developer Internship',
    issuer: 'Hybrid Softech Solutions',
    period: 'Jan 2026 - June 2026',
    badge: 'Industry Internship',
  },
  {
    title: 'Full Stack Developer Internship',
    issuer: 'Inspire Softtech Solutions',
    period: 'April 2025 - May 2025',
    badge: 'Industry Internship',
  },
  {
    title: 'English Typewriting (Junior & Senior)',
    issuer: 'Department of Technical Education',
    period: 'State Government Certified',
    badge: 'Technical Skill',
  },
];

export const Certificates: React.FC = () => {
  return (
    <section id="certifications" className="py-24 relative z-10">
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
            <span>Verified Credentials</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight text-glow">
            Certifications & <span className="text-[#38BDF8]">Badges</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mt-3">
            Industry recognized credentials in Data Analytics, Machine Learning, SQL, and Full Stack Engineering.
          </p>
        </div>

        {/* 3D Glass Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certs.map((cert, idx) => (
            <Tilt
              key={idx}
              tiltMaxAngleX={12}
              tiltMaxAngleY={12}
              glareEnable={true}
              glareMaxOpacity={0.25}
              glareColor="#38BDF8"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-3xl glass-card border border-[#38BDF8]/30 flex flex-col justify-between h-full group hover:border-[#38BDF8]/60"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#2563EB]/20 flex items-center justify-center text-[#38BDF8] border border-[#38BDF8]/30 group-hover:scale-110 transition-transform">
                      <Award className="w-5 h-5" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#2563EB]/30 text-[#38BDF8] border border-[#38BDF8]/30">
                      {cert.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#38BDF8] transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-sm font-semibold text-slate-300 mb-1">
                    {cert.issuer}
                  </p>
                  <p className="text-xs text-slate-400 font-mono">
                    {cert.period}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-800 flex items-center gap-2 text-xs font-semibold text-[#38BDF8]">
                  <CheckCircle className="w-4 h-4" />
                  <span>Credential Authenticated</span>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>

      </div>
    </section>
  );
};
