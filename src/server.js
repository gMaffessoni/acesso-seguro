import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { inertiaMiddleware } from './middleware/inertia.js';
import sequelize from './config/database.js';
import authRouter from './routers/auth.router.js';
import visitanteRouter from './routers/visitante.router.js';
import moradorRouter from './routers/morador.router.js';
import { autenticar } from './middleware/auth.js';
import UsuarioDataAccess from './data_access/usuario.da.js';
import { initCleanupJob } from './jobs/cleanup.job.js';
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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

app.use(async (req, res, next) => {
  req.user = null;
  const token = req.cookies?.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'acesso_seguro_jwt_secret_key_987!');
      const usuario = await UsuarioDataAccess.getById(decoded.id);
      if (usuario) {
        req.user = {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email
        };
      }
    } catch (err) {
      res.clearCookie('token');
    }
  }

  const flash = req.session.flash || {};
  const errors = req.session.errors || {};
  req.session.flash = {};
  req.session.errors = {};

  res.inertia.share({
    flash: {
      success: flash.success || null,
      error: flash.error || null
    },
    errors: errors,
    auth: {
      user: req.user
    }
  });

  next();
});

app.use(authRouter);
app.use(autenticar, visitanteRouter);
app.use(autenticar, moradorRouter);

initCleanupJob();

const PORT = process.env.PORT || 3000;
sequelize.sync({ alter: true }).then(() => {
  console.log('Banco de dados sincronizado...');
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
});