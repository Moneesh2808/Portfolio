import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import {
  Code,
  Brain,
  BarChart,
  Layers,
  Database,
  Wrench,
  Bot,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

interface SkillItem {
  name: string;
  level: number; // 0 - 100
  tag?: string;
}

interface SkillCategory {
  id: string;
  title: string;
  icon: any;
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    id: 'programming',
    title: 'Programming Languages',
    icon: Code,
    skills: [
      { name: 'Python', level: 95, tag: 'Expert' },
      { name: 'SQL', level: 90, tag: 'Advanced' },
      { name: 'JavaScript', level: 80, tag: 'Intermediate' },
      { name: 'React (Basics)', level: 75, tag: 'Intermediate' },
    ],
  },
  {
    id: 'ml',
    title: 'Machine Learning & AI',
    icon: Brain,
    skills: [
      { name: 'Scikit-Learn', level: 92, tag: 'Advanced' },
      { name: 'Regression Models', level: 90, tag: 'Advanced' },
      { name: 'Classification', level: 90, tag: 'Advanced' },
      { name: 'Random Forest', level: 88, tag: 'Advanced' },
      { name: 'EDA & Feature Eng.', level: 94, tag: 'Expert' },
    ],
  },
  {
    id: 'analytics',
    title: 'Data Analysis & BI',
    icon: BarChart,
    skills: [
      { name: 'Pandas & NumPy', level: 95, tag: 'Expert' },
      { name: 'Power BI', level: 90, tag: 'Advanced' },
      { name: 'Matplotlib & Seaborn', level: 88, tag: 'Advanced' },
      { name: 'Microsoft Excel', level: 85, tag: 'Advanced' },
    ],
  },
  {
    id: 'frameworks',
    title: 'Backend Frameworks',
    icon: Layers,
    skills: [
      { name: 'FastAPI', level: 88, tag: 'Advanced' },
      { name: 'Flask', level: 90, tag: 'Advanced' },
      { name: 'Django', level: 82, tag: 'Intermediate' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    icon: Database,
    skills: [
      { name: 'MySQL', level: 88, tag: 'Advanced' },
      { name: 'PostgreSQL', level: 85, tag: 'Advanced' },
    ],
  },
  {
    id: 'tools',
    title: 'Developer Tools',
    icon: Wrench,
    skills: [
      { name: 'Git & GitHub', level: 90, tag: 'Advanced' },
      { name: 'VS Code', level: 95, tag: 'Expert' },
      { name: 'Jupyter Notebook', level: 94, tag: 'Expert' },
      { name: 'Anaconda', level: 88, tag: 'Advanced' },
    ],
  },
  {
    id: 'ai-tools',
    title: 'Next-Gen AI Tools',
    icon: Bot,
    skills: [
      { name: 'ChatGPT', level: 95, tag: 'Expert' },
      { name: 'Claude', level: 92, tag: 'Advanced' },
      { name: 'Antigravity', level: 90, tag: 'Advanced' },
      { name: 'Kimi', level: 88, tag: 'Advanced' },
    ],
  },
];

export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredCategories =
    activeTab === 'all'
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === activeTab);

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#38BDF8]/40 mb-3 text-[#38BDF8] text-xs font-semibold uppercase tracking-widest"
          >
            <Sparkles className="w-4 h-4" />
            <span>Technical Capabilities</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight text-glow">
            Skills & <span className="text-[#38BDF8]">Expertise</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mt-3">
            Comprehensive breakdown of my technical stack across Data Science, Machine Learning, Python Backend, and Analytics.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-2xl text-xs md:text-sm font-semibold transition-all duration-300 ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-[#2563EB] to-[#38BDF8] text-white shadow-[0_0_20px_#38BDF8]'
                : 'glass-panel text-slate-300 hover:text-white hover:border-[#38BDF8]/50'
            }`}
          >
            All Skills
          </button>
          {skillCategories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs md:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#2563EB] to-[#38BDF8] text-white shadow-[0_0_20px_#38BDF8]'
                    : 'glass-panel text-slate-400 hover:text-white hover:border-[#38BDF8]/40'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((category) => {
            const CatIcon = category.icon;
            return (
              <Tilt
                key={category.id}
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                glareEnable={true}
                glareMaxOpacity={0.2}
                glareColor="#38BDF8"
                className="h-full"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="h-full p-6 rounded-3xl glass-card border border-[#38BDF8]/30 flex flex-col justify-between"
                >
                  <div>
                    {/* Category Title Header */}
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#38BDF8]/20">
                      <div className="w-10 h-10 rounded-xl bg-[#2563EB]/20 flex items-center justify-center text-[#38BDF8] border border-[#38BDF8]/30">
                        <CatIcon className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold text-white">{category.title}</h3>
                    </div>

                    {/* Skill Progress List */}
                    <div className="space-y-4">
                      {category.skills.map((skill, sIdx) => (
                        <div key={sIdx} className="group">
                          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                            <span className="text-slate-200 flex items-center gap-2 group-hover:text-[#38BDF8] transition-colors">
                              <CheckCircle className="w-3.5 h-3.5 text-[#38BDF8]" />
                              {skill.name}
                            </span>
                            <div className="flex items-center gap-2">
                              {skill.tag && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#2563EB]/30 text-[#38BDF8] border border-[#38BDF8]/30">
                                  {skill.tag}
                                </span>
                              )}
                              <span className="text-slate-400 font-mono">{skill.level}%</span>
                            </div>
                          </div>

                          {/* Progress Bar with Glow */}
                          <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800 p-0.5">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.2, delay: sIdx * 0.1 }}
                              className="h-full rounded-full bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#38BDF8] shadow-[0_0_10px_#38BDF8]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
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
