/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Formspree form hash (e.g. mbdweard); optional — app defaults to production id */
  readonly VITE_FORMSPREE_ID?: string;
  readonly VITE_CONTACT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
