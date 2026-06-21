import { Router } from 'express';
import lineasProcesoRoutes from '../modules/lineas_proceso/lineas_proceso.routes.js';

const router = Router();

router.use('/lineas-proceso', lineasProcesoRoutes);

export default router;