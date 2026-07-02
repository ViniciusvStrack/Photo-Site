import { Router } from 'express';
import { getPackages, getAddons } from '../controllers/servicesController';

const router = Router();

router.get('/packages', getPackages);
router.get('/addons', getAddons);

export default router;
