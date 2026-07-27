import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Trophy, Medal, Star, Sparkles } from 'lucide-react';

interface AchievementItem {
  title: string;
  year: string;
  category: string;
  description: string;
  icon: any;
}

const achievements: AchievementItem[] = [
  {
    title: 'Best Student of the Year',
    year: '2022',
    category: 'Academic Honor',
    description: 'Awarded for outstanding overall academic performance, leadership, and technical contribution.',
    icon: Trophy,
  },
  {
    title: 'Rank 1 in Academics',
    year: '2023',
    category: 'Merit Award',
    description: 'Secured first rank across the Computer Science department for top semester GPA scores.',
    icon: Medal,
  },
  {
    title: 'Badminton Winner',
    year: '2018',
    category: 'Sports Championship',
    description: 'School level singles Badminton tournament winner demonstrating endurance and sportsmanship.',
    icon: Star,
  },
];

export const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-24 relative z-10">
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
            <span>Honors & Awards</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight text-glow">
            Key <span className="text-[#38BDF8]">Achievements</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mt-3">
            Recognition of academic excellence, leadership, and competitive achievements.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {achievements.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Tilt
                key={idx}
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                glareEnable={true}
                glareMaxOpacity={0.3}
                glareColor="#38BDF8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-8 rounded-3xl glass-card border border-[#38BDF8]/30 flex flex-col items-center text-center group hover:border-[#38BDF8]/70 h-full relative"
                >
                  {/* Glowing Icon Trophy Circle */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.15 }}
                    transition={{ duration: 0.8 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-[#38BDF8] flex items-center justify-center text-white shadow-[0_0_25px_#38BDF8] mb-6"
                  >
                    <Icon className="w-8 h-8" />
                  </motion.div>

                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#2563EB]/20 border border-[#38BDF8]/40 text-[#38BDF8] mb-3">
                    {item.category} ({item.year})
                  </span>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#38BDF8] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </Tilt>
            );
          })}
        </div>

      </div>
    </section>
  );
};
