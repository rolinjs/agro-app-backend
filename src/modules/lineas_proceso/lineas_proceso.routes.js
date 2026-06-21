import { Router } from 'express';

import * as lineas from './lineas_proceso.controller.js';

const router = Router();

router.get('/', lineas.listarLineasProcesoController);
router.post('/', lineas.crearLineasProcesoController);
router.put('/:id', lineas.actualizarLineaProcesoController);
router.delete('/:id', lineas.eliminarLineaProcesoController);

export default router;