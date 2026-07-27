import emailjs from '@emailjs/browser';
import type { ContactFormData } from './contactSchema';

export interface EmailResult {
  success: boolean;
  autoreplySent?: boolean;
  error?: string;
}

export const sendContactEmail = async (formData: ContactFormData): Promise<EmailResult> => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_pun1czj';
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'q2kXeVG6HsQ4F_VyH';
  const contactTemplateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE || 'template_urhhgt9';
  const autoreplyTemplateId = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE || 'template_7yxybf4';

  try {
    // Initialize EmailJS with public key
    emailjs.init(publicKey);

    const templateParams = {
      from_name: formData.name,
      name: formData.name,
      user_name: formData.name,
      reply_to: formData.email,
      from_email: formData.email,
      email: formData.email,
      user_email: formData.email,
      phone: formData.phone,
      company: formData.company || 'N/A',
      subject: formData.subject,
      message: formData.message,
      to_name: 'P. Moneesh Raj',
    };

    // 1. Send primary contact email
    const primaryRes = await emailjs.send(serviceId, contactTemplateId, templateParams, publicKey);
    console.log('Primary EmailJS Response:', primaryRes);

    // 2. Attempt auto-reply confirmation email (if configured)
    let autoreplySuccess = false;
    try {
      if (autoreplyTemplateId) {
        await emailjs.send(serviceId, autoreplyTemplateId, templateParams, publicKey);
        autoreplySuccess = true;
      }
    } catch (autoErr) {
      console.warn('Auto-reply template call skipped or failed:', autoErr);
      autoreplySuccess = false;
    }

    return {
      success: true,
      autoreplySent: autoreplySuccess,
    };
  } catch (err: any) {
    console.error('Error sending primary EmailJS email:', err);
    return {
      success: false,
      error: err?.text || err?.message || 'Email delivery service temporarily unavailable.',
    };
  }
};
