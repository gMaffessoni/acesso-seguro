import { Router } from 'express';
import MoradorController from '../controllers/morador.controller.js';

const router = Router();

router.get   ('/moradores',              MoradorController.index);
router.get   ('/moradores/new',          MoradorController.new);
router.post  ('/moradores',              MoradorController.create);
router.get   ('/moradores/:id/',         MoradorController.edit);
router.put   ('/moradores/:id',          MoradorController.update);
router.put   ('/moradores/:id/inativar', MoradorController.inativar);
router.put   ('/moradores/:id/ativar',   MoradorController.ativar);

export default router;