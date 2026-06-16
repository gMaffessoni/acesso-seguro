import express from 'express';
import session from 'express-session';
import { inertiaMiddleware } from './middleware/inertia.js'; // Seu middleware customizado
import sequelize from './config/database.js';
import visitanteRouter from './routers/visitante.router.js';
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'unoesc_portaria_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Template ajustado com o Tailwind e com o caminho correto do Vite/React
// const htmlTemplate = (page) => `
// <!DOCTYPE html>
// <html lang="pt-BR">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Acesso Seguro</title>
    
//     <script src="https://cdn.tailwindcss.com"></script>
//   </head>
//   <body>
//     <div id="app" data-page='${JSON.stringify(page)}'></div>
    
//     <script type="module" src="http://localhost:5173/@vite/client"></script>
//     <script type="module" src="http://localhost:5173/app.jsx"></script>
//   </body>
// </html>
// `;
// Template ajustado com o Tailwind, caminho do Vite e o Preamble do React
const htmlTemplate = (page) => `
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Acesso Seguro</title>
    
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="app" data-page='${JSON.stringify(page)}'></div>
    
    <script type="module">
      import RefreshRuntime from 'http://localhost:5173/@react-refresh'
      RefreshRuntime.injectIntoGlobalHook(window)
      window.$RefreshReg$ = () => {}
      window.$RefreshSig$ = () => (type) => type
      window.__vite_plugin_react_preamble_installed__ = true
    </script>
    
    <script type="module" src="http://localhost:5173/@vite/client"></script>
    <script type="module" src="http://localhost:5173/app.jsx"></script>
  </body>
</html>
`;
app.use(inertiaMiddleware(htmlTemplate));

// 3. Corrigido o compartilhamento do Flash (Inertia oficial usa res.share)

app.use((req, res, next) => {
  const flash = req.session.flash || {};
  req.session.flash = {};

  res.inertia.share({ // <-- Adicione ".inertia" antes do ".share"
    flash: {
      success: flash.success || null,
      error: flash.error || null
    }
  });

  next();
});
app.use(visitanteRouter);

const PORT = process.env.PORT || 3000;
sequelize.sync({ force: false }).then(() => {
  console.log('PostgreSQL conectado com sucesso via Sequelize...');
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
});