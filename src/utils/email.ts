import emailjs from '@emailjs/browser';
import type { ContactFormData } from './contactSchema';

export interface EmailResult {
  success: boolean;
  error?: string;
}

// Initialize EmailJS once when this module loads
const SERVICE_ID  = 'service_pun1czj';
const TEMPLATE_ID = 'template_urhhgt9';
const PUBLIC_KEY  = 'q2kXeVG6HsQ4F_VyH';

emailjs.init({ publicKey: PUBLIC_KEY });

export const sendContactEmail = async (formData: ContactFormData): Promise<EmailResult> => {
  const templateParams = {
    from_name:  formData.name,
    name:       formData.name,
    user_name:  formData.name,
    reply_to:   formData.email,
    from_email: formData.email,
    email:      formData.email,
    user_email: formData.email,
    phone:      formData.phone,
    company:    formData.company || 'N/A',
    subject:    formData.subject,
    message:    formData.message,
    to_name:    'P. Moneesh Raj',
    to_email:   'moneesh2808@gmail.com',
  };

  try {
    console.log('[EmailJS] Sending with params:', {
      service: SERVICE_ID,
      template: TEMPLATE_ID,
      from: formData.name,
      email: formData.email,
    });

    const res = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
    console.log('[EmailJS] ✅ Response:', res.status, res.text);
    return { success: true };
  } catch (err: any) {
    console.error('[EmailJS] ❌ Error:', err);
    const errorMessage =
      err?.text || err?.message || 'Email delivery failed. Please try again.';
    return {
      success: false,
      error: errorMessage,
    };
  }
};
