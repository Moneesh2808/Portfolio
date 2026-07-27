import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Sparkles, CheckCircle2, Building2 } from 'lucide-react';

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  points: string[];
  skills: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 'hybrid-softech',
    company: 'Hybrid Softech Solutions',
    role: 'AI & Full Stack Developer Intern',
    period: 'Jan 2026 - June 2026',
    location: 'Tamil Nadu, India (Hybrid)',
    type: 'Internship',
    points: [
      'Engineered machine learning models and integrated real-time LLM inference pipelines for enterprise web platforms.',
      'Developed high-performance REST APIs using FastAPI & Flask with scalable React frontend interfaces.',
      'Constructed automated data cleaning, exploratory analysis, and feature scaling modules.',
    ],
    skills: ['Python', 'FastAPI', 'Flask', 'Machine Learning', 'React', 'AI Agents'],
  },
  {
    id: 'inspire-softtech',
    company: 'Inspire Softtech Solutions',
    role: 'Full Stack Developer Intern',
    period: 'April 2025 - May 2025',
    location: 'Tamil Nadu, India',
    type: 'Internship',
    points: [
      'Collaborated on full-stack Python web application development using Django & MySQL databases.',
      'Designed responsive UI components and structured RESTful API endpoint contracts.',
      'Participated in code reviews, bug fixes, and performance optimization sprints.',
    ],
    skills: ['Python', 'Django', 'MySQL', 'JavaScript', 'HTML5/CSS3', 'Git'],
  },
];

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative z-10 overflow-hidden">
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
            <span>Career Milestones</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight text-glow">
            Work <span className="text-[#38BDF8]">Experience</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mt-3">
            Hands-on software development and AI engineering internships in fast-paced tech environments.
          </p>
        </div>

        {/* Vertical Animated Timeline */}
        <div className="max-w-4xl mx-auto relative px-2 sm:px-0">
          
          {/* Vertical Neon Line */}
          <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-0.5 md:w-1 bg-gradient-to-b from-[#2563EB] via-[#38BDF8] to-[#1E40AF] -translate-x-1/2 rounded-full shadow-[0_0_15px_#38BDF8]" />

          <div className="space-y-8 md:space-y-12">
            {experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-3 md:left-1/2 -translate-x-1/2 top-1.5 w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#020617] border-2 border-[#38BDF8] flex items-center justify-center text-[#38BDF8] shadow-[0_0_16px_#38BDF8] z-20 shrink-0">
                    <Briefcase className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </div>

                  {/* Experience Card */}
                  <div className={`w-full md:w-[calc(50%-2.5rem)] pl-7 sm:pl-10 md:pl-0 ${isEven ? 'md:mr-auto' : 'md:ml-auto'}`}>
                    <div className="p-5 sm:p-6 rounded-3xl glass-card border border-[#38BDF8]/30 hover:border-[#38BDF8]/60 transition-all duration-300 shadow-xl">
                      
                      {/* Company & Role Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-[#2563EB]/30 border border-[#38BDF8]/40 text-[#38BDF8]">
                          {exp.type}
                        </span>
                        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-400 font-mono shrink-0">
                          <Calendar className="w-3.5 h-3.5 text-[#38BDF8]" />
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-tight">{exp.role}</h3>
                      
                      {/* Company Name & Location */}
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-[#38BDF8] font-semibold mb-4">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-4 h-4 shrink-0 text-[#38BDF8]" />
                          <span>{exp.company}</span>
                        </div>
                        <span className="text-slate-500 hidden sm:inline">•</span>
                        <span className="text-slate-400 text-xs font-normal flex items-center gap-1 w-full sm:w-auto">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {exp.location}
                        </span>
                      </div>

                      {/* Points */}
                      <div className="space-y-2.5 mb-4">
                        {exp.points.map((pt, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>

                      {/* Skill Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800">
                        {exp.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-1 rounded-lg text-[10px] bg-slate-900 border border-slate-800 text-slate-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
