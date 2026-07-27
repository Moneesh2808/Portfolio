import emailjs from '@emailjs/browser';
import type { ContactFormData } from './contactSchema';

export interface EmailResult {
  success: boolean;
  error?: string;
}

export const sendContactEmail = async (formData: ContactFormData): Promise<EmailResult> => {
  const serviceId   = 'service_pun1czj';
  const templateId  = 'template_urhhgt9';
  const publicKey   = 'q2kXeVG6HsQ4F_VyH';

  const templateParams = {
    from_name:  formData.name,
    name:       formData.name,
    reply_to:   formData.email,
    from_email: formData.email,
    email:      formData.email,
    phone:      formData.phone,
    company:    formData.company || 'N/A',
    subject:    formData.subject,
    message:    formData.message,
    to_name:    'P. Moneesh Raj',
  };

  try {
    const res = await emailjs.send(serviceId, templateId, templateParams, publicKey);
    console.log('EmailJS response:', res.status, res.text);
    return { success: true };
  } catch (err: any) {
    console.error('EmailJS error:', err);
    return {
      success: false,
      error: err?.text || err?.message || 'Email delivery failed. Please try again.',
    };
  }
};
