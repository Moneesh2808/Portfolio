/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAILJS_SERVICE_ID: string;
  readonly VITE_EMAILJS_PUBLIC_KEY: string;
  readonly VITE_EMAILJS_CONTACT_TEMPLATE: string;
  readonly VITE_EMAILJS_AUTOREPLY_TEMPLATE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
