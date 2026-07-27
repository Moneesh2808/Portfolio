import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Building2,
  User,
  MessageSquare,
  FileText,
} from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { contactSchema } from '../../utils/contactSchema';
import type { ContactFormData } from '../../utils/contactSchema';
import { sendContactEmail } from '../../utils/email';
import { Earth3DScene } from './Earth3DScene';

export const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'warning'; message: string } | null>(null);
  const [shake, setShake] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setToast(null);

    try {
      const result = await sendContactEmail(data);

      if (result.success) {
        reset();
        setToast({
          type: 'success',
          message:
            'Thank you! Your message has been sent successfully. Moneesh will get back to you shortly.',
        });
      } else {
        setShake(true);
        setTimeout(() => setShake(false), 600);
        setToast({
          type: 'error',
          message:
            result.error ||
            'Email service temporarily unavailable. You can also click the email link on the left to send directly to moneesh2808@gmail.com.',
        });
      }
    } catch (err: any) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setToast({
        type: 'error',
        message: 'Unable to send via automated form. Please click moneesh2808@gmail.com to send directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative z-10">
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
            <span>Get In Touch</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight text-glow">
            Let's Build Something <span className="text-[#38BDF8]">Futuristic</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mt-3">
            Have a project, machine learning opportunity, or hiring query? Reach out directly using the cyber contact form below.
          </p>
        </div>

        {/* Toast Notification Banner */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`max-w-2xl mx-auto mb-8 p-4 rounded-2xl border flex items-center gap-3 backdrop-blur-md shadow-xl ${
                toast.type === 'success'
                  ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
                  : toast.type === 'warning'
                  ? 'bg-amber-950/80 border-amber-500/50 text-amber-200'
                  : 'bg-rose-950/80 border-rose-500/50 text-rose-200'
              }`}
            >
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-6 h-6 shrink-0" />
              )}
              <span className="text-xs sm:text-sm font-medium">{toast.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: 3D Globe & Direct Contact Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div className="rounded-3xl glass-card border border-[#38BDF8]/30 overflow-hidden p-6 text-center">
              <Earth3DScene />
              <h3 className="text-xl font-bold text-white mb-1">Global Connect</h3>
              <p className="text-xs text-slate-400">Available for remote & hybrid AI opportunities worldwide.</p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3">
              <div className="p-4 rounded-2xl glass-card border border-[#38BDF8]/20 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#2563EB]/20 flex items-center justify-center text-[#38BDF8]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Email Address</div>
                  <a href="mailto:moneesh2808@gmail.com" className="text-sm font-bold text-white hover:text-[#38BDF8]">
                    moneesh2808@gmail.com
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-2xl glass-card border border-[#38BDF8]/20 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#2563EB]/20 flex items-center justify-center text-[#38BDF8]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Phone / WhatsApp</div>
                  <a href="tel:8124567215" className="text-sm font-bold text-white hover:text-[#38BDF8]">
                    +91 8124567215
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-2xl glass-card border border-[#38BDF8]/20 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#2563EB]/20 flex items-center justify-center text-[#38BDF8]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Location</div>
                  <div className="text-sm font-bold text-white">Kancheepuram, Tamil Nadu, India</div>
                </div>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://github.com/Moneesh2808"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 p-3.5 rounded-2xl glass-panel border border-[#38BDF8]/30 flex items-center justify-center gap-2 text-white font-semibold text-xs hover:border-[#38BDF8] hover:text-[#38BDF8] transition-all"
              >
                <FaGithub className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/moneesh2808"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 p-3.5 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#38BDF8] flex items-center justify-center gap-2 text-white font-semibold text-xs shadow-lg hover:shadow-[0_0_20px_#38BDF8] transition-all"
              >
                <FaLinkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>

          </div>

          {/* Right Column: Glass Contact Form */}
          <motion.div
            animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 p-8 rounded-3xl glass-card border border-[#38BDF8]/40 shadow-[0_0_50px_rgba(37,99,235,0.25)]"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Send className="w-6 h-6 text-[#38BDF8]" />
              Send Me a Direct Message
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#38BDF8]" /> Your Name *
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-all text-sm"
                  />
                  {errors.name && (
                    <span className="text-[11px] text-rose-400 mt-1 block">{errors.name.message}</span>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#38BDF8]" /> Email Address *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-all text-sm"
                  />
                  {errors.email && (
                    <span className="text-[11px] text-rose-400 mt-1 block">{errors.email.message}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#38BDF8]" /> Phone Number *
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    placeholder="+91 9876543210"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-all text-sm"
                  />
                  {errors.phone && (
                    <span className="text-[11px] text-rose-400 mt-1 block">{errors.phone.message}</span>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#38BDF8]" /> Company / Organization
                  </label>
                  <input
                    {...register('company')}
                    type="text"
                    placeholder="Acme Corp"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-all text-sm"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#38BDF8]" /> Subject *
                </label>
                <input
                  {...register('subject')}
                  type="text"
                  placeholder="AI / ML Opportunity Inquiry"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-all text-sm"
                />
                {errors.subject && (
                  <span className="text-[11px] text-rose-400 mt-1 block">{errors.subject.message}</span>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#38BDF8]" /> Message *
                </label>
                <textarea
                  {...register('message')}
                  rows={4}
                  placeholder="Hello Moneesh, I'd like to discuss a Machine Learning project..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-all text-sm resize-none"
                />
                {errors.message && (
                  <span className="text-[11px] text-rose-400 mt-1 block">{errors.message.message}</span>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: isSubmitting ? 1 : 1.02, boxShadow: '0 0 25px #38BDF8' }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#38BDF8] text-white font-bold text-sm shadow-xl shadow-[#2563EB]/40 flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                    <span>Sending Message via EmailJS...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>

            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
