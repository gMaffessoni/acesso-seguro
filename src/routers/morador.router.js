import { Router } from 'express';
import MoradorController from '../controllers/morador.controller.js';

const router = Router();

router.get   ('/moradores',             MoradorController.index);
router.post  ('/moradores',             MoradorController.create);
router.put   ('/moradores/:id',         MoradorController.update);
router.delete('/moradores/:id',         MoradorController.delete);

export default router;