import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { GraduationCap, Sparkles, School, Building } from 'lucide-react';

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  percentage: string;
  icon: any;
}

const educationList: EducationItem[] = [
  {
    degree: 'M.Sc Computer Science',
    institution: 'University of Madras',
    period: '2024 - 2026',
    percentage: '75%',
    icon: GraduationCap,
  },
  {
    degree: 'B.Sc Computer Science',
    institution: 'Pachaiyappas College for Men Kancheepuram',
    period: '2021 - 2024',
    percentage: '78%',
    icon: Building,
  },
  {
    degree: '12th Higher Secondary',
    institution: 'Bharathidasan Matriculation Higher Secondary School',
    period: '2021',
    percentage: '83%',
    icon: School,
  },
  {
    degree: '10th Secondary School',
    institution: 'Bharathidasan Matriculation Higher Secondary School',
    period: '2019',
    percentage: '83%',
    icon: School,
  },
];

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 relative z-10">
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
            <span>Academic Excellence</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight text-glow">
            Education <span className="text-[#38BDF8]">Timeline</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mt-3">
            Academic qualifications demonstrating consistent high performance and core computer science fundamentals.
          </p>
        </div>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {educationList.map((edu, idx) => {
            const Icon = edu.icon;
            return (
              <Tilt
                key={idx}
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                glareEnable={true}
                glareMaxOpacity={0.2}
                glareColor="#38BDF8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-8 rounded-3xl glass-card border border-[#38BDF8]/30 flex flex-col justify-between h-full relative overflow-hidden group hover:border-[#38BDF8]/60"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-[#38BDF8] flex items-center justify-center text-white shadow-[0_0_20px_#38BDF8] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="px-4 py-1.5 rounded-full bg-[#2563EB]/20 border border-[#38BDF8]/40 text-[#38BDF8] text-sm font-extrabold font-mono shadow-[0_0_10px_#38BDF8]">
                      Score: {edu.percentage}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#38BDF8] transition-colors">
                      {edu.degree}
                    </h3>
                    <p className="text-sm font-semibold text-slate-300 mb-2">
                      {edu.institution}
                    </p>
                    <p className="text-xs text-[#38BDF8] font-mono">
                      Completed: {edu.period}
                    </p>
                  </div>
                </motion.div>
              </Tilt>
            );
          })}
        </div>

      </div>
    </section>
  );
};
