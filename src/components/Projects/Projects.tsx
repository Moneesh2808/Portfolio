import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import {
  ExternalLink,
  Sparkles,
  Maximize2,
} from 'lucide-react';
import { ProjectModal } from './ProjectModal';
import type { ProjectData } from './ProjectModal';

const projectsData: ProjectData[] = [
  {
    id: 'house-price',
    title: 'House Price Prediction Web Application',
    category: 'Machine Learning & Flask',
    description: 'Flask-based machine learning web application using Random Forest Regression to accurately estimate house valuations in real-time.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    techStack: ['Python', 'Flask', 'Scikit-learn', 'Random Forest', 'Joblib', 'Bootstrap'],
    githubUrl: 'https://github.com/Moneesh2808',
    liveUrl: 'https://github.com/Moneesh2808',
    overview: 'Engineered an end-to-end predictive real estate platform that calculates property prices based on location, square footage, amenities, and historical market trends.',
    problemStatement: 'Real estate buyer uncertainty caused by volatile pricing data and lack of automated valuation tools.',
    architecture: 'Scikit-learn ML pipeline serialized with Joblib, wrapped in a modular Flask REST server and responsive frontend interface.',
    features: [
      'Data preprocessing & outlier removal',
      'Feature engineering & cross-validation',
      'Random Forest regression model tuning',
      'Instant interactive price calculation interface',
    ],
  },
  {
    id: 'credit-card-fraud',
    title: 'Credit Card Fraud Detection System',
    category: 'FastAPI & Machine Learning',
    description: 'High-precision real-time fraud detection pipeline built with Python, Scikit-learn, FastAPI, and Random Forest classification.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    techStack: ['Python', 'FastAPI', 'Scikit-learn', 'Random Forest', 'Feature Scaling'],
    githubUrl: 'https://github.com/Moneesh2808',
    liveUrl: 'https://github.com/Moneesh2808',
    overview: 'Built an enterprise-grade financial safety system that monitors transactions in real-time, instantly identifying fraudulent patterns with high precision and low false positives.',
    problemStatement: 'Millions lost annually due to undetected credit card fraud and high latency in traditional rule-based detection systems.',
    architecture: 'FastAPI REST microservice serving trained Random Forest Classifiers with automated anomaly detection scoring.',
    features: [
      'StandardScaler & SMOTE imbalance handling',
      'Sub-millisecond inference API response',
      'Random Forest Classifier with 99.2% accuracy',
      'Real-time transaction risk dashboard',
    ],
  },
  {
    id: 'moniverse-ai',
    title: 'MoniVerse AI - Intelligent Chatbot',
    category: 'AI & Full-Stack',
    description: 'ChatGPT-like AI chatbot built with React and Flask, leveraging Antigravity AI tools and local LLM (Mistral via Ollama) with multimodal PDF & image understanding.',
    image: '/images/projects/moniverse.jpg',
    techStack: ['React', 'Flask', 'Antigravity AI', 'Mistral', 'Ollama', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Moneesh2808',
    liveUrl: 'https://github.com/Moneesh2808',
    overview: 'Constructed an autonomous local conversational AI assistant capable of text reasoning, document analysis (PDF/images), and dynamic contextual chat history.',
    problemStatement: 'Privacy concerns and latency cost issues associated with commercial third-party cloud LLM APIs.',
    architecture: 'React frontend streaming responses via WebSockets/SSE to a Flask backend orchestrating local Mistral models via Ollama and Antigravity tooling.',
    features: [
      'Real-time streaming LLM response interface',
      'PDF & Document visual attachment analysis',
      'Local model execution via Ollama & Mistral',
      'Futuristic dark cyber UI with markdown render',
    ],
  },
  {
    id: 'hospital-system',
    title: 'Hospital Management System',
    category: 'Django & PostgreSQL',
    description: 'Full-stack Hospital Management System using Django, PostgreSQL, and JWT authentication with secure role-based access for admins, doctors, and patients.',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
    techStack: ['Python', 'Django', 'PostgreSQL', 'JWT Auth', 'REST APIs', 'Bootstrap'],
    githubUrl: 'https://github.com/Moneesh2808',
    liveUrl: 'https://github.com/Moneesh2808',
    overview: 'Streamlined hospital workflows including patient intake, doctor appointment scheduling, billing, payment processing, and electronic medical record management.',
    problemStatement: 'Inefficient paper-based hospital record management causing delayed appointments and billing errors.',
    architecture: 'Django MVC architecture with PostgreSQL database schema, JWT role-based authorization middleware, and automated invoice generators.',
    features: [
      'Secure JWT multi-role authorization',
      'Appointment scheduling & slot booking',
      'Patient billing & automated PDF invoice creation',
      'Comprehensive doctor & admin dashboards',
    ],
  },
  {
    id: 'retail-sales',
    title: 'Retail Sales Performance & Demand Forecasting',
    category: 'Data Analytics & Power BI',
    description: 'Retail sales analytics solution built with Python and Power BI, offering EDA, trend analysis, and predictive demand forecasting.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    techStack: ['Python', 'Power BI', 'Pandas', 'Matplotlib', 'Seaborn', 'Excel'],
    githubUrl: 'https://github.com/Moneesh2808',
    liveUrl: 'https://github.com/Moneesh2808',
    overview: 'Transformed raw retail sales datasets into interactive executive dashboards in Power BI and performed predictive demand forecasting using Python Pandas.',
    problemStatement: 'Retail inventory overstocking and understocking due to lack of historical trend insights.',
    architecture: 'Python ETL data pipeline feeding clean data models into interactive Power BI DAX-calculated dashboards.',
    features: [
      'Automated data cleaning & outlier filtering',
      'Interactive Power BI KPI slicers & charts',
      'Seasonal demand trend forecasting',
      'Executive revenue & profit margin breakdown',
    ],
  },
];

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  return (
    <section id="projects" className="py-24 relative z-10">
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
            <span>Featured Portfolio</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight text-glow">
            Innovative <span className="text-[#38BDF8]">3D Projects</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mt-3">
            Handcrafted Machine Learning models, AI assistants, and enterprise data solutions. Click any project to open detailed architecture specs.
          </p>
        </div>

        {/* 3D Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, idx) => (
            <Tilt
              key={project.id}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              glareEnable={true}
              glareMaxOpacity={0.25}
              glareColor="#38BDF8"
              className="h-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="h-full rounded-3xl glass-card border border-[#38BDF8]/30 overflow-hidden flex flex-col justify-between group hover:border-[#38BDF8]/70"
              >
                <div>
                  {/* Image Container with Hover Zoom & Badge */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
                    
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold bg-[#020617]/80 border border-[#38BDF8]/50 text-[#38BDF8] backdrop-blur-md">
                      {project.category}
                    </span>

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#38BDF8] text-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Card Details */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#38BDF8] transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.techStack.slice(0, 4).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md text-[10px] bg-slate-900/80 border border-slate-800 text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] bg-slate-900/80 border border-slate-800 text-[#38BDF8]">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-slate-800/60">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full py-2.5 rounded-xl bg-[#2563EB]/20 border border-[#38BDF8]/40 text-[#38BDF8] text-xs font-bold hover:bg-[#2563EB] hover:text-white transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(56,189,248,0.15)]"
                  >
                    <span>View Project Details</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

              </motion.div>
            </Tilt>
          ))}
        </div>

        {/* Modal render */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

      </div>
    </section>
  );
};
