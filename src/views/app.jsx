import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

createInertiaApp({
  resolve: name => {
    // Procura todos os arquivos .jsx dentro da pasta views e subpastas
    const pages = import.meta.glob('./**/*.jsx', { eager: true });
    return pages[`./${name}.jsx`];
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});