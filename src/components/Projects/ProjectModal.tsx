import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Layers,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  BrainCircuit,
} from 'lucide-react';

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  overview: string;
  problemStatement: string;
  architecture: string;
  features: string[];
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Lock body scroll and stop Lenis when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [project]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && project) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  // Render into document.body via portal — bypasses ALL stacking contexts
  return createPortal(
    <AnimatePresence>
      {project && (
        <>
          {/* Full-screen backdrop — rendered at body level */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9998,
              backgroundColor: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          />

          {/* Scrollable modal shell — also at body level */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              padding: '2rem 1rem',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 24 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '56rem',
                margin: 'auto',
                borderRadius: '1.5rem',
                background: 'rgba(8, 14, 38, 0.97)',
                border: '1px solid rgba(56, 189, 248, 0.5)',
                boxShadow: '0 0 60px rgba(56,189,248,0.35)',
                padding: '1.5rem',
              }}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 z-20 p-2.5 rounded-xl bg-slate-900/90 border border-[#38BDF8]/50 text-[#38BDF8] hover:bg-[#38BDF8] hover:text-black transition-all duration-300 shadow-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Banner & Category */}
              <div className="mb-6 pr-12">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#2563EB]/30 border border-[#38BDF8]/40 text-[#38BDF8] uppercase tracking-wider">
                  {project.category}
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold text-white mt-3 text-glow">
                  {project.title}
                </h2>
              </div>

              {/* Project Preview Image */}
              <div className="w-full h-56 md:h-80 rounded-2xl overflow-hidden border border-[#38BDF8]/30 mb-8 relative bg-slate-950">
                <img
                  src={project.image}
                  alt={project.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/projects/moniverse.jpg';
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-900/90 text-[#38BDF8] border border-[#38BDF8]/30 backdrop-blur-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Overview & Problem Statement Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Overview */}
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-[#38BDF8] font-bold mb-2">
                    <BrainCircuit className="w-5 h-5" />
                    <span>Overview</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.overview}
                  </p>
                </div>

                {/* Problem Statement */}
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-rose-400 font-bold mb-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span>Problem Statement</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.problemStatement}
                  </p>
                </div>
              </div>

              {/* Architecture */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 mb-6">
                <div className="flex items-center gap-2 text-emerald-400 font-bold mb-2">
                  <Layers className="w-5 h-5" />
                  <span>System Architecture</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.architecture}
                </p>
              </div>

              {/* Key Features */}
              <div className="mb-8">
                <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-[#38BDF8]" />
                  Key Features &amp; Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/40 border border-slate-800 text-xs sm:text-sm text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-center pt-6 border-t border-slate-800/80">
                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#38BDF8] text-white text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(56,189,248,0.35)] hover:shadow-[0_0_30px_#38BDF8] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};
