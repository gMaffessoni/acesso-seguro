import { Router } from 'express';
import VisitanteController from '../controllers/visitante.controller.js';
import HomeController from '../controllers/home.controller.js';

const router = Router();

//router.get('/', (req, res) => res.redirect('/visitantes')); // ← adiciona isso
router.get('/', HomeController.index);

router.get   ('/visitantes',             VisitanteController.index);
router.get   ('/visitantes/novo',        VisitanteController.new);
router.post  ('/visitantes',             VisitanteController.create);
router.get   ('/visitantes/:id/editar',  VisitanteController.edit);
router.put   ('/visitantes/:id',         VisitanteController.update);
router.delete('/visitantes/:id',         VisitanteController.delete);

router.put('/visitantes/:id/saida', VisitanteController.registrarSaida);

export default router;