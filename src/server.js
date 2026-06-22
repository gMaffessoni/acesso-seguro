import express from 'express';
import session from 'express-session';
import { inertiaMiddleware } from './middleware/inertia.js';
import sequelize from './config/database.js';
import visitanteRouter from './routers/visitante.router.js';
import moradorRouter from './routers/morador.router.js';
import { initCleanupJob } from './jobs/cleanup.job.js';
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'unoesc_portaria_secret_key',
  resave: false,
  saveUninitialized: true
}));

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

app.use((req, res, next) => {
  const flash = req.session.flash || {};
  const errors = req.session.errors || {};
  req.session.flash = {};
  req.session.errors = {};

  res.inertia.share({
    flash: {
      success: flash.success || null,
      error: flash.error || null
    },
    errors: errors
  });

  next();
});

app.use(visitanteRouter);
app.use(moradorRouter);

initCleanupJob();

const PORT = process.env.PORT || 3000;
sequelize.sync({ alter: true }).then(() => {
  console.log('Banco de dados sincronizado...');
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
});