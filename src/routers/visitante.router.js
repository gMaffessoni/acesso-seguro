import { Router } from 'express';
import VisitanteController from '../controllers/visitante.controller.js';
import HomeController from '../controllers/home.controller.js';

const router = Router();

router.get('/', HomeController.index);

router.get   ('/visitantes',              VisitanteController.index);
router.get   ('/visitantes/new',          VisitanteController.new);
router.post  ('/visitantes',              VisitanteController.create);
router.get   ('/visitantes/:id/',         VisitanteController.edit);
router.put   ('/visitantes/:id',          VisitanteController.update);
router.put   ('/visitantes/:id/inativar', VisitanteController.inativar);
router.put   ('/visitantes/:id/ativar',   VisitanteController.ativar);
router.put   ('/visitantes/:id/saida',    VisitanteController.registrarSaida);

export default router;